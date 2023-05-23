require("dotenv").config();                     
const express = require("express");                 
const cors = require("cors");                    
const routes = require("./routes/index");     
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/Users");
const { CLIENT_URL, SECRET_SESSION } = process.env;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CLIENT_URL, // <-- location of the react app were connecting to
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        allowedHeaders: ['Content-Type', 'x-user-session'],     //Se usa para enviar los datos de sesión desde el front al middleware del back
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.set('trust proxy', 1);

app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // tiempo de vida de la cookie
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        // domain: '.vercel.app' // Establecer el dominio de la cookie
    }
}));

app.use(cookieParser(SECRET_SESSION));
app.use(passport.initialize());                     //Inicializa Passport
app.use(passport.session());                        //Passport trabaja con session para guardar un objeto con los datos del usuario para que cuando navegue, los datos se guarden en el servidor hasta que el maxAge expire
require("./passportConfig")(passport);              //Este se manda a passport config


app.use("/", routes);

app.get("/getUserData",(req, res)=>{
    const user = req.user
    // console.log("getUser", user)
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(401).send("Usuario no logeado")
    }
})



app.get("/logout", (req, res) => {
    console.log('Hola 1')
    req?.session?.destroy((err) => {
        if (err) {
            // Manejar el error aquí
            console.error(err);
            res.status(500).json({ success: false, message: "No se pudo cerrar la sesión." });
        } else {
            console.log('Hola 2')
            // Eliminando la cookie
            res.clearCookie('connect.sid');
            console.log('Hola 3')
            res.status(200).json({ success: true });
            console.log('Hola 4')
        }
    });
});


module.exports = app;