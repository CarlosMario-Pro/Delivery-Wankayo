const nodemailer = require('nodemailer');
require('dotenv').config();
const { NODEMAILER, EMAIL } = process.env;


module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: NODEMAILER,
        },
    }),

    mailWelcome: ( email ) => {
        return {
            from: EMAIL,
            to: email,
            subject: `¡Bienvenido a Wancayo Sabor Peruano!`,
            html: `
                <img style="width:70%; margin:0 auto; display:block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1683677986/images/uxxnozotkpj3geaxs6yy.png" />
                <p>Te damos la bienvenida a nuestra familia Wancayo</p>
                <br/>
                <p><b>Nos encontramos muy felices de que desees hacer parte de nuestra familia.</b></p>
                <p>Contamos con una amplia gama de productos cosechados de nuestra pachamama para ti, queremos ser sinónimo de calidad y excelentes precios.</p>
            `
        }
    },

    mailChangeStatusPreparation: ( email ) => {
        return {
            from: EMAIL,
            to: email,
            subject: `¡Wankayo te informa que ya estamos preparando tu orden!`,
            html: `
                <img style="width:70%; margin:0 auto; display:block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1683677986/images/uxxnozotkpj3geaxs6yy.png" />
                <p>Queremos informarte que tu orden ya está en preparación, haremos nuestro mejor esfuerzo para preparar las delicias que has pedido, pronto nos pondremos en contacto contigo para notificarte el envío.</p>
                <br/>
                <p><b>¡Gracias por confiar en nosotros!.</b></p>
            `
        }
    },

    mailChangeStatusOnTheWay: ( email ) => {
        return {
            from: EMAIL,
            to: email,
            subject: `¡Wankayo te informa que tu orden ya está en camino!`,
            html: `
                <img style="width:70%; margin:0 auto; display:block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1683677986/images/uxxnozotkpj3geaxs6yy.png" />
                <p>Te confirmamos que tu orden ya está en reparto, pronto llegará a tu mesa desde la Pachamama.</p>
                <br/>
                <p><b>Por favor no comas ansias, danos un poco de tiempo para que puedas deleitarte con nuestros platos.</b></p>
                <br/>
            `
        }
    },


    mailChangeStatusDeliveried: ( email ) => {
        return {
            from: EMAIL,
            to: email,
            subject: `¡Hemos cumplido, Wankayo ha entregado tu orden!`,
            html: `
                <img style="width:70%; margin:0 auto; display:block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1683677986/images/uxxnozotkpj3geaxs6yy.png" />
                <p>Muchas gracias por preferirnos, nos sentimos muy afortunados por haberte servido, esperamos que te guste muchísimo lo que traemos desde nuestro hermoso Perú hasta tu mesa.</p>
                <br/>
                <p><b>Como siempre, te deseamo lo mejor.</b></p>
                <p>Recuerda que estamos dispuestos a servirte, te esperamos pronto.</p>
            `
        }
    },


    mailOrderCreate: ( email, products, total, addressUserCity, addressUser, comment ) => {
        const productList = products.map(product => {
            return (`
                <li>${product.nameProduct}, ${product.quantity} ${product.price !== 0 ? `unidades por: S/ ${product.price}` : 'unidades sin costo '}</li>
            `)
        }).join('');      
        return {
            from: EMAIL,
            to: email,
            subject: `¡Felicidades, has realizado tu orden con éxito!`,
            html: `
                <img style="width:70%; margin:0 auto; display:block;" src="https://res.cloudinary.com/dmkklptzi/image/upload/v1683677986/images/uxxnozotkpj3geaxs6yy.png" />
                <p>Tus productos:</p>
                <ul>${productList}</ul>
                <p>Precio total de tu orden: S/ ${total}</p>
                <p>Dirección de entrega: ${addressUserCity}, ${addressUser}</p>
                <p>Tus observaciones: ${comment}</p>
                <p>Wankayo se pondrá pilas para atender pronto a tu pedido</p>
            `
        }
    },


    mailCancelOrder: (email, cancelMessage) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Lo sentimos mucho, Wankayo ha cancelado tu orden',
            html: `
                <p>Este es una de las cosas que no nos gusta hacer, hemos tenido que cancelar tu orden por.</p>
                <br/>
                <p>${cancelMessage}</p>
                <br/>
                <p>Disculpanos por el inconveniente, sin embargo, estaremos seguiremos atentos.</p>
            `            
        }
    },


    mailNewPassword: (email, link) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Has solicitado el cambio de tu contraseña a cuenta Wankayo',
            html: `
                <p>Este es tu correo de solicitud para cambio de contraseña.</p>
                <br/>
                <p><b>Da click en el siguiente enlace.</b></p>
                <br/>
                <a href=${link} ><b>LINK</b></a>
            `
        }
    },


    mailConfirmNewPassword: (email) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Wankayo confirma el cambio de tu contraseña',
            html: `
                <p>Has cambiado exitosamente la contraseña, si no fuiste tu, comunícate de inmediato con nosotros.</p>
                <br/>
                <p><b>Da click en el siguiente enlace.</b></p>
                <br/>
            `
        }
    },


    mailConfirmActivateAccountNewPassword: (email) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Wankayo confirma la activación de tu cuenta y el cambio de contraseña',
            html: `
                <p>Has activado tu cuenta exitosamente y cambiaste la contraseña, si no fuiste tu, comunícate de inmediato con nosotros.</p>
                <br/>
                <p><b>Da click en el siguiente enlace.</b></p>
                <br/>
            `
        }
    },


    emailAccountBlocked: (email, link) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Tu cuenta ha sido bloqueada',
            html: `
                <p>Wankayo te informa que has bloqueado tu cuenta por exceso de ingresasos fallidos.</p>
                <br/>
                <p><b>Para desbloquear tu cuenta, te pedimos que hagas clic en el siguiente enlace.</b></p>
                <br/>
                <a href=${link} ><b>LINK</b></a>
            `
        }
    },


    mailMasive: (email) => {
        return {
            from: EMAIL,
            to: email,
            subject: 'Mail Masivo a toda la base de datos',
            html: `
                <p>Este es tu correo de prueba masivo, donde envío correos electrónicos de forma individual a todos mis contactos</p>
                <br/>
            `
        }
    },
};