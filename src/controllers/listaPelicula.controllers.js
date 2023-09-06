const ListaPelicula = require("../models/listaPelicula.models");
const Calificacion = require("../models/calificacion.models");
const Usuario = require("../models/usuario.models");
const Pelicula = require("../models/pelicula.models");
const ListaPeliculaAllDTO = require("../dtos/listPeliculaAll.dto");

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
        
        const user = await Usuario.findOne({ _id: lista.usuarioID });

        const dataLista = new ListaPeliculaAllDTO({
          id: lista.id,
          nombre: lista.nombre,
          nickname: user.nickname,
          calificacion: lista.calificacionPromedio,
        });

        return dataLista;
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
    const listaPeliculaDB = await ListaPelicula.findOne({ _id: id });

    const user = await Usuario.findOne({ _id: listaPeliculaDB.usuarioID });

    const peliculas = await Pelicula.find({ listaID: id });

    console.log(peliculas);

    const dataLista = new ListaPeliculaAllDTO({
      id: listaPeliculaDB.id,
      nombre: listaPeliculaDB.nombre,
      nickname: user.nickname,
      calificacion: listaPeliculaDB.calificacionPromedio,
      peliculas: peliculas
    });

    res.status(200).json({
      dataLista,
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
