const { Schema, model } = require("mongoose");


const productsSchema = new Schema(
    {
        code: {
            type: String,
            // required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        pseudoName: {
            type: String,
            // required: true,
            trim: true
        },
        image: { 
            type: String,
            // required: true
        },
        description: {
            type: String,
            // required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        },
        promoPrice: {
            type: Number,
            default: ''
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        category: { type: Schema.Types.ObjectId, ref: "Categories" }
    },
    { timestamps: true, versionKey: false }
);


module.exports = model("Products", productsSchema);