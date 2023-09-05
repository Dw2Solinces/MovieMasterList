const Usuario = require("../models/usuario.models");
const Joi = require("@hapi/joi");

//Se define las validaciones para registrar el usuario
const schemaRegister = Joi.object({
  username: Joi.string().max(255).required(),
  nombre: Joi.string().max(255).required(),
  correo: Joi.string().max(255).required().email(),
  password: Joi.string().min(6).required(),
});

//Se define las validaciones para hacer el login
const schemaLogin = Joi.object({
  correo: Joi.string().max(255).required().email(),
  password: Joi.string().min(6).required(),
});

const registrarUsuario = async (req, res) => {
  // validate user
  const { error } = schemaRegister.validate(req.body);

  // Se devuelve el mensaje de error
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Se crea el objecto a guardar
  const user = new Usuario({
    nombre: req.body.nombre,
    nickname: req.body.username,
    correo: req.body.correo,
    password: req.body.password,
    fechaNacimiento: req.body.fechaNacimiento,
  });

  try {
    // Se guarda la información
    const savedUser = await user.save();

    //Se devuelve la respuesta
    res.status(200).json({
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  // validaciones
  try {
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await Usuario.findOne({ correo: req.body.correo });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) throw new error("Contraseña invalida.");

    const accessToken = await createToken(username);

    if (!accessToken) throw new error("Token inválido.");
    res.status(200).json(accessToken);
  } catch (error) {
    res.status(404).send("Nombre de usuario o contraseña incorrecta.");
  }
};

const createToken = async (user) => {
  const tokenPayload = {
    username: user,
  };
  const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TTL,
  });

  return token;
};

module.exports = { login, registrarUsuario };
