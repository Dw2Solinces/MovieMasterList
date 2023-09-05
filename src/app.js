require("dotenv").config();
const express = require("express");
const rootRouter = require("./routes/index");

const app = express();
const cors = require("cors");

//MW incluidos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// rutas
app.use("", rootRouter);

// Home Api
app.get("/", async (req, res) => {
  res.json({
    mensaje: "Servidor corriendo correctamente.",
  });
});

module.exports = app;
