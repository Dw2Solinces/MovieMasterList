const { Schema, model } = require('mongoose');
const { compare, genSalt, hash } = require('bcrypt');

const usuarioSchema = new Schema({
    correo: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar el correo electrónico.']
    },
    nombre: {
        type: String,
        required: [true, 'Debe ingresar su nombre completo']
    },
    nickname: {
        type: String,
        unique: true,
        required: [true, 'Debe ingresar un nickname']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'Debe ingresar su fecha de nacimiento']
    },
    password: {
        type: String,
        required: [true, 'Debe ingresar su contraseña']
    }
},
{
    timestamps: { createdAt: 'creationDate', updatedAt: 'lastUpdate' }
});

usuarioSchema.pre('save', async function(next) {
    
	//si el password no se modifica no haremos nada
	if (!this.isModified('password')) return next();
		
	const salt = await genSalt(+process.env.SALTING_ROUNDS);
	this.password = await hash(this.password, salt);
	next();
    
    
});

usuarioSchema.methods.comparePassword = async function(plainText) {
    return await compare(plainText, this.password);
}

const usuario = model('Usuario', usuarioSchema);
module.exports = usuario;