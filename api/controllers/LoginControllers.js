const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();

const loginRouter = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    docIdentity: user.docIdentity,
                    phone: user.phone,
                    orders: user.orders,
                    address: user.address,
                    createdAt: user.createdAt,
                    email: user.email,
                    role: user.role,
                });
            });
        })(req, res, next);
    } catch (err) {
      next(err);
    }
};


module.exports = {
    loginRouter
};



/*


const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();


const loginRouter = (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ error: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    _id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    docIdentity: user.docIdentity,
                    phone: user.phone,
                    orders: user.orders,
                    address: user.address,
                    createdAt: user.createdAt,
                    email: user.email,
                    role: user.role,
                });
            });
        })(req, res, next);
    } catch (err) {
      next(err);
    }
};


module.exports = {
    loginRouter
}; // POST - http://localhost:3001/login con { "email": "cmario.reyesp@gmail.com", "password": "Carlos..150" }




*/

