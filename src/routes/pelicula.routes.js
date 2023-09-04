const express = require("express");

const { getAllPeliculas,
    createPelicula,
    deletePelicula } = require("../controllers/pelicula.controllers");
const router = express.Router();
const authMiddleware = require('../middlewares/authorization');

router.use(authMiddleware);

router.get("/", getAllPeliculas);

router.post("/", createPelicula);

router.delete("/:id", deletePelicula);

module.exports = router;