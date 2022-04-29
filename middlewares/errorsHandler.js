const errorsHandler = (err, req, res, next) => {
    let code = 500;
    let msg = err.errors ? err.errors.map(e => {
        if (e.type === "unique violation" && e.path === "email") {
            return "Email has been registered";
        }
        return e.message;
    }) : 'Internal Server Error' ;
    
    switch(err.name) {
        case "SequelizeValidationError":
            code = 400;
            msg = err.errors.map(e => e.message);
            break;
        case "FAILED_TO_CREATE_OR_UPDATE":
            code = 400;
            msg = "Error when create or update";
            break;
        case "JsonWebTokenError":
            code = 401;
            msg = "Error authentication, must login first";
            break;
        case "EMAIL_OR_PASSWORD_NOT_FOUND":
            code = 401;
            msg = "Error user not found or password not matched";
            break;
        case "NOT_ALLOWED":
            code = 403;
            msg = "Forbidden error in authorization";
            break;
        case "USER_NOT_FOUND":
            code = 404;
            msg = "User not found";
            break;
        case "MOVIE_NOT_FOUND":
            code = 404;
            msg = "Movie not found";
            break;
    }

    res.status(code).json({
        statusCode: code,
        message: msg
    })
}

module.exports = errorsHandler;