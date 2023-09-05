const express = require("express");

const {
  guardarLista,
  getAllListaPelicula,
  listaPeliculaUsuario,
} = require("../controllers/listaPelicula.controllers");
const router = express.Router();
const authMiddleware = require("../middlewares/authorization");

router.post("/", authMiddleware, guardarLista);

router.get("/", getAllListaPelicula);

router.get("/:id", listaPeliculaUsuario);

module.exports = router;
