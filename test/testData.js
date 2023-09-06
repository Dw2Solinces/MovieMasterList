const badNewUser = {
  nombre: "Kadel Lacatt",
  nickname: "klacatt4",
  fechaNacimiento: "1981-09-25",
  password: "12345",
};

const goodNewUser = {
  correo: "pedritofortuna@hotmail.com",
  nombre: "Kadel Lacatt",
  nickname: "klacatt004",
  fechaNacimiento: "1981-09-25",
  password: "123456"
};

const badNewListaPelicula = {
  nombre: "klacatt_004@hotmail.com",
};

const goodNewListaPelicula = {
  nombre: "klacatt_004@hotmail.com",
  usuarioID: "Kadel Lacatt",
};

const badNewPelicula = {
  nombre: "klacatt_004@hotmail.com",
  anio: "Kadel Lacatt",
  url: "klacatt_004",
};

const goodNewPelicula = {
  nombre: "klacatt_004@hotmail.com",
  anio: "Kadel Lacatt",
  url: "klacatt_004",
  listaID: "1981-09-25",
};

const badNewCalificacion = {
  usuarioID: "Kadel Lacatt",
  calificacion: "klacatt_004",
};

const goodNewCalificacion = {
  usuarioID: "Kadel Lacatt",
  calificacion: "klacatt_004",
  listaID: "1981-09-25",
};

module.exports = {
    badNewUser,
    goodNewUser,
    badNewListaPelicula,
    goodNewListaPelicula,
    badNewPelicula,
    goodNewPelicula,
    badNewCalificacion,
    goodNewCalificacion
}