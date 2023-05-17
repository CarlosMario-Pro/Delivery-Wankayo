const { Schema, model } = require("mongoose");


const extrasSchema = new Schema(
    {
        code: {
            type: String,
            // required: true,
            trim: true
        },
        name: {
            type: String,
            // required: true,
            trim: true
        },
        description: {
            type: String,
            // required: true,
            trim: true
        },
        price: {
            type: Number,
            // required: true,
            trim: true
        },
        promoPrice: {
            type: Number
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        category: { type: Schema.Types.ObjectId, ref: "Categories" },
        products: [{ type: Schema.Types.ObjectId, ref: "Products", required: true }],
    },
    { timestamps: true, versionKey: false }
);


module.exports = model("Extras", extrasSchema);