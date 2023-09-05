const Calificacion = require("../models/calificacion.models");
const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaCalificaicion = Joi.object({
  usuarioID: Joi.string().required(),
  listaPeliculaID: Joi.string().required(),
  calificacion: Joi.string().required(),
});

const calificarLista = async (req, res) => {
  // validate data
  const { error } = schemaCalificaicion.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Se crea el objecto a guardar
  const calificacionSv = new Calificacion({
    usuarioID: req.body.nombre,
    listaPeliculaID: req.body.lanzamiento,
    calificacion: req.body.url,
  });

  try {
    // Se guarda la información
    await calificacionSv.save();

    //Se devuelve la respuesta
    res.status(201).json({
      data: "Calificacion guardada correctamente",
    });
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

module.exports = {calificarLista};
