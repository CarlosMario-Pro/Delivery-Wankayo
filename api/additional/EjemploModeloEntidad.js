const { Schema, model } = require("mongoose");

//Modelo company
const productsSchema = new Schema(
    {
        NIT: {
            type: String,
            trim: true
        },
        NombreEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        repLegal: { 
            type: String,
        },
        DocIdentityRepLegal: { 
            type: String,
        },
        TeléfonoRepLegal: {
            type: String,
            required: true,
            trim: true
        },
        Administrador: {
            type: String,
            trim: true
        },
        TeléfonoAdministrador: {
            type: String,
            required: true,
            trim: true
        },
        DirecciónEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        TeléfonoEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        EmailEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        HoraAperturaEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        HoraCierreEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        EsloganEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            // required: true,
            trim: true
        },
        DescripciónEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        ProductosEmpresa: {
            type: String,
            orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
        },
        DescripcionProductosEmpresa: {
            type: String,
            orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
        },
        InformaciónDeProduccion: {//300arrobas, 300 canastillas, 300 pacas, etc
            type: String,
            orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
        },
        LogoURLEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        signupDate: {
            type: Date,
            default: Date.now(),
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        BannerURLEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        categoríaEmpresa: {
            type: String,
            enum: ["Restaurantes", "Hoteles", "Tiendas", "Supermercado", "Minimercado"],
            default: "Almacén"
        },
        HorarioEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        CalificacionDeEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        ComentariosOReseñasEmpresa: {
            type: String,
            required: true,
            trim: true
        },
        facebook: {
            type: String,
            required: true,
            trim: true
        },
        twitter: {
            type: String,
            required: true,
            trim: true
        },
        pinterest: {
            type: String,
            required: true,
            trim: true
        },
        tiktok: {
            type: String,
            required: true,
            trim: true
        },
        youtube: {
            type: String,
            required: true,
            trim: true
        },
        GoogleMaps: { 
            type: String,
            // required: true
        },
        ColorPrimario: { 
            type: String,
            // required: true
        },
        ColorSecundario: { 
            type: String,
            // required: true
        },
        ColorAux1: { 
            type: String,
            // required: true
        },
        ColorAux2: { 
            type: String,
            // required: true
        },
        ColorAux3: { 
            type: String,
            // required: true
        },
        EstiloLanding: { 
            type: String,
            enum: ["Modelo1", "Modelo2", "Modelo3"],
            default: "Standart"
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