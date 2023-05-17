const { Schema, model } = require("mongoose");


const saucesSchema = new Schema(
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
        category: { type: Schema.Types.ObjectId, ref: "Categories" },
        products: [{ type: Schema.Types.ObjectId, ref: "Products", required: true }],
    },
    { timestamps: true, versionKey: false }
);


module.exports = model("Sauces", saucesSchema);