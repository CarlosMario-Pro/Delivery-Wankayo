const mongoose = require("mongoose");
const User = require("../models/Users");
const Address = require("../models/Address");
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');
const { transporter, mailWelcome, mailConfirmActivateAccountNewPassword, mailNewPassword, mailConfirmNewPassword, mailDelete, mailOrderCreate, mailMasive } = require("../additional/Nodemailer");
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();


//USER - CLIENT - Registro de usuarior administradores y particulares
const registerUsers = async (req, res) => {
    const { name, lastName, docIdentity, email, password, phone } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
        return res.status(400).send({ message: 'El email es inválido' });
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
        return res.status(400).send({ message: 'La contraseña no cumple los requisitos mínimos' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).send({ message: 'El correo electrónico ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({
            name,
            lastName,
            docIdentity,
            email,
            password: hashedPassword,
            phone
        });        
        await user.save();
        const mailOptions = mailWelcome(email);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Correo electrónico enviado: ${info.response}`);
            }
        });
        res.status(201).send('Usuario registrado exitosamente');
    } catch {
        res.status(500).send('Error al registrar el usuario');
    }
}; // POST - http://localhost:3001/user/register con { "name": "Carlos", "lastName": "Reyes", "email": "carlosmario.reyesp@gmail.com", "docIdentity": "AAA-1151111", "password": "Carlos..15", "phone": "3128052002" }

//Marca una orden como archivada
const unblockUser = async (req, res) => {
    const { idUser } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idUser);
            if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
            user.loginAttempts = 0;
            user.isBlocked = false;
            await user.save();
            res.status(200).send({ message: "Usuario activado con éxito" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al enviar a archivo la orden";
        return res.status(status).send({ message });
    }
}; // PUT - http://localhost:3001/user/unblockUser/:idUser

//Elimina la cuenta de un usuario
const deleteAccountUser = async (req, res) => {
    const { idUser } = req.params;
    console.log(idUser)
    try {
        const user = await User.findByIdAndRemove(idUser);
        console.log('user ',user)
        if (!user) {
            res.status(404).send("Usuario no encontrado");
        } else {
            const mailOptions = mailDelete(user.email);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Correo electrónico enviado: ${info.response}`);
                }
            });
            res.status(201).send('Cuenta del usuario eliminada exitosamente');
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor.");
    }
}; // DELETE - http://localhost:3001/user/deleteAccount/:idUser

//Eliminado lógico de un usuario
const logicalDeletionUser = async (req, res) => {           //!NO IMPLEMENTADA
    const { idUser } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idUser);
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            user.isDeleted = true;
            await user.save();
            res.status(200).send({ message: "Usuario eliminado (ocultado) exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al eliminar (ocultar) el producto";
        return res.status(status).send({ message });
    }
};// PUT - http://localhost:3001/user/logicalDeletionUser/:idUser

//Activar cuenta y cambiar contraseña de un usuario
const recoverPassword = async (req, res) => {
    const { idUser } = req.params;
    const { password } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findOne({ _id: idUser });
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
            const isValidPassword = passwordRegex.test(password);
            if (!isValidPassword) {
                return res.status(400).send({ message: 'La contraseña no cumple los requisitos mínimos' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;

            if(user.isBlocked === false) {
                user.loginAttempts = 0;
                await user.save();
                const mailOptions = mailConfirmNewPassword(user.email);
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Correo electrónico enviado: ${info.response}`);
                    }
                });
            } if (user.isBlocked === true) {
                user.isBlocked = false;
                user.loginAttempts = 0;
                await user.save();
                const mailOptions = mailConfirmActivateAccountNewPassword(user.email);
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Correo electrónico enviado: ${info.response}`);
                    }
                });
            }
            res.status(201).send('Contraseña actualizada exitosamente');
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
};  //PUT - http://localhost:3001/user/recoverPassword/:idUser con { "password" : "Carlos..1000" }

