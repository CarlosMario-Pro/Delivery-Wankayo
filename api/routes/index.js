const { Router } = require("express");
const route = Router();


/*--------------Rutas--------------*/
const adminRouter = require("./Admin/adminRoutes");     //Ruta para los admin
const userRouter = require("./User/userRoutes");        //Ruta para los usuarios
const loginRouter = require("./Login/loginRoutes");     //Ruta para login de usuarios


/*--------------Endpoints--------------*/
route.use("/admin", adminRouter);                       //Endpoint para los admin
route.use("/user", userRouter);                         //Endpoint para los admin
route.use("/login", loginRouter);                       //Endpoint para login de usuarios


module.exports = route;