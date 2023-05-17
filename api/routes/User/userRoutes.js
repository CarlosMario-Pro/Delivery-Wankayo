const { Router } = require("express");
const userRouter = Router();
const user = require("../../controllers/userControllers");
const { isUser, isAdmin, isSuperAdmin } = require("../../middlewares/auth");


//http://localhost:3001/user
//REGISTRO - USUARIOS
userRouter.post("/register", user.registerUsers);                               //POST para registrar usuarios
userRouter.delete("/deleteAccount/:idUser", user.deleteAccountUser);            //POST para registrar usuarios
// userRouter.get("/verify/:token", user.confirmUser);                             //GET para verificar la cuenta del usuario recién registrado
userRouter.put("/logicalDeletionUser/:idUser", user.logicalDeletionUser);       //DELETE para aplicar eliminado lógico a cuenta del usuario
userRouter.put("/changePasswordUser/:idUser", user.changePasswordUser);         //PUT para cambiar contraseña del usuario


//INFORMATION
userRouter.get("/getAllUsers", user.getAllUsers);                               //GET para obtener todos los usuarios con role "user"
userRouter.get("/getAllEmails", user.getAllEmails);                               //GET para obtener todos los usuarios con role "user"
userRouter.get("/getAllInfoUser/:idUser", user.getAllInfoUser);                 //GET para obtener toda la información personal del usuario
userRouter.put("/putUserInfo/:idUser", user.putUserInfo);                               //PUT para modificar información personal del usuario


//ADDRESS
userRouter.post("/postAddress/:idUser", user.postAddress);                      //POST para crear dirección del usuario
userRouter.get("/getAddress/:idUser", user.getAddress);                         //GET para obtener todas las direcciones del usuario
userRouter.get("/getIdAddress/:idAddress", user.getIdAddress);                  //GET para obtener todas las direcciones del usuario
userRouter.put("/putAddress/:idUser/:idAddress", user.putAddress);              //PUT para actualizar la dirección del usuario
userRouter.delete("/deleteAddress/:idAddress", user.deleteAddress);             //DELETE para eliminar una dirección del usuario


//ORDERS
userRouter.get("/getIdOrders/:idOrder", user.getIdOrders);                      //POST para crear una order
userRouter.get("/getIdUserOrders/:idUser", user.getIdUserOrders);               //POST para crear una order
userRouter.post("/postOrders/:idUser", user.postOrders);                        //GET para obtener order actual del usuarios por su ID
userRouter.get("/getUserOrdersDelivered/:idUser", user.getUserOrdersDelivered);     //GET para obtener order el historial de órdenes del usuario
userRouter.get("/getUserOrdersActivesPending/:idUser", user.getUserOrdersActivesPending);                   //GET para obtener order el historial de órdenes del usuario
userRouter.get("/getUserOrdersActivesInPreparation/:idUser", user.getUserOrdersActivesInPreparation);       //GET para obtener order el historial de órdenes del usuario
userRouter.get("/getUserOrdersActivesOnTheWay/:idUser", user.getUserOrdersActivesOnTheWay);                 //GET para obtener order el historial de órdenes del usuario

// userRouter.get("/getUserOrdersActivesOnTheWay/:idUser", user.getUserOrdersActivesOnTheWay);                 //GET para obtener order el historial de órdenes del usuario

module.exports = userRouter;