//Cambia la contraseña de un usuario
const changePassword = async (req, res) => {
    const { email } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }
            const link = `http://localhost:3000/recoverPassword/${user._id}`;
            const mailOptions = mailNewPassword(email, link);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Correo electrónico enviado: ${info.response}`);
                }
            });
            res.status(201).send('Contraseña actualizada exitosamente');
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
};  //PUT - http://localhost:3001/user/changePassword/:idUser con { "password" : "Carlos..1000"}

//Obtener toda la información de un solo usuario por ID
const getAllInfoUser = async (req, res) => {
    const { idUser } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idUser).populate("address").session(session);
            if (!user) {
                return res.status(404).send({ message: "El usuario no se encontró" });
            }
            return res.status(200).json(user);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener la información del usuario";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // GET - http://localhost:3001/user/getAllInfoUser/:idUser

//Actualiza la información de un usuario
const putUserInfo = async (req, res) => {
    const { idUser } = req.params;
    const { name, lastName, docIdentity, email, phone } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const updatedUser = await User.findByIdAndUpdate(
                idUser,
                { name, lastName, docIdentity, email, phone },
                { user: true, session }
            );
            if (!updatedUser) {
                return res.status(404).send({ message: `El usuario con ID ${idUser} no fue encontrado` });
            }          
            res.status(200).json({
                name: updatedUser.name,
                lastName: updatedUser.lastName,
                docIdentity: updatedUser.docIdentity,
                email: updatedUser.email,
                phone: updatedUser.phone
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // PUT - http://localhost:3001/user/putUserInfo/:idUser con {  "name": "Carlos", "lastName": "Dev",  "docIdentity": "55555555", "email": "carlosmario.reyesp@gmail.com", "phone": "3004005566" }




//^ADDRESS
//Crea una dirección para el usuario
const postAddress = async (req, res) => {
    const { idUser } = req.params;
    try {
        const { country, state, city, street } = req.body;
        if (!country || !state || !city || !street ) {
            return res.status(400).send("Faltan datos");
        }
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        const addressUser = await Address.create(
            { country, state, city, street, user: idUser }
        );
        const addressId = addressUser._id;
        const updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            { $push: { address: addressId } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Error interno del servidor.');
    }
}; // POST - http://localhost:3001/user/postAddress/:idUser con { "country": "Colombia", "state": "Bogotá", "city": "Bogotá", "street": "Calle 40 con Cra 10" }

//Obtiene todas las direcciones del usuario
const getAddress = async (req, res) => {
    const { idUser } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const address = await Address.find({ user: idUser }).session(session);
            return res.status(200).json(address);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener las direcciones del usuario";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // GET - http://localhost:3001/user/getAddress/:idUser

//Obtiene una dirección en específico por ID
const getIdAddress = async (req, res) => {
    const { idAddress } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const address = await Address.findById(idAddress).session(session);
            if (!address) {
                return res.status(404).send({ message: "La dirección no se encontró" });
            }
            return res.status(200).json(address);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener la dirección";
        return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET - http://localhost:3001/user/getIdAddress/:idAddress

//Actualizar una dirección del usuario
const putAddress = async (req, res) => {
    const { idUser, idAddress } = req.params;
    try {
        const user = await User.findById(idUser);
        if (!user) {
            return res.status(404).send({ msg: "No se encontró el usuario." });
        }
        const address = await Address.findOne({user: idUser, _id: idAddress});
        if (!address) {
            return res.status(404).send({ msg: "No se encontró la dirección." });
        }
        address.country = req.body.country;
        address.state = req.body.state;
        address.city = req.body.city;
        address.street = req.body.street;
        await address.save();
        res.status(200).json(address);
    } catch (error) {
      res.status(404).send('No se logró actualizar tu dirección.');
      throw new Error('No se logró actualizar tu dirección.' + error.message);
    }
}; // PUT - http://localhost:3001/user/putAddress/:idUser/:idAddress

//Elimina una dirección del usuario
const deleteAddress = async (req, res) => {     //!IMPLEMENTADA CON OTRO NOMBRE
    const { idUser, idAddress } = req.params;
    try {
        await Address.findByIdAndDelete(idAddress);
        const user = await User.findByIdAndUpdate(idUser, { $pull: { address: idAddress } }, { new: true });
        res.send('Dirección eliminada de address y users');
    } catch (error) {
        console.error(error);
        res.status(500).send('No se logró eliminar tu dirección.');
    }
}; // DELETE - http://localhost:3001/user/deleteAddress/:idAddress




//^ORDENES
// Crea una orden y envía el correo de confirmación con todos los productos escogidos
const postOrders = async (req, res) => {
    const { idUser } = req.params;
    const { products, total, user, address, comment, cancelMessage } = req.body;
    try {
        const order = new Orders({ products, total, user, address, comment, cancelMessage });
        await order.save();

        const userInfo = await User.findById(idUser);
        const emailUser = userInfo.email;

        const addressInfo = await Address.findById(address);
        const addressUserCity = addressInfo.city;
        const addressUser = addressInfo.street;

        const mailOptions = mailOrderCreate(emailUser, products, total, addressUserCity, addressUser, comment);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Correo electrónico enviado: ${info.response}`);
            }
        });
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error al crear la orden" });
    }
}; // POST - http://localhost:3001/user/postOrders/:idUser con { "products": [ { "nameProduct": "Cono La Justa", "quantity": 1, "unitPrice": 8, "price": 8, "IdProduct": "6462f0a748d326c1ad0c0743" }, { "nameProduct": "Cono La Peque", "quantity": 2, "unitPrice": 6, "price": 12, "IdProduct": "6462f0a748d326c1ad0c0744" }, { "nameProduct": "Mayonesa", "quantity": 1, "unitPrice": 0, "price": 0, "IdProduct": "6462f0a948d326c1ad0c0791" } ], "total": 20, "user": "6462f108a3ae3a28738f3e8f", "address": "6462f164a3ae3a28738f3e9b", "comment": "Yo lo recojo en tienda, por favor, tenerla lista para las 5pm", "cancelMessage": "" }

