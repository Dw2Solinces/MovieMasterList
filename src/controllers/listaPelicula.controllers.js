const ListaPelicula = require("../models/listaPelicula.models");
const Calificacion = require("../models/calificacion.models");

const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaLista = Joi.object({
  nombre: Joi.string().required(),
  usuarioID: Joi.string().required(),
});

const guardarLista = async (req, res) => {
  /* 	#swagger.tags = ['ListaPelicula']
    #swagger.description = 'Endpoint para guardar las lista de una pelicula' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  // validate data
  const { error } = schemaLista.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const usarioLista = await ListaPelicula.findOne({
    usuarioID: req.body.usuarioID,
  });
  if (usarioLista)
    return res
      .status(400)
      .json({ error: "El usuario solo puede crear una lista" });

  // Se crea el objecto a guardar
  const listaSv = new ListaPelicula({
    nombre: req.body.nombre,
    usuarioID: req.body.usuarioID,
  });

  try {
    // Se guarda la información
    const listaPelicula = await listaSv.save();

    //Se devuelve la respuesta
    res.status(201).json({
      data: listaPelicula,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error });
  }
};

const getAllListaPelicula = async (req, res) => {
  /* 	#swagger.tags = ['ListaPelicula']
    #swagger.description = 'Endpoint para obtener el listado de todas las lista de peliculas' */

  try {
    const listaPeliculaDB = await ListaPelicula.find();

    const usersWithAverage = await Promise.all(
      listaPeliculaDB.map(async (lista) => {
        const calificaiones = await Calificacion.find({
          usuarioID: lista.usuarioID,
        });
        const totalCalificaciones = calificaiones.length;
        const sumOfCalificaciones = calificaiones.reduce(
          (acc, calificacion) => acc + calificacion.calificacion,
          0
        );
        const averageRating =
          totalCalificaciones > 0
            ? sumOfCalificaciones / totalCalificaciones
            : 0;

        lista.calificacionPromedio = averageRating;

        return lista;
      })
    );

    res.status(200).json(usersWithAverage);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const listaPeliculaUsuario = async (req, res) => {
  /* 	#swagger.tags = ['ListaPelicula']
    #swagger.description = 'Endpoint para obtener la lista de peliculas de un usuario' */

  const id = req.params.id;
  try {
    const listaPeliculaDB = await ListaPelicula.findOne({ usuarioID: id });

    const calificaiones = await Calificacion.find({
      usuarioID: listaPeliculaDB.usuarioID,
    });
    const totalCalificaciones = calificaiones.length;
    const sumOfCalificaciones = calificaiones.reduce(
      (acc, calificacion) => acc + calificacion.calificacion,
      0
    );
    const averageRating =
      totalCalificaciones > 0 ? sumOfCalificaciones / totalCalificaciones : 0;

    listaPeliculaDB.calificacionPromedio = averageRating;

    res.status(200).json({
      data: listaPeliculaDB,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: "Este usuario no tiene lista de pelicula agregada." });
  }
};

module.exports = {
  guardarLista,
  getAllListaPelicula,
  listaPeliculaUsuario,
};
