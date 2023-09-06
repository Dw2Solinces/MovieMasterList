class ListaPeliculaDetalleDTO {

  constructor(id, nombreLista, nickname, calificacion, peliculas) {
    this.id = id;
    this.nombreLista = nombreLista;
    this.nickname = nickname;
    this.calificacion = calificacion;
    this.peliculas = peliculas;
  }
}

module.exports = ListaPeliculaDetalleDTO;
