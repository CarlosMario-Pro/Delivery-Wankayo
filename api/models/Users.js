const { Schema, model } = require("mongoose");


//!PONER LA FECHA DE NACIMIENTO
const usersSchema = new Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true
    },
    docIdentity: {
        type: String,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true,
        trim: true
    },
    password: {
        type: String,
        // required: true,
        trim: true
    },
    phone: {
        type: String,
        // required: true
    },
    signupDate: {
        type: Date,
        default: Date.now(),
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["superAdmin", "admin", "user"],
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    provider: { // GOOGLE
        type: String,
        // required: true,
    },
    subject: {  // ID -> GOOGLE
        type: String,
        // required: true,
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
    address: [{ type: Schema.Types.ObjectId, ref: "Address" }]
},
{ timestamps: true, versionKey: false });


module.exports = model("Users", usersSchema);


// orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],       //Al contener todo en [{}], indico que la relación de uno a muchos, un usuario solo puede tener muchas órdenes
// address: [{ type: Schema.Types.ObjectId, ref: "Address" }]      //Al contener todo en [{}], indico que la relación de uno a muchos, un usuario solo puede tener muchas direcciones



//^Billeteras digitales en Colombia
/*
- Nequi
- Bancolombia a la mano
- Daviplata
- Dale
- Movii
- Nu Bank
- BBVA wallet

- TuyaPay
- Tpaga
- Tuyapay
- Powii
- Payválida
- Sured
- Ding


*/