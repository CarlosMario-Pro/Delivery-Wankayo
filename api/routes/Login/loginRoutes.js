const { Router } = require("express");
const loginRouter = Router();
const login = require("../../controllers/LoginControllers");


//LOGIN - SOLO USUARIOS CLIENTES
loginRouter.post("/", login.loginRouter);                       //POST para crear productos


module.exports = loginRouter;