//Obtener todas las órdenes vigentes de un usuario a excepción de las ENTREGADAS Y CANCELADAS
const getIdUserOrders = async (req, res) => {
    const { idUser } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({
                user: idUser,
                status: { $nin: ["Entregado", "Cancelada"] }
            }).populate("address").session(session);
            return res.status(200).json(orders);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener las órdenes";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET - http://localhost:3001/user/getIdUserOrders/:idUser

//Traer la información de una orden por ID
const getIdOrders = async (req, res) => {
    const { idOrder } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const order = await Orders.findById(idOrder).populate("user address").session(session);
            if (!order) {
                return res.status(404).send({ message: "Orden no encontrada" });
            }
            return res.status(200).json(order);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener la orden";
        return res.status(status).send({ message });
    } finally {
         await session.endSession();
    }
}; //GET - http://localhost:3001/user/getIdOrders/:idOrder










//Obtiene todos los usuarios con rol "user"
const getAllUsers = async (req, res) => {            //!NO IMPLEMENTADA
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const users = await User.find({ role: { $in: ["user"] } }).session(session);
            return res.status(200).json(users);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los usuarios";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET - http://localhost:3001/user/getAllUsers


//Ruta para NOTIFICACIONES - Permite obtener todos los emails de la base datos y enviar correos a remitente indiivdual de forma masiva
const getAllEmails = async (req, res) => {            //!NO IMPLEMENTADA
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const emails = await User.find({ role: { $in: ["user"] } }).select("email").lean().session(session);  
            for (const email of emails) {
                const mailOptions = mailMasive(email.email);
                await transporter.sendMail(mailOptions);
                console.log(`Correo electrónico enviado a ${email.email}`);
            }  
            return res.status(200).json({ message: 'Correos electrónicos enviados exitosamente' });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al enviar los correos electrónicos";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET - http://localhost:3001/user/getAllEmails





//Obtener todas las órdenes en status ENTREGADO de un usuario (Historial de órdenes)
const getUserOrdersDelivered  = async (req, res) => {               //!SE IMPLEMENTO OTRA
    const { idUser } = req.params;
    try {
        const deliveredOrders = await Orders.find({ user: idUser, status: "Entregado" }).populate("address");
        return res.status(200).json(deliveredOrders);
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener las órdenes entregadas";
        return res.status(status).send({ message });
    }
}; //GET - http://localhost:3001/user/getUserOrdersDelivered/:idUser


module.exports = {
    registerUsers,
    unblockUser,
    recoverPassword,
    changePassword,
    deleteAccountUser,
    // confirmUser,
    logicalDeletionUser,
    getAllUsers,
    getAllEmails,
    getAllInfoUser,
    putUserInfo,
    postAddress,
    getAddress,
    getIdAddress,
    putAddress,
    deleteAddress,

    postOrders,

    // getOrders,
    getIdOrders,
    getIdUserOrders,
    getUserOrdersDelivered,



};