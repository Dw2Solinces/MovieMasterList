const { Schema, model } = require('mongoose');
//por defecto mongoose añade una propiedad _id con tipo ObjectId
//cada vez que ingresa un nuevo documento un _id nuevo es generado.
const calificacionSchema = new Schema({
    usuarioID : {
        type: String,
        required: [true, 'Debe ingresar el id del usuario']
    },
    listaPeliculaID: {
        type: String,
        require: [true, 'El id de la lista es obligatorio.']
    },
    url: {
        type: String
    },
    calificacion: {
        type: Number,
        require: [true, 'Debe ingresar la calificacion.']
    },
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' }
});

/**
 * construimos finalmente el modelo a partir del eschema definido.
 */
const calificacion = model('Calificacion', calificacionSchema);
module.exports = calificacion;