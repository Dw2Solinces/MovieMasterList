const express = require("express");

const { calificarLista } = require("../controllers/calificacion.controllers");
const authMiddleware = require("../middlewares/authorization");
const router = express.Router();

router.use(authMiddleware);

router.post("/calificarLista", calificarLista);

module.exports = router;
