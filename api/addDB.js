const Accompanyings = require("./models/Accompanyings");
const Address = require("./models/Address");
const Categories = require("./models/Categories");
const Drinks = require("./models/Drinks");
const Extras = require("./models/Extras");
const Orders = require("./models/Orders");
const Products = require("./models/Products");
const Sauces = require("./models/Sauces");
const Users = require("./models/Users");

const AccompanyingsDB = require("./additional/AccompanyingsDB");
const DrinksDB = require("./additional/DrinksDB");
const ExtrasDB = require("./additional/ExtrasDB");
const ProductsDB = require("./additional/ProductsDB");
const SaucesDB = require("./additional/SaucesDB");
const CategoriesProducts = require("./additional/CategoriesProducts");


async function loadedCategories() {
    try {
        const count = await Categories.countDocuments();
        if (count > 0) {
            console.log("Categorias cargadas anteriormente");
            return;
        }
        await Categories.insertMany(CategoriesProducts);
        console.log("'Categories' disponibles en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedAccompanyings() {
    try {
        const count = await Accompanyings.countDocuments();
        if (count > 0) {
            console.log("'Accompanyings' cargados anteriormente");
            return;
        }
        const promesas = AccompanyingsDB.map((e) => {
            return Categories.findOne({ category: e.category }).exec();
        });
        const ids = await Promise.all(promesas);
        const idSolos = ids.map((e) => [e._id].join(""));
        for (let i = 0; i < AccompanyingsDB.length; i++) {
            if (AccompanyingsDB[i].category === ids[i].category) {
                AccompanyingsDB[i].category = idSolos[i];
            }
        }
        await Accompanyings.insertMany(AccompanyingsDB);
        const relacionadas = await Accompanyings.find({}).populate("category").exec();
        console.log("Base de datos AccompanyingsDB en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedDrinksDB() {
    try {
        const count = await Drinks.countDocuments();
        if (count > 0) {
            console.log("'Drinks' cargadas anteriormente");
            return;
        }
        const promesas = DrinksDB.map((e) => {
            return Categories.findOne({ category: e.category }).exec();
        });
        const ids = await Promise.all(promesas);
        const idSolos = ids.map((e) => [e._id].join(""));
        for (let i = 0; i < DrinksDB.length; i++) {
            if (DrinksDB[i].category === ids[i].category) {
                DrinksDB[i].category = idSolos[i];
            }
        }
        await Drinks.insertMany(DrinksDB);
        const relacionadas = await Drinks.find({}).populate("category").exec();
        console.log("Base de datos 'DrinksDB' en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedExtrasDB() {
    try {
        const count = await Extras.countDocuments();
        if (count > 0) {
            console.log("'Extras' cargadas anteriormente");
            return;
        }
        const promesas = ExtrasDB.map((e) => {
            return Categories.findOne({ category: e.category }).exec();
        });
        const ids = await Promise.all(promesas);
        const idSolos = ids.map((e) => [e._id].join(""));
        for (let i = 0; i < ExtrasDB.length; i++) {
            if (ExtrasDB[i].category === ids[i].category) {
                ExtrasDB[i].category = idSolos[i];
            }
        }
        await Extras.insertMany(ExtrasDB);
        const relacionadas = await Extras.find({}).populate("category").exec();
        console.log("Base de datos 'ExtrasDB' en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedSaucesDB() {
    try {
        const count = await Sauces.countDocuments();
        if (count > 0) {
            console.log("'Sauces' cargadas anteriormente");
            return;
        }
        const promesas = SaucesDB.map((e) => {
            return Categories.findOne({ category: e.category }).exec();
        });
        const ids = await Promise.all(promesas);
        const idSolos = ids.map((e) => [e._id].join(""));
        for (let i = 0; i < SaucesDB.length; i++) {
            if (SaucesDB[i].category === ids[i].category) {
                SaucesDB[i].category = idSolos[i];
            }
        }
        await Sauces.insertMany(SaucesDB);
        const relacionadas = await Sauces.find({}).populate("category").exec();
        console.log("Base de datos 'SaucesDB' en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


async function loadedProducts() {
    try {
        const count = await Products.countDocuments();
        if (count > 0) {
            console.log("'Products' cargados anteriormente");
            return;
        }
        const promesas = ProductsDB.map((e) => {
            return Categories.findOne({ category: e.category }).exec();
        });
        const ids = await Promise.all(promesas);
        const idSolos = ids.map((e) => [e._id].join(""));
        for (let i = 0; i < ProductsDB.length; i++) {
            if (ProductsDB[i].category === ids[i].category) {
                ProductsDB[i].category = idSolos[i];
            }
        }
        await Products.insertMany(ProductsDB);
        const relacionadas = await Products.find({}).populate("category").exec();
        console.log("Base de datos 'ProductsDB' en Mongo Atlas");
    } catch (err) {
        console.log(err);
        return;
    }
};


//reinician la base de datos
// Accompanyings.deleteMany({})
//   .then(() => console.log("Todos los 'Accompanyings' removidos"))
//   .catch((err) => console.log(err));


// Address.deleteMany({})
//     .then(() => console.log("Todas las 'Address' removidas"))
//     .catch((err) => console.log(err));


// Categories.deleteMany({})
//     .then(() => console.log("Todas las 'Categories' removidas"))
//     .catch((err) => console.log(err));


// Drinks.deleteMany({})
//   .then(() => console.log("Todos las 'Drinks' removidas"))
//   .catch((err) => console.log(err));


// Extras.deleteMany({})
//   .then(() => console.log("Todos los 'Extras' removidos"))
//   .catch((err) => console.log(err));


// Orders.deleteMany({})
//     .then(() => console.log("Todas las 'Orders' removidas"))
//     .catch((err) => console.log(err));


// Products.deleteMany({})
//   .then(() => console.log("Todos los 'Products' removidos"))
//   .catch((err) => console.log(err));


// Sauces.deleteMany({})
//   .then(() => console.log("Todos las 'Sauces' removidas"))
//   .catch((err) => console.log(err));


// Users.deleteMany({})
//   .then(() => console.log("Todos los 'Users' removidos"))
//   .catch((err) => console.log(err));


module.exports = { loadedCategories, loadedAccompanyings, loadedDrinksDB, loadedExtrasDB, loadedProducts, loadedSaucesDB };