const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {

    //Buscamos el encabezado de authorization.
    const Authorization = req.header('Authorization');
    
    //Si no tenemos encabezado, devolvemos un badrequest.
    if (!Authorization) {
        res.status(401).send("No tiene permisos para usar este recurso.");
    }else {

        try {
            //extraemos el token
            const token = Authorization.split(' ')[1];
            req.jwt_payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();

        } catch (err) {
            //si ocurre un error es porque el token es inválido.
            console.log(err);
            res.status(401).send("No tiene permisos para usar este recurso");
            
        }        
    }

}

module.exports = authGuard;