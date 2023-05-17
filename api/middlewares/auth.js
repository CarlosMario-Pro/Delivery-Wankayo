const isAuthenticatedUser = (req, res, next) => {
    if (req.headers["x-user-session"]) {
        const session = JSON.parse(req.headers["x-user-session"]);
        console.log('Login', req.headers)
        if (!session) {
            return res.status(403).send("Inicio de sesión para continuar");
        }
        req.user = session;
        next();
    } else {
        return res.status(403).send("No autenticado");
    }
};


const isUser = (req, res, next) => {
    isAuthenticatedUser(req, res, () => {
        if ( req.user.role === "user" || req.user.role === "admin" || req.user.role === "superAdmin") {
            next();
        } else {
            res.status(403).send("Access denied. isUser");
        }
    });
};
  
  
// For Admin
const isAdmin = (req, res, next) => {
    isAuthenticatedUser(req, res, () => {
        if ( req.user.role === "admin" || req.user.role === "superAdmin") {
            next();
        } else {
            res.status(403).send("Access denied. isAdmin");
        }
    });
};


// For Admin
const isSuperAdmin = (req, res, next) => {
    isAuthenticatedUser(req, res, () => {
        if ( req.user.role === "superAdmin") {
            next();
        } else {
            res.status(403).send("Access denied. isSuperAdmin");
        }
    });
};


module.exports = { isUser, isAdmin, isSuperAdmin };


// Cada que se recargue la pagina se va a hacer una peticion al backend mandando esa cookie para que nos devuelva los datos del usuario. 
// Por ultimo cada que se haga una peticion a una ruta se va a mandar los datos del usuario para que el middleware los verifique y de acceso.