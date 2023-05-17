const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();


const loginRouter = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ message: "Incorrect email or password" });
        }
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
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
        }
    })(req, res, next);
}; // POST - http://localhost:3001/login con { "role": "user", "email": "cmario.reyesp@gmail.com", "password": "Carlos..150" }


module.exports = {
    loginRouter
};