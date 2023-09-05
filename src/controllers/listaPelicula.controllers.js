const ListaPelicula = require("../models/listaPelicula.models");
const Calificacion = require("../models/calificacion.models");

const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaLista = Joi.object({
  nombre: Joi.string().required(),
  usuarioID: Joi.string().required(),
});

const guardarLista = async (req, res) => {
  // validate data
  const { error } = schemaLista.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

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
    throw error;
  }
};

const getAllListaPelicula = async (req, res) => {
  try {
    const listaPeliculaDB = await ListaPelicula.find();

    res.status(200).json(listaPeliculaDB);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const listaPeliculaUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const listaPeliculaDB = await ListaPelicula.findOne({ usuarioID: id });

    const result = await Calificacion.aggregate([
      { $match: { productId: productId } },
      {
        $group: {
          calificacionPromedio: { $avg: "$calificacion" },
        },
      },
    ]);

    console.log("El promedio es: " + result);

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
