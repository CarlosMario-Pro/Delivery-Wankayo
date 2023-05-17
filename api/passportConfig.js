require("dotenv").config();
const { CLIENT_ID_GOOGLE, CLIENT_SECRET_GOOGLE } = process.env;
const User = require("./models/Users");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;



module.exports = function (passport) {
    passport.use(
        "local",
        new localStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                // console.log(email, password)
                try {
                    const user = await User.findOne({ email: email });
                    // console.log(user.email)
                    if (!user) return done(null, false);
                    const result = bcrypt.compareSync(password, user.password); // Cambio aquí
                    // console.log(result)
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                } catch (err) {
                    throw err;
                }
            }
        )
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: CLIENT_ID_GOOGLE,
                clientSecret: CLIENT_SECRET_GOOGLE,
                callbackURL: "/auth/google/callback",
                state: true,
            },
            async function (accessToken, refreshToken, profile, cb) {
                try {
                    const email = profile._json?.email; // use optional chaining operator
                    if (!email) {
                        throw new Error("No email found in Google profile");
                    }

                    const user = await User.findOne({
                        email,
                        name: profile.displayName,
                    });

                    if (!user) {
                        const user = new User({
                            email,
                            name: profile.displayName,
                        });
                        await user.save();
                        return cb(null, user);
                    } else {
                        const user = await User.findById(provider.user_id);
                        return cb(null, user);
                    }
                } catch (err) {
                    return cb(err);
                }
            }
        )
    );

  
    // LA SERAILIZACION Y LA DESERIALIZACION SE REALIZAN DESPUES DE QUE EL USUSARIO SE LOGEO CORRECTAMENTE(DESPUES DE QUE EL CALLBACK DE LAS ESTRATEGIAS RETORNE CORRECTAMENTE AL USUSARIO). SE GUARDA UN ID DE LA SESSION DEL USUSARIO ENCRIPTADA EN NODE Y SE MANDA COMO COOKIE AL FRONT
    passport.serializeUser((user, cb) => {          //Aquí es donde se guarda en express session
        // console.log("SerializeUser", user);
        cb(null, user.id);                          //Aquí solo le digo que guarde el id del user dentro de express sesion
    });


    //SUPER IMPORTATE
    // Recibe el identificador de sesión y utiliza este identificador para buscar la información serializada del usuario en la memoria del servidor. Si se encuentra la información, Passport la deserializa y la añade al objeto req.user de la petición.
    passport.deserializeUser(async (id, cb) => {
        try {
            // console.log("DeserializeUser id", id);
            const user = await User.findOne({ _id: id });
            // console.log("User ", user);
            const userInformation = {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                docIdentity: user.docIdentity,
                email: user.email,
                phone: user.phone,
                isVerified: user.isVerified,
                role: user.role,
                orders: user.orders,
                address: user.address,
                createdAt: user.createdAt
            };
            // Toda esta información es la que se renderiza en primera instancia cuando voy al panel del usuario
            return cb(null, userInformation);   //El cb lo guarda en el req.user
        } catch (err) {
            return cb(err);
        }
    });
}
// En primer lugar, la función serializeUser de Passport se utiliza para almacenar información del usuario en una sesión de usuario. En este caso, la información del usuario que se va a almacenar es el id del usuario. Cuando el usuario inicia sesión, se llama a esta función y se pasa el objeto user como argumento junto con una función de devolución de llamada cb que se encarga de cualquier error que pueda surgir durante el proceso.
// En segundo lugar, la función deserializeUser de Passport se utiliza para recuperar la información del usuario almacenada en la sesión y devolverla al servidor para su uso en la aplicación. En este caso, se busca en la base de datos de usuarios utilizando el id del usuario que se pasó en la función serializeUser. Si se encuentra el usuario, se crea un objeto userInformation que contiene los datos relevantes del usuario, como su nombre y nombre de usuario, y se devuelve a través de la función de devolución de llamada cb. Si no se encuentra el usuario o si hay algún error durante el proceso, se pasa el error a la función de devolución de llamada cb.
// En resumen, Passport.js se utiliza para autenticar a los usuarios en una aplicación web y esta sección de código configura cómo se almacenan y recuperan los datos de los usuarios de la sesión de Passport.