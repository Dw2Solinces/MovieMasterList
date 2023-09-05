const express = require("express");

const {
  login,
  registrarUsuario,
} = require("../controllers/usuario.controllers");
const router = express.Router();

router.get("/registroUsuario", login);

router.post("/login", registrarUsuario);

module.exports = router;
