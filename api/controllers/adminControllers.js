const Accompanyings = require("../models/Accompanyings");
const Categories = require("../models/Categories");
const Drinks = require("../models/Drinks");
const Extras = require("../models/Extras");
const Orders = require("../models/Orders");
const Products = require("../models/Products");
const Sauces = require("../models/Sauces");
const User = require("../models/Users");
const { transporter, mailWelcome, mailChangeStatusPreparation, mailChangeStatusOnTheWay, mailChangeStatusDeliveried, mailCancelOrder } = require("../additional/Nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const pluralize = require('pluralize');
const dotenv = require("dotenv");
dotenv.config();


//^PRODUCTS
//Crea productos
const postProduct = async (req, res) => {
    const { code, name, pseudoName, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let existProducts = await Products.findOne({ name }).session(session);
            if (existProducts)  return res.status(409).send({ message: `El producto ${name} ya existe` });
            const [createdProduct] = await Products.create(
                [ { code, name, pseudoName, image, description, price, promoPrice, category } ],
                { session }
            );
            res.status(200).json({
                id: createdProduct._id,
                code: createdProduct.code,
                name: createdProduct.name,
                pseudoName: createdProduct.pseudoName,
                image: createdProduct.image,
                description: createdProduct.description,
                price: createdProduct.price,
                promoPrice: createdProduct.promoPrice,
                category: createdProduct.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //POST http://localhost:3001/admin con { "name": "Super maleta", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1680210978/images/ucylwmaclplivybskcd3.png", "description": "Maleta roja", "price": 100, "category": "643017f46a0e3aa31703e961" }



//Obtener todos los productos con el borrado lógico
const getProducts = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const products = await Products.find({ isDeleted: false }).session(session);
            return res.status(200).json(products);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los productos";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // GET - http://localhost:3001/admin/


//Obtener todos los productos
const getProductsLogical = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const products = await Products.find({}).session(session);
            return res.status(200).json(products);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los productos";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/getProductsLogical

//Obtener un producto por id
const getIdProduct = async (req, res) => {
    const { idProduct } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const product = await Products.findById(idProduct).session(session);
            if (!product) return res.status(404).send({ message: "El producto no se encontró" });
            return res.status(200).json(product);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/:idProduct


//Crea actualizar productos
const putProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { code, name, pseudoName, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedProduct = await Products.findByIdAndUpdate(
                idProduct,
                { code, name, pseudoName, image, description, price, promoPrice, category },
                { products: true, session }
            );          
            if (!updatedProduct) return res.status(404).send({ message: `El producto con ID ${idProduct} no fue encontrado` });
            res.status(200).json({
                id: updatedProduct._id,
                code: updatedProduct.code,
                name: updatedProduct.name,
                pseudoName: updatedProduct.pseudoName,
                image: updatedProduct.image,
                description: updatedProduct.description,
                price: updatedProduct.price,
                promoPrice: updatedProduct.promoPrice,
                category: updatedProduct.category
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
}; //PUT http://localhost:3001/admin/:idProduct con  { "name": "Super Hamburguesa", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1677732823/images/se0ku9gfmbkcxqywtjad.jpg", "description": "Hamburguesa doble carne con peperoni y queso", "price": 20, "category": "643017f46a0e3aa31703e961" }


//Elimina permanentemente un producto
const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedProducts = await Products.findById(idProduct).session(session);
            if (!deletedProducts) {
                const message = `Producto con id ${idProduct} no fue encontrado`;
                return res.status(404).send({ message });
            }
            await deletedProducts.deleteOne();
            return res.status(204).send({ message: `Producto ${idProduct} eliminado exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar el producto";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //DELETE http://localhost:3001/admin/:idProduct


//Busca un producto por nombre
const getNameProducts = async (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            const singularName = pluralize.singular(name);
            const allProducts = await Products.find({
                $or: [
                    { name: { $regex: name, $options: 'i' } },
                    { name: { $regex: singularName, $options: 'i' } },
                    { pseudoName: { $regex: name, $options: 'i' } },
                    { pseudoName: { $regex: singularName, $options: 'i' } },
                ]
            });
            allProducts.length ?
            res.status(200).json(allProducts) :
            res.status(404).send('No está el producto.');
        }
        else {
            const allProducts = await Products.find();
            res.status(200).json(allProducts);
        }
    }
    catch (error) {
        throw new Error('No se logró traer el producto.' + error.message);
    }
}; // GET - http://localhost:3001/admin/getNameProducts?name=cono


//Elimina un producto con borrado lógico
const trueLogicalDeletionProduct = async (req, res) => {
    const { idProduct } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const products = await Products.findById(idProduct);
            if (!products) return res.status(404).send({ message: "Producto no encontrado" });
            products.isDeleted = true;
            await products.save();
            res.status(200).send({ message: "Producto eliminado (ocultado) exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al eliminar (ocultar) el producto";
        return res.status(status).send({ message });
    }
}; // PUT - http://localhost:3001/admin/trueLogicalDeletionProduct/:idProduct


//Activa un producto eliminado con borrado lógico
const falseLogicalDeletionProduct = async (req, res) => {
    const { idProduct } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const products = await Products.findById(idProduct);
            if (!products) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }
            products.isDeleted = false;
            await products.save();
            res.status(200).send({ message: "Producto recuperado exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al recuperar el producto";
        return res.status(status).send({ message });
    }
}; // PUT http://localhost:3001/admin/falseLogicalDeletionProduct/:idProduct




//^ADMIN
//Crea un usuario administrador
const postUserAdmin = async (req, res) => {
    const { name, lastName, docIdentity, email, password, phone, role } = req.body;
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
            phone,
            role
        });        
        await user.save();
        const mailOptions = mailWelcome(email);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else console.log(`Correo electrónico enviado: ${info.response}`);
        });
        res.status(201).send('Usuario registrado exitosamente');
    } catch {
        res.status(500).send('Error al registrar el usuario');
    }
}; //POST http://localhost:3001/admin/postUserAdmin con { "name": "Carlos Mario", "lastName": "Reyes", "docIdentity": "ABC1536455D5DDF", "email": "carlosmario.reyesp@gmail.com", "password": "Carlos15.", "phone": "+57 3004005566", "role": "superAdmin" }


//Obtiene todos los usuarios con rol "superAdmin" y "admin"
const getUserAdmin = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const users = await User.find({ role: { $in: ["superAdmin", "admin"] } }).session(session);
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
}; //GET http://localhost:3001/admin/getUserAdmin


//Obtiene un usuario administrador por id
const getIdUserAdmin = async (req, res) => {
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();  
    try {
      await session.withTransaction(async (session) => {
        const product = await User.findById(idAdmin).session(session);
        if (!product) {
          return res.status(404).send({ message: "El Admin no se encontró" });
        }
        return res.status(200).json(product);
      });
    } catch (error) {
      console.error(error);
      const status = error.status || 500;
      const message =
        error.message || "Ocurrió un error al obtener el Admin";
      return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET - http://localhost:3001/admin/getIdUserAdmin/:idAdmin


//Actualiza un usuario administrador
const putUserAdmin = async (req, res) => {
    const { idAdmin } = req.params;
    const { name, lastName, docIdentity, email, password, phone, role, isBlocked, isDeleted } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedUserAdmin = await User.findByIdAndUpdate(
                idAdmin,
                { name, lastName, docIdentity, email, password, phone, role, isBlocked, isDeleted },
                { users: true, session }
            );          
            if (!updatedUserAdmin) {
                return res.status(404).send({ message: `El usuario con ID ${idAdmin} no fue encontrado` });
            }          
            res.status(200).json({
                idAdmin: updatedUserAdmin._id,
                name: updatedUserAdmin.name,
                lastName: updatedUserAdmin.lastName,
                docIdentity: updatedUserAdmin.docIdentity,
                email: updatedUserAdmin.email,
                password: updatedUserAdmin.password,
                phone: updatedUserAdmin.phone,
                role: updatedUserAdmin.role,
                isBlocked: updatedUserAdmin.isBlocked,
                isDeleted: updatedUserAdmin.isDeleted,
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
}; // PUT http://localhost:3001/admin/putUserAdmin/:idAdmin con { "name": "Mar Caribe", "lastName": "Playas hermosas", "docIdentity": "Carlos12345678", "email": "prueba@gmail.com", "password": "Caribean123.", "phone": "5555555", "role": "admin" }


//Elimina permanentemente un usuario administrador
const deleteUserAdmin = async (req, res) => {
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedUser = await User.findById(idAdmin).session(session);
            if (!deletedUser) {
                const message = `Usuario con id ${idAdmin} no fue encontrado`;
                return res.status(404).send({ message });
            }
            await deletedUser.deleteOne();
            return res.status(204).send({ message: `Usuario ${idAdmin} eliminado exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar el Usuario";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //DELETE http://localhost:3001/admin/deleteUserAdmin/:idUser


//VER LA POSIBILIDAD DE HABILITAR LUEGO DE SER BORRADO LOGICAMENTE
//Elimina un usuario administrador con borrado lógico
const trueLogicalDeletionAdmin = async (req, res) => {              //!NO IMPLEMENTADO AUN
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idAdmin);
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
        const message = error.message || "Ocurrió un error al eliminar (ocultar) el usuario";
        return res.status(status).send({ message });
    }
}; //PUT http://localhost:3001/admin/trueLogicalDeletionAdmin/6430f62084de82b330f348b9


//Activa un producto eliminado con borrado lógico
const falseLogicalDeletionAdmin = async (req, res) => {             //!NO IMPLEMENTADO AUN
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idAdmin);
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            user.isDeleted = false;
            await user.save();
            res.status(200).send({ message: "Usuario recuperado exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al recuperar el usuario";
        return res.status(status).send({ message });
    }
}; //PUT http://localhost:3001/admin/falseLogicalDeletionAdmin/6430f62084de82b330f348b9


//Bloquea un usuaruio administrador
const blockedAdmin = async (req, res) => {                  //!NO IMPLEMENTADO AUN
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idAdmin);
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            user.isBlocked = true;
            await user.save();
            res.status(200).send({ message: "Usuario bloqueado exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al bloquear el usuario";
        return res.status(status).send({ message });
    }
}; //PUT http://localhost:3001/admin/blockedAdmin/6430f62084de82b330f348b9


//Desbloquea un usuaruio administrador
const unlockedAdmin = async (req, res) => {                 //!NO IMPLEMENTADO AUN
    const { idAdmin } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const user = await User.findById(idAdmin);
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" });
            }
            user.isBlocked = false;
            await user.save();
            res.status(200).send({ message: "Usuario desbloqueado exitosamente" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al desbloquear el usuario";
        return res.status(status).send({ message });
    }
}; //PUT http://localhost:3001/admin/unlockedAdmin/6430f62084de82b330f348b9


//Cambia el rol a un usuaruio administrador
const changeRoleAdmin = async (req, res) => {               //!NO IMPLEMENTADA, SE USA --putUserAdmin--
    const { idAdmin } = req.params;
    const { role } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const updatedUserAdmin = await User.findByIdAndUpdate(
                idAdmin,
                { role },
                { users: true, session }
            );
            if (!updatedUserAdmin) {
                return res.status(404).send({ message: `Al usuario con ID ${idAdmin} no se le cambió el rol` });
            }          
            res.status(200).json({
                idAdmin: updatedUserAdmin._id,
                role: updatedUserAdmin.role
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al cambiar el rol";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //PUT http://localhost:3001/admin/changeRoleAdmin/6430f62084de82b330f348b9



//^CATEGORIES
//Crea una categoría
const postCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const categories = await Categories.create({ category });
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creando categoría");
    }
}; //POST http://localhost:3001/admin/postCategory con { "category": "Papitas" }


//Obtiene todas las categoría
const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error obteniendo categorías");
    }
}; //GET http://localhost:3001/admin/getCategories


//Actualizar una categoría
const putCategory = async (req, res) => {
    const { idCategory } = req.params;
    const { category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedCategories = await Categories.findByIdAndUpdate(
                idCategory,
                { category },
                { categories: true, session }
            );          
            if (!updatedCategories) {
                return res.status(404).send({ message: `La categoría con ID ${idCategory} no fue encontrada` });
            }          
            res.status(200).json({
                idCategory: updatedCategories._id,
                category: updatedCategories.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar la categoría";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // PUT http://localhost:3001/admin/putCategory/64326fcebadb245294dc75e2 con { "category": "Papitas con salsa de tomate" }


//Elimina permanentemente una categoría
const deleteCategory = async (req, res) => {
    const { idCategory } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedCategory = await Categories.findById(idCategory).session(session);
            if (!deletedCategory) {
                const message = `Categoría con id ${idCategory} no fue encontrada`;
                return res.status(404).send({ message });
            }
            await deletedCategory.deleteOne();
            return res.status(204).send({ message: `Categoría ${idCategory} eliminada exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar la categoría";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE http://localhost:3001/admin/deleteCategory/64326fcebadb245294dc75e2


//^DRINKS
//Crea bebidas
const postDrinks = async (req, res) => {
    const { code, name, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let drinks = await Drinks.findOne({ name }).session(session);
            if (drinks) {
                return res.status(409).send({ message: `La drinks ${name} ya existe` });
            }
            const [createdDrinks] = await Drinks.create(
                [ { code, name, image, description, price, promoPrice, category } ],
                { session }
            );
            res.status(200).json({
                id: createdDrinks._id,
                code: createdDrinks.code,
                name: createdDrinks.name,
                image: createdDrinks.image,
                description: createdDrinks.description,
                price: createdDrinks.price,
                promoPrice: createdDrinks.promoPrice,
                category: createdDrinks.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear la bebida";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //POST http://localhost:3001/admin/postDrinks con { "code": "BF-60-120", "name": "Jugo de guanabana", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1680210978/images/ucylwmaclplivybskcd3.png", "description": "20 oz", "price": 20, "category": "643b002e5bb903f42513ba99" }


//Obtener todas las bebidas
const getDrinks = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const drinks = await Drinks.find({}).session(session);
            return res.status(200).json(drinks);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener las bebidas";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/getDrinks


//Obtiene bebidas por id
const getIdDrinks = async (req, res) => {
    const { idDrinks } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const drinks = await Drinks.findById(idDrinks).session(session);
            if (!drinks) {
                return res.status(404).send({ message: "La bebida no se encontró" });
            }
            return res.status(200).json(drinks);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener la bebida";
        return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET http://localhost:3001/admin/getDrinks/6430c43706a31cbfe00096da



//Actualiza una bebida
const putDrinks = async (req, res) => {
    const { idDrinks } = req.params;
    const { code, name, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedDrinks = await Drinks.findByIdAndUpdate(
                idDrinks,
                { code, name, image, description, price, promoPrice, category },
                { drinks: true, session }
            );          
            if (!updatedDrinks) {
                return res.status(404).send({ message: `El producto con ID ${idDrinks} no fue encontrado` });
            }          
            res.status(200).json({
                id: updatedDrinks._id,
                code: updatedDrinks.code,
                name: updatedDrinks.name,
                image: updatedDrinks.image,
                description: updatedDrinks.description,
                price: updatedDrinks.price,
                promoPrice: updatedDrinks.promoPrice,
                category: updatedDrinks.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar la bebida";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
} // PUT http://localhost:3001/admin/putDrinks/64326fcebadb245294dc75e2 con { "name": "Jugo rico", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1677732823/images/se0ku9gfmbkcxqywtjad.jpg", "description": "25 oz", "price": 20, "category": "643b002e5bb903f42513ba99" }


//Elimina permanentemente una bebida
const deleteDrinks = async (req, res) => {
    const { idDrinks } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedDrinks = await Drinks.findById(idDrinks).session(session);
            if (!deletedDrinks) {
                const message = `Bebida con id ${idDrinks} no fue encontrada`;
                return res.status(404).send({ message });
            }
            await deletedDrinks.deleteOne();
            return res.status(200).json({ message: `Categoría ${idDrinks} eliminada exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar la bebida";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE http://localhost:3001/admin/deleteDrinks/643b106bda9e83a50d26e525


//^ACOMPAÑAMIENTOS
//Crea acompañamientos
const postAccompanyings = async (req, res) => {
    const { code, name, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let accompanyings = await Accompanyings.findOne({ name }).session(session);
            if (accompanyings) {
                return res.status(409).send({ message: `El Accompanying ${name} ya existe` });
            }
            const [createdAccompanyings] = await Accompanyings.create(
                [ { code, name, description, price, promoPrice, category } ],
                { session }
            );
            res.status(200).json({
                id: createdAccompanyings._id,
                code: createdAccompanyings.code,
                name: createdAccompanyings.name,
                description: createdAccompanyings.description,
                price: createdAccompanyings.price,
                promoPrice: createdAccompanyings.promoPrice,
                category: createdAccompanyings.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear la bebida";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //POST http://localhost:3001/admin/postAccompanyings con { "name": "Jugo delicioso", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1680210978/images/ucylwmaclplivybskcd3.png", "description": "30 oz", "price": 15, "category": "643b0fcfc27bc892fca4a724" }


//Obtener todos los acompañamientos
const getAccompanyings = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const accompanyings = await Accompanyings.find({}).session(session);
            return res.status(200).json(accompanyings);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los acompañamientos";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/getAccompanyings


//Obtener acompañamientos por ID
const getIdAccompanyings = async (req, res) => {
    const { idAccompanyings } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const accompanyings = await Accompanyings.findById(idAccompanyings).session(session);
            if (!accompanyings) {
                return res.status(404).send({ message: "El acompañamiento no se encontró" });
            }
            return res.status(200).json(accompanyings);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener el producto";
        return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET http://localhost:3001/admin/getAccompanyings/6430c43706a31cbfe00096da


//Actualiza un acompañamiento
const putAccompanyings = async (req, res) => {
    const { idAccompanyings } = req.params;
    const { code, name, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedAccompanyings = await Accompanyings.findByIdAndUpdate(
                idAccompanyings,
                { code, name, description, price, promoPrice, category },
                { accompanyings: true, session }
            );          
            if (!updatedAccompanyings) {
                return res.status(404).send({ message: `El acompañamiento con ID ${idAccompanyings} no fue encontrado` });
            }          
            res.status(200).json({
                id: updatedAccompanyings._id,
                code: updatedAccompanyings.code,
                name: updatedAccompanyings.name,
                description: updatedAccompanyings.description,
                price: updatedAccompanyings.price,
                promoPrice: updatedAccompanyings.promoPrice,
                category: updatedAccompanyings.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar el acompañamiento";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
} // PUT http://localhost:3001/admin/putAccompanyings/643b1602ac600f22e9aff970 con { "name": "Jugo rico", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1677732823/images/se0ku9gfmbkcxqywtjad.jpg", "description": "25 oz", "price": 20, "category": "643b002e5bb903f42513ba99" }


//Elimina permanentemente un acompañamiento
const deleteAccompanyings = async (req, res) => {
    const { idAccompanyings } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedAccompanyings = await Accompanyings.findById(idAccompanyings).session(session);
            if (!deletedAccompanyings) {
                const message = `El acompañamiento con id ${idAccompanyings} no fue encontrado`;
                return res.status(404).send({ message });
            }
            await deletedAccompanyings.deleteOne();
            return res.status(200).json({ message: `Acompañamiento ${idAccompanyings} eliminado exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar la bebida";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE http://localhost:3001/admin/deleteAccompanyings/643b106bda9e83a50d26e525



//^EXTRAS
//Crea extras
const postExtras = async (req, res) => {
    const { code, name, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let extras = await Extras.findOne({ name }).session(session);
            if (extras) {
                return res.status(409).send({ message: `El Extra ${name} ya existe` });
            }
            const [createdExtras] = await Extras.create(
                [ { code, name, image, description, price, promoPrice, category } ],
                { session }
            );
            res.status(200).json({
                id: createdExtras._id,
                code: createdExtras.code,
                name: createdExtras.name,
                image: createdExtras.image,
                description: createdExtras.description,
                price: createdExtras.price,
                promoPrice: createdExtras.promoPrice,
                category: createdExtras.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear el extra";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //POST http://localhost:3001/admin/postExtras con { "code": "EX-70-107", "name": "Salchichón", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1680210978/images/ucylwmaclplivybskcd3.png", "description": "300 gr", "price": 30, "category": "643b0fcfc27bc892fca4a726" }


//Obtiene todos los extras
const getExtras = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const extras = await Extras.find({}).session(session);
            return res.status(200).json(extras);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener los Extras";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/getExtras


//Obtiene un extra por ID
const getIdExtras = async (req, res) => {
    const { idExtras } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const extras = await Extras.findById(idExtras).session(session);
            if (!extras) {
                return res.status(404).send({ message: "El extra no se encontró" });
            }
            return res.status(200).json(extras);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener el extra";
        return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET http://localhost:3001/admin/getExtras/6430c43706a31cbfe00096da


//Actualiza un acompañamiento
const putExtras = async (req, res) => {
    const { idExtras } = req.params;
    const { code, name, image, description, price, promoPrice, category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedExtras = await Extras.findByIdAndUpdate(
                idExtras,
                { code, name, image, description, price, promoPrice, category },
                { extras: true, session }
            );          
            if (!updatedExtras) {
                return res.status(404).send({ message: `El Extra con ID ${idExtras} no fue encontrado` });
            }          
            res.status(200).json({
                id: updatedExtras._id,
                code: updatedExtras.code,
                name: updatedExtras.name,
                image: updatedExtras.image,
                description: updatedExtras.description,
                price: updatedExtras.price,
                promoPrice: updatedExtras.promoPrice,
                category: updatedExtras.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar el Extra";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
} // PUT http://localhost:3001/admin/putExtras/643b1602ac600f22e9aff970 con { "name": "Jugo rico", "image": "https://res.cloudinary.com/dmkklptzi/image/upload/v1677732823/images/se0ku9gfmbkcxqywtjad.jpg", "description": "25 oz", "price": 20, "category": "643b002e5bb903f42513ba99" }


//Elimina permanentemente un extra
const deleteExtras = async (req, res) => {
    const { idExtras } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedExtras = await Extras.findById(idExtras).session(session);
            if (!deletedExtras) {
                const message = `El Extras con id ${idExtras} no fue encontrado`;
                return res.status(404).send({ message });
            }
            await deletedExtras.deleteOne();
            return res.status(200).json({ message: `Extras ${idExtras} eliminado exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar el Extras";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE http://localhost:3001/admin/deleteExtras/643b106bda9e83a50d26e525


//^Salsas
//Crea una salsa
const postSauces = async (req, res) => {
    const { code, name, category } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            let sauces = await Sauces.findOne({ name }).session(session);
            if (sauces) {
                return res.status(409).json({ message: `El Sauces ${name} ya existe` });
            }
            const [createdSauces] = await Sauces.create(
                [ { code, name, category } ],
                { session }
            );
            res.status(200).json({
                id: createdSauces._id,
                code: createdSauces.code,
                name: createdSauces.name,
                category: createdSauces.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al crear la Sauces";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //POST http://localhost:3001/admin/postSauces con { "name": "Salsa de birra", "category": "643b0fcfc27bc892fca4a727" }


//Obtiene todas las salsas
const getSauces = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const sauces = await Sauces.find({}).session(session);
            return res.status(200).json(sauces);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener las salsas";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; //GET http://localhost:3001/admin/getSauces


//Obtiene una salsa por ID
const getIdSauces = async (req, res) => {
    const { idSauces } = req.params;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const sauces = await Sauces.findById(idSauces).session(session);
            if (!sauces) {
                return res.status(404).send({ message: "La salsa no se encontró" });
            }
            return res.status(200).json(sauces);
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al obtener la salsa";
        return res.status(status).send({ message });
    } finally {
      await session.endSession();
    }
}; //GET http://localhost:3001/admin/getSauces/6430c43706a31cbfe00096da



//Actualiza una Sauce
const putSauces = async (req, res) => {
    const { idSauces } = req.params;
    const { code, name, category } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const updatedSauces = await Sauces.findByIdAndUpdate(
                idSauces,
                { code, name, category },
                { extras: true, session }
            );          
            if (!updatedSauces) {
                return res.status(404).send({ message: `La Sauce con ID ${idSauces} no fue encontrado` });
            }          
            res.status(200).json({
                id: updatedSauces._id,
                code: updatedSauces.code,
                name: updatedSauces.name,
                category: updatedSauces.category
            });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al actualizar la Sauce";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
} // PUT http://localhost:3001/admin/putSauces/643b1602ac600f22e9aff970 con { "name": "Salsa de Chocó", "category": "643b0fcfc27bc892fca4a727" }


//Elimina permanentemente una salsa
const deleteSauces = async (req, res) => {
    const { idSauces } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedSauces = await Sauces.findById(idSauces).session(session);
            if (!deletedSauces) {
                const message = `El Sauces con id ${idSauces} no fue encontrado`;
                return res.status(404).send({ message });
            }
            await deletedSauces.deleteOne();
            return res.status(200).json({ message: `Sauces ${idSauces} eliminada exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al borrar el Sauces";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE http://localhost:3001/admin/deleteSauces/643b106bda9e83a50d26e525


//^ORDENES
// Obtener todas las órdenes de todos los usuarios
const getOrders = async (req, res) => {                 //!NO IMPLEMENTADA
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({}).populate("user address").session(session);
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
}; //GET - http://localhost:3001/admin/getOrders


// Obtener todas las órdenes de todos los usuarios en status PENDIENTE
const getOrdersPendings = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({ status: 'Pendiente' }).populate('user address').session(session);
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
}; //GET - http://localhost:3001/admin/getOrdersPendings


// Obtener todas las órdenes de todos los usuarios en status EN PREPARACION
const getOrdersInPreparation = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({ status: 'En preparación' }).populate('user address').session(session);
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
}; //GET - http://localhost:3001/admin/getOrdersInPreparation


// Obtener todas las órdenes de todos los usuarios en status EN CAMINO
const getOrdersOnTheWay = async (req, res) => {
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({ status: 'En camino' }).populate('user address').session(session);
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
}; //GET - http://localhost:3001/admin/getOrdersOnTheWay




// Obtener todas las órdenes archivadas en el PANEL DEL ADMIN
const getOrdersHistoryDelivered = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({ status: "Entregado", isArchive: false }).populate('user address').session(session);
            if (!orders) return res.status(404).send({ message: "Orden no encontrada" });
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
}; //GET - http://localhost:3001/admin/getOrdersHistoryDelivered


// Obtener todas las órdenes archivadas en el PANEL DEL ADMIN
const getOrdersHistory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.find({ 
                // isArchive: true, 
                status: { $nin: ["Pendiente", "En preparación", "En camino"] } 
            }).populate('user address').session(session);
            if (!orders) return res.status(404).send({ message: "Orden no encontrada" });
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
}; //GET - http://localhost:3001/admin/getOrdersHistory


//Marca una orden como archivada
const trueLogicalOrdersHistory = async (req, res) => {
    const { idOrder } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.findById(idOrder);
            if (!orders) return res.status(404).send({ message: "Orden no encontrada" });
            orders.isArchive = true;
            await orders.save();
            res.status(200).send({ message: "Orden Enviada a archivo" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al enviar a archivo la orden";
        return res.status(status).send({ message });
    }
}; // PUT - http://localhost:3001/admin/trueLogicalOrdersHistory/:idOrder

//Desmarca una orden del archivo
const falseLogicalOrdersHistory = async (req, res) => {
    const { idOrder } = req.params;
    const session = await mongoose.startSession();    
    try {
        await session.withTransaction(async (session) => {
            const orders = await Orders.findById(idOrder);
            if (!orders) return res.status(404).send({ message: "Orden no encontrada" });
            orders.isArchive = false;
            await orders.save();
            res.status(200).send({ message: "Orden Enviada a archivo" });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al enviar a archivo la orden";
        return res.status(status).send({ message });
    }
}; // PUT - http://localhost:3001/admin/falseLogicalOrdersHistory/:idOrder


// Elimina permanentemente una orden de un usuario
const deleteOrder = async (req, res) => {
    const { idOrder } = req.params;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const deletedOrder = await Orders.findById(idOrder).session(session);
            if (!deletedOrder) {
                const message = `La orden con id ${idOrder} no fue encontrada`;
                return res.status(404).send({ message });
            }
            await deletedOrder.deleteOne();
            return res.status(200).json({ message: `Orden con ${idOrder} eliminada exitosamente` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al eliminar la orden";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // DELETE - http://localhost:3001/admin/deleteOrder/:idOrder


// Elimina una orden de un usuario
const cancelOrder = async (req, res) => {
    const { idOrder } = req.params;
    const { cancelMessage, status } = req.body;
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            const order = await Orders.findByIdAndUpdate(
                idOrder,
                { cancelMessage, status },
                { new: true }
              ).populate('user').session(session);
            if (!order) {
                const messageOrder = `La orden con id ${idOrder} no fue encontrada`;
                return res.status(404).send({ messageOrder });
            }
            const mailOptions = mailCancelOrder(order.user.email, order.cancelMessage);
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else console.log(`Correo electrónico enviado: ${info.response}`);
            });
            res.status(201).send('Orden cancelada exitosamente');
            });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Ocurrió un error al eliminar la orden";
        return res.status(status).send({ message });
    } finally {
        await session.endSession();
    }
}; // PUT - http://localhost:3001/admin/cancelOrder/:idOrder con { "status": "Cancelada", "cancelMessage": "No tenemos los ingredientes secretos para preparar tu orden" }


// Cambia el status de una orden y envío de correo
const changeStatusOrder = async (req, res) => {
    const { idOrder } = req.params;
    const { status } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const order = await Orders.findById(idOrder).populate('user');
            if (!order) {
                return res.status(404).send({ message: "Orden no encontrada" });
            }  
            const previousStatus = order.status;
            order.status = status;
            let mailOptions;
            switch(status) {
                case 'En preparación':
                    mailOptions = mailChangeStatusPreparation(order.user.email);
                    break;
                case 'En camino':
                    mailOptions = mailChangeStatusOnTheWay(order.user.email);
                    break;
                case 'Entregado':
                    mailOptions = mailChangeStatusDeliveried(order.user.email);
                    break;
                default:
                    break;
            }
            await order.save();
            if (mailOptions) {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`Correo electrónico enviado: ${info.response}`);
                    }
                });  
            }
            res.status(200).send({ message: `Orden cambiada de status exitosamente a '${order.status}'` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || `Ocurrió un error al cambiar el status de la orden a '${order.status}'`;
        return res.status(status).send({ message });
    }
}; //PUT - http://localhost:3001/admin/changeStatusOrder/:idOrder con { "status": "En preparación" }


// Cambia al status previo en caso de equivocación al cambiarlo por parte del admin
const changeStatusOrderPrevious = async (req, res) => {
    const { idOrder } = req.params;
    const { status } = req.body;
    const session = await mongoose.startSession();  
    try {
        await session.withTransaction(async (session) => {
            const order = await Orders.findById(idOrder).populate('user');
            if (!order) {
                return res.status(404).send({ message: "Orden no encontrada" });
            }  
            const previousStatus = order.status;
            order.status = status;
            await order.save();
            res.status(200).send({ message: `Orden cambiada de status exitosamente a '${order.status}'` });
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || `Ocurrió un error al cambiar el status de la orden a '${order.status}'`;
        return res.status(status).send({ message });
    }
}; //PUT - http://localhost:3001/admin/changeStatusOrderPrevious/:idOrder con { "status": "En preparación" }


module.exports = {
    postProduct,
    getProducts,
    getProductsLogical,
    getIdProduct,
    putProduct,
    deleteProduct,
    getNameProducts,
    trueLogicalDeletionProduct,
    falseLogicalDeletionProduct,
    
    postUserAdmin,
    getUserAdmin,
    getIdUserAdmin,
    putUserAdmin,
    deleteUserAdmin,
    trueLogicalDeletionAdmin,
    falseLogicalDeletionAdmin,
    blockedAdmin,
    unlockedAdmin,
    changeRoleAdmin,
    
    postCategory,
    getCategories,
    putCategory,
    deleteCategory,
    
    postDrinks,
    getDrinks,
    getIdDrinks,
    putDrinks,
    deleteDrinks,
    
    postAccompanyings,
    getAccompanyings,
    getIdAccompanyings,
    putAccompanyings,
    deleteAccompanyings,
    
    postExtras,
    getExtras,
    getIdExtras,
    putExtras,
    deleteExtras,
    
    postSauces,
    getSauces,
    getIdSauces,
    putSauces,
    deleteSauces,


    getOrders,
    getOrdersPendings,
    getOrdersInPreparation,
    getOrdersOnTheWay,
    getOrdersHistory,
    getOrdersHistoryDelivered,


    trueLogicalOrdersHistory,
    falseLogicalOrdersHistory,

    deleteOrder,
    cancelOrder,
    changeStatusOrder,
    changeStatusOrderPrevious,
};