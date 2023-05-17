const app = require("./app.js");
const { connection } = require("./db.js");
const { loadedCategories, loadedAccompanyings, loadedDrinksDB, loadedExtrasDB, loadedProducts, loadedSaucesDB } = require("./addDB");
require("dotenv").config();
const PORT = process.env.PORT;


connection
    .syncIndexes({ force: true })
    .then(async () => {
        await loadedCategories();
        await loadedAccompanyings();
        await loadedDrinksDB();
        await loadedExtrasDB();
        await loadedProducts();
        await loadedSaucesDB();
    })
    .then(() => {
        app.listen(PORT, () => {
        console.log(`Servidor ejecutado en puerto: ${PORT}`);
        });
    })
    .catch((error) => console.log("Servidor no inicializado: ", error));