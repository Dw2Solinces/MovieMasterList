const express = require("express");

const calificarLista = require("../controllers/calificacion.controllers");
const router = express.Router();

router.use(authMiddleware);

router.get("/calificarLista", calificarLista);

module.exports = router;