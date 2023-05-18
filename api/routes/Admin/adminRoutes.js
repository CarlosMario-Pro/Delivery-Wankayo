const { Router } = require("express");
const adminRouter = Router();
const admin = require("../../controllers/adminControllers");
const { isAdmin, isSuperAdmin } = require("../../middlewares/auth");


//http://localhost:3001/admin/
adminRouter.get("/getUserAdmin", admin.getUserAdmin);                                           //GET para obtener todos los usuarios administradores - Se pasa aquí para su funcionamiento
adminRouter.get("/getCategories", admin.getCategories);                                         //GET para obtener todas las categorías
adminRouter.get("/getDrinks", admin.getDrinks);                                                 //GET para obtener todas las bebidas
adminRouter.get("/getAccompanyings", admin.getAccompanyings);                                   //GET para obtener todas los acompañamientos
adminRouter.get("/getExtras", admin.getExtras);                                                 //GET para obtener todas los extras
adminRouter.get("/getSauces", admin.getSauces);                                                 //GET para obtener todas las salsas
adminRouter.get("/getNameProducts", admin.getNameProducts);                                     //GET para obtener productos por nombre
adminRouter.get("/getOrders", admin.getOrders);                                                 //GET para obtener todas las ordenes
adminRouter.get("/getOrdersPendings", admin.getOrdersPendings);                                 //GET para obtener todas las ordenes
adminRouter.get("/getOrdersInPreparation", admin.getOrdersInPreparation);                       //GET para obtener todas las ordenes
adminRouter.get("/getOrdersOnTheWay", admin.getOrdersOnTheWay);                                 //GET para obtener todas las ordenes
adminRouter.get("/getOrdersHistory", admin.getOrdersHistory);                                   //GET para obtener todas las ordenes
adminRouter.get("/getOrdersHistoryDelivered", admin.getOrdersHistoryDelivered);                 //GET para obtener todas las ordenes


//USUARIOS ADMIN
adminRouter.post("/postUserAdmin", admin.postUserAdmin);                                        //POST para crear usuarios administradores
adminRouter.get("/getIdUserAdmin/:idAdmin", admin.getIdUserAdmin);                              //GET para obtener usuarios administradores por su ID
adminRouter.put("/putUserAdmin/:idAdmin", admin.putUserAdmin);                                  //PUT para modificar un usuario administrador
adminRouter.delete("/deleteUserAdmin/:idAdmin", admin.deleteUserAdmin);                         //DELETE para eliminar permanentemente un usuario administrador
adminRouter.put("/trueLogicalDeletionAdmin/:idAdmin", admin.trueLogicalDeletionAdmin);          //PUT para aplicar borrado lógico a un usuario administrador
adminRouter.put("/falseLogicalDeletionAdmin/:idAdmin", admin.falseLogicalDeletionAdmin);        //PUT para quitar borrado lógico a un usuario administrador
adminRouter.put("/blockedAdmin/:idAdmin", admin.blockedAdmin);                                  //PUT para bloquear un usuario administrador
adminRouter.put("/unlockedAdmin/:idAdmin", admin.unlockedAdmin);                                //PUT para desbloquear un usuario administrador


//PRODUCTOS
adminRouter.post("/", admin.postProduct);                                                       //POST para crear productos
adminRouter.get("/", admin.getProducts);                                                        //GET para obtener todos los productos
adminRouter.get("/getProductsLogical", admin.getProductsLogical);                               //GET para obtener todos los productos
adminRouter.get("/:idProduct",admin.getIdProduct);                                              //GET para obtener productos por su ID
adminRouter.put("/:idProduct", admin.putProduct);                                               //PUT para modificar un producto
adminRouter.delete("/:idProduct", admin.deleteProduct);                                         //DELETE para eliminar un producto de forma permanente
adminRouter.put("/trueLogicalDeletionProduct/:idProduct", admin.trueLogicalDeletionProduct);    //PUT para aplicar borrado lógico a un producto
adminRouter.put("/falseLogicalDeletionProduct/:idProduct", admin.falseLogicalDeletionProduct);  //PUT para quitar borrado lógico a un producto


//CATEGORIAS
adminRouter.post("/postCategory", admin.postCategory);                                          //POST para crear una categoría
adminRouter.put("/putCategory/:idCategory", admin.putCategory);                                 //PUT para modificar una categoría
adminRouter.delete("/deleteCategory/:idCategory", admin.deleteCategory);                        //DELETE para eliminar permanentemente una categoría


//BEBIDAS
adminRouter.get("/getDrinks/:idDrinks", admin.getIdDrinks);                                     //GET para traer una bebida por ID    
adminRouter.post("/postDrinks", admin.postDrinks);                                              //POST para crear una bebida
adminRouter.put("/putDrinks/:idDrinks", admin.putDrinks);                                       //PUT para actualizar una bebida
adminRouter.delete("/deleteDrinks/:idDrinks", admin.deleteDrinks);                              //DELETE para eliminar permanentemente una bebida


//ACOMPAÑAMIENTOS
adminRouter.get("/getAccompanyings/:idAccompanyings", admin.getIdAccompanyings);                //GET para obtener un acompañamiento por su ID
adminRouter.post("/postAccompanyings", admin.postAccompanyings);                                //POST para crear un acompañamiento
adminRouter.put("/putAccompanyings/:idAccompanyings", admin.putAccompanyings);                  //PUT para actualizar un acompañamiento
adminRouter.delete("/deleteAccompanyings/:idAccompanyings", admin.deleteAccompanyings);         //DELETE para eliminar un acompañamiento


//EXTRAS
adminRouter.get("/getExtras/:idExtras", admin.getIdExtras);                                     //GET para obtener un extra por su ID
adminRouter.post("/postExtras", admin.postExtras);                                              //POST para crear un extras
adminRouter.put("/putExtras/:idExtras", admin.putExtras);                                       //PUT para actualizar un extras
adminRouter.delete("/deleteExtras/:idExtras", admin.deleteExtras);                              //DELETE para eliminar permanentemente un extras


//SALSAS
adminRouter.get("/getSauces/:idSauces", admin.getIdSauces);                                     //GET para obtener una salsa por su ID
adminRouter.post("/postSauces", admin.postSauces);                                              //POST para crear una salsa
adminRouter.put("/putSauces/:idSauces", admin.putSauces);                                       //PUT para actualizar una salsa
adminRouter.delete("/deleteSauces/:idSauces", admin.deleteSauces);                              //DELETE para eliminar una salsa


//ORDENES
adminRouter.delete("/deleteOrder/:idOrder", admin.deleteOrder);                                 //GET para obtener todas las ordenes
adminRouter.put("/cancelOrder/:idOrder", admin.cancelOrder);                                    //GET para cancelar una orden
adminRouter.put("/changeStatusOrder/:idOrder", admin.changeStatusOrder);                        //PUT para cambiar el status de una orden
adminRouter.put("/trueLogicalOrdersHistory/:idOrder", admin.trueLogicalOrdersHistory);          //Marca una orden como archivada
adminRouter.put("/falseLogicalOrdersHistory/:idOrder", admin.falseLogicalOrdersHistory);        //Desmarca una orden puesta como archivada
adminRouter.put("/changeStatusOrderPrevious/:idOrder", admin.changeStatusOrderPrevious);        //Cambia al status previo de una orden en caso de avanzarla por error


module.exports = adminRouter;