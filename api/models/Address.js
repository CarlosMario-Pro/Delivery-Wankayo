const { Schema, model } = require("mongoose");


const addressSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
},
{ versionKey: false });


module.exports = model("Address", addressSchema);


// user: { type: Schema.Types.ObjectId, ref: "Users" },        //Al contener todo en {}, indico que la relación de uno a uno, una address solo puede pertenecer a un usuario
// orders: { type: Schema.Types.ObjectId, ref: "Orders" },     //Al contener todo en {}, indico que la relación de uno a uno, una address solo puede pertenecer a una orden