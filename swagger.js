const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})


const doc = {
    info: {
        version: "1.0.0",
        title: "API My 100 Movie List",
        description: "Documentación para la gestión de <b>My 100 Movie List<b>"
    },
    host: "localhost:3001",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Usuario",
            "description": "Gestion de login y registro de usuario"
        },
        {
            "name": "ListaPelicula",
            "description": "Gestion de las listas de las peliculas del usuario"
        },
        {
            "name": "Pelicula",
            "description": "Gestion de guardar y eliminar peliculas"
        },
        {
            "name": "Calificacion",
            "description": "Gestion de las calificaciones de las peliculas"
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js')           // Your project's root file
})