import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './WorkWithUs.module.css';


function validate (input) {
    let errors = {};
    if(!input.name){
        errors.name = "Tu nombre es requerido.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.name)){
        errors.name = "Tu nombre no puede tener números o caracteres especiales.";
    }
    if(!input.email) {
        errors.email = "Tu email es requerido.";
    } else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
        errors.email = "Tu email no es válido.";
    }
    if(!input.phone) {
        errors.phone = "Tu teléfono es requerido.";
    } else if (!/^\d{10,15}$/.test(input.phone)) {
        errors.phone = "Tu teléfono no es válido.";
    }
    if(!input.country){
        errors.country = "El país es requerido.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.country)){
        errors.country = "Tu país es inválido.";
    }
    if(!input.drive){
        errors.drive = "El enlace a Google Drive o OneDrive es obligatorio.";
    }
    if(!input.message){
        errors.message = "Tu Mensaje es requerido.";
    }
    return errors;
};


export default function WorkWithUs() {
    // const [selectedFile, setSelectedFile] = useState(null);
    const [ errors, setErrors ] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);      //Aviso de color informando que el formulario fue enviado

    const [ input, setInput ] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        drive: '',
        message: ''
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };


    function handleSubmit(e) {
        e.preventDefault();
        emailjs.sendForm('service_zfg4l7e', 'template_kypswm8', e.target, 'zXTg4GsN07LSJ9aKf').then(() => {
            setInput({
                name: '',
                email: '',
                phone: '',
                country: '',
                drive: '',
                message: ''
            });
            setFormSubmitted(true);
            setTimeout(() => {
                setFormSubmitted(false);
            }, 10000);
        })
        .catch((error) => console.log(error));
    };
    

    return (
        <div className={`${styles.products} flex `}>   
            <div className={`${styles.contactUs} margin`}>
                <div className={`${styles.containerUnoContactUs} `}>
                </div>
                <div className={`${styles.containerDosContactUs} `}>
                    <h1>Trabaja con nosotros</h1>
                    <div className={`${styles.contactFormContactUs} `}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <input type="text" name='name' value={ input.name } placeholder='Nombre y Apellido' onChange={(e) => handleChange(e)} />
                            {errors.name && <p className={`${styles.danger} `}>{ errors.name }</p>}
                            <input type="email" name='email' value={ input.email } placeholder='Email' onChange={(e) => handleChange(e)} />
                            {errors.email && <p className={`${styles.danger} `}>{ errors.email }</p>}
                            <input type="text" name='phone' value={ input.phone } placeholder='Teléfono' onChange={(e) => handleChange(e)} />
                            {errors.phone && <p className={`${styles.danger} `}>{ errors.phone }</p>}
                            <input type="text" name='country' value={ input.country } placeholder='País' onChange={(e) => handleChange(e)} />
                            {errors.country && <p className={`${styles.danger} `}>{ errors.country }</p>}
                            
                            <input type="text" name='drive' value={ input.drive } placeholder='Enlace a Google Drive o OneDrive' onChange={(e) => handleChange(e)} />
                            {errors.country && <p className={`${styles.danger} `}>{ errors.drive }</p>}
                            <textarea name="message" value={ input.message } placeholder='Comentarios' onChange={(e) => handleChange(e)} ></textarea>
                            {errors.message && <p className={`${styles.danger} `}>{ errors.message }</p>}
                            {/* <input type="file" name="file" onChange={(e) => setSelectedFile(e.target.files[0])} /> */}
                            {
                                !errors.name && input.name.length > 0 &&
                                !errors.email && input.email.length > 0 &&
                                !errors.phone && input.phone.length > 0 &&
                                !errors.message && input.message.length > 0 ?
                                <button className={`${styles.siteBtn} `} type="submit">ENVIAR</button> : <button className={`${styles.disabled} `} type="submit" disabled>ENVIAR</button>
                            }
                        </form>
                        <div className={`${styles.messageFormSubmitted} `}>
                            {formSubmitted && <p>Formulario enviado</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};