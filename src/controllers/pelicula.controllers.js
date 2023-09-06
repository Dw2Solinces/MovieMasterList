const Pelicula = require("../models/pelicula.models");
const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaPelicula = Joi.object({
  anio: Joi.string().required(),
  nombre: Joi.string().required(),
  listaID: Joi.string().required(),
  url: Joi.string()
});

const getAllPeliculas = async (req, res) => {
  /* 	#swagger.tags = ['Pelicula']
    #swagger.description = 'Endpoint para obtener todas las peliculas' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  try {
    const peliculaDB = await Pelicula.find();

    res.status(200).json(peliculaDB);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createPelicula = async (req, res) => {
  /* 	#swagger.tags = ['Pelicula']
    #swagger.description = 'Endpoint para guardar pelicula' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  // validate data
  const { error } = schemaPelicula.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const nombrePelicula = await Pelicula.findOne({
    nombre: req.body.nombre,
  });
  if (nombrePelicula)
    return res
      .status(400)
      .json({ error: "Ya existe una pelicula con ese nombre." });

  const peliculass = await Pelicula.find({
    listaID: req.body.listaID,
  });

  if (peliculass.length > 100)
    return res
      .status(400)
      .json({ error: "Has superado el número máximo de peliculas." });

  try {
    // Se crea el objecto a guardar
    const peliculaSv = new Pelicula({
      anio: req.body.anio,
      nombre: req.body.nombre,
      url: req.body.url,
      listaID: req.body.listaID,
    });

    // Se guarda la información
    const peliculaUser = await peliculaSv.save();

    //Se devuelve la respuesta
    res.status(200).json({
      data: peliculaUser,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error });
  }
};

const deletePelicula = async (req, res) => {
  /* 	#swagger.tags = ['Pelicula']
    #swagger.description = 'Endpoint para eliminar pelicula' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  const id = req.params.id;

  try {
    const peliculaDB = await Pelicula.findByIdAndDelete({ _id: id });

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
