const { Schema, model } = require('mongoose');
//por defecto mongoose añade una propiedad _id con tipo ObjectId
//cada vez que ingresa un nuevo documento un _id nuevo es generado.
const listaPeliculaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Debe ingresar el nombre de la pelicula.']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    usuarioID: {
        type: String,
        required: [true, 'Debe ingresar el id del Usuario.']
    },
    calificacionPromedio: {
        type: Number,
        required: false
    },
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' }
});

/**
 * construimos finalmente el modelo a partir del eschema definido.
 */
const listaPelicula = model('ListaPelicula', listaPeliculaSchema);
module.exports = listaPelicula;