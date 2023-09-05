const Pelicula = require("../models/pelicula.models");
const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaPelicula = Joi.object({
  anio: Joi.string().required(),
  nombre: Joi.string().required(),
  listaID: Joi.string().required(),
});

const getAllPeliculas = async (req, res) => {
  try {
    const peliculaDB = await Pelicula.find();

    res.status(200).json(peliculaDB);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createPelicula = async (req, res) => {
  // validate data
  const { error } = schemaPelicula.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Se crea el objecto a guardar
  const peliculaSv = new Pelicula({
    anio: req.body.nombre,
    nombre: req.body.lanzamiento,
    url: req.body.url,
    listaID: req.body.listaID,
  });

  try {
    // Se guarda la información
    const peliculaUser = await peliculaSv.save();

    //Se devuelve la respuesta
    res.status(201).json({
      data: peliculaUser,
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const deletePelicula = async (req, res) => {
  const id = req.params.id;
  console.log("id desde backend", id);
  try {
    const peliculaDB = await Pelicula.findByIdAndDelete({ _id: id });
    console.log(peliculaDB);

    if (!peliculaDB) {
      res.json({
        mensaje: "Ha ocurrido un error al eliminar el registro.",
      });
    } else {
      res.status(204).json({
        mensaje: "Registro eliminado correctamente!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Pelicula no existe." });
  }
};

module.exports = {
  getAllPeliculas,
  createPelicula,
  deletePelicula,
};
