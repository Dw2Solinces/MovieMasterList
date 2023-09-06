const request = require("supertest");
const mongoose = require("mongoose");

const { goodNewListaPelicula, badNewListaPelicula } = require("./testData");
const app = require("../src/app");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW5jaG9AZ21haWwuY29tIiwiaWF0IjoxNjkzOTYxMjYwLCJleHAiOjE2OTQzNzUyNjB9.8p6xe_VAEg7J7su6SMWT_WyUwmQjru0WAIL88lb_3ZY";

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL);
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
}, 10000);

describe("Pruebas Unitarias Controlador ListaPelicula", () => {
  describe("Pruebas Endpoint ListaPelicula", () => {
    test("Prueba de ListaPelicula, petición sin datos", async () => {
      const response = await request(app).post("/pelicula").send();
      expect(response.statusCode).toBe(400);
    });

    test("Prueba de ListaPelicula, peticion datos faltantes", async () => {
      const response = await request(app)
        .post("/listaPelicula")
        .send(badNewListaPelicula)
        .set("Authorization", `Bearer ${TOKEN}`);
      expect(response.statusCode).toBe(400);
    });

    test("Prueba de ListaPelicula, peticion datos correctos", async () => {
      const response = await request(app)
        .post("/listaPelicula")
        .send(goodNewListaPelicula)
        .set("Authorization", `Bearer ${TOKEN}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
