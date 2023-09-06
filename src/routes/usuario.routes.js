const express = require("express");

const {
  login,
  registrarUsuario,
} = require("../controllers/usuario.controllers");
const router = express.Router();

router.post("/registroUsuario", registrarUsuario);

router.post("/login", login);

module.exports = router;
