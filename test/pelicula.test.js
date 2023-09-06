const request = require("supertest");
const mongoose = require("mongoose");

const { goodNewPelicula, badNewPelicula } = require("./testData");
const app = require("../src/app");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW5jaG9AZ21haWwuY29tIiwiaWF0IjoxNjkzOTYxMjYwLCJleHAiOjE2OTQzNzUyNjB9.8p6xe_VAEg7J7su6SMWT_WyUwmQjru0WAIL88lb_3ZY";

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe("Pruebas Unitarias Controlador Pelicula", () => {
  describe("Pruebas Endpoint pelicula", () => {
    test("Prueba de pelicula, petición sin datos", async () => {
      const response = await request(app)
        .post("/pelicula")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send();
      expect(response.statusCode).toBe(400);
    });

    test("Prueba de pelicula, peticion datos faltantes", async () => {
      const response = await request(app)
        .post("/pelicula")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(badNewPelicula);
      expect(response.statusCode).toBe(400);
    });

    test("Prueba de pelicula, peticion datos correctos", async () => {
      const response = await request(app)
        .post("/pelicula")
        .set("Authorization", `Bearer ${TOKEN}`)
        .send(goodNewPelicula);

      if (response.status === 400) {
        // Si la respuesta es un error 400, registra el mensaje de error
        console.error("Error 400:", response.body); // Imprime el cuerpo de la respuesta
      }

      expect(response.statusCode).toBe(200);
    });
  });
});
