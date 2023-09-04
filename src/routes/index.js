const express = require('express');
const peliculaRouter = require('./pelicula.routes');

const rootRouter = express.Router();
rootRouter.use("/pelicula", peliculaRouter);

module.exports = rootRouter;