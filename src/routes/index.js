const express = require('express');
const peliculaRouter = require('./pelicula.routes');
const usuarioRouter = require('./usuario.routes');
const calificacionRouter = require('./calificacion.routes');
const listaPelicula = require('./listaPelicula.routes');

const rootRouter = express.Router();
rootRouter.use("/pelicula", peliculaRouter);
rootRouter.use("/api", usuarioRouter);
rootRouter.use("/calificacion", calificacionRouter);
rootRouter.use("/listaPelicula", listaPelicula);

module.exports = rootRouter;