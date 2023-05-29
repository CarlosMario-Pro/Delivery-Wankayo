const { Schema, model } = require("mongoose");


const orderSchema = new Schema({
    products: [{
        nameProduct: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "La cantidad mínima es 1"],
            max: [50, "La cantidad máxima es 50"]
        },
        unitPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        IdProduct: { type: Schema.Types.ObjectId, ref: "Product", required: true }
    }],
    status: {
        type: String,
        enum: ["Pendiente", "En preparación", "En camino", "Entregado", "Cancelada"],
        default: "Pendiente"
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        required: false,
        default: "Sin observaciones del cliente"
    },
    cancelMessage: {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: true
    },
    shippingDate: {
        type: Date,
        default: Date.now,
    },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    address: [{ type: Schema.Types.ObjectId, ref: "Address", required: true }]
}, { timestamps: true, versionKey: false });


module.exports = model("Orders", orderSchema);