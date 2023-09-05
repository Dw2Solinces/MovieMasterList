const { Schema, model } = require('mongoose');
//por defecto mongoose añade una propiedad _id con tipo ObjectId
//cada vez que ingresa un nuevo documento un _id nuevo es generado.
const peliculaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Debe ingresar el nombre de la pelicula']
    },
    anio: {
        type: String,
        require: [true, 'El año de la pelicula es obligatorio.']
    },
    url: {
        type: String,
        require: false
    },
    listaID: {
        type: String,
        require: [true, 'El ID de la lista es requerido']
    },
},
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updateAt' }
});

/**
 * construimos finalmente el modelo a partir del eschema definido.
 */
const pelicula = model('Pelicula', peliculaSchema);
module.exports = pelicula;