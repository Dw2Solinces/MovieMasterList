const Calificacion = require("../models/calificacion.models");
const ListaPelicula = require("../models/listaPelicula.models");
const Joi = require("@hapi/joi");

//Se define las validaciones para guardar la pelicula
const schemaCalificaicion = Joi.object({
  listaPeliculaID: Joi.string().required(),
  calificacion: Joi.string().required(),
});

const calificarLista = async (req, res) => {
  /* 	#swagger.tags = ['Calificacion']
    #swagger.description = 'Endpoint para calificar una pelicula.' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  // validate data
  const { error } = schemaCalificaicion.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Se crea el objecto a guardar
  const calificacionSv = new Calificacion({
    listaPeliculaID: req.body.listaPeliculaID,
    calificacion: req.body.calificacion,
  });

  try {
    // Se guarda la información
    await calificacionSv.save();

    const calificaiones = await Calificacion.find({
      listaPeliculaID: req.body.listaPeliculaID,
    });
    const totalCalificaciones = calificaiones.length;
    const sumOfCalificaciones = calificaiones.reduce(
      (acc, calificacion) => acc + calificacion.calificacion,
      0
    );
    const averageRating =
      totalCalificaciones > 0 ? sumOfCalificaciones / totalCalificaciones : 0;

    const objetoActualizado = await ListaPelicula.findByIdAndUpdate(
      req.body.listaPeliculaID,
      { calificacionPromedio: averageRating },
      {
        new: true, // Devuelve el objeto actualizado en lugar del original
      }
    );

    //Se devuelve la respuesta
    res.status(200).json({
      data: "Calificacion guardada correctamente",
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error });
  }
};

module.exports = { calificarLista };
