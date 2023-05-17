import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ChangePassword.module.css';

export default function ChangePassword () {
    const [email, setEmail] = useState({
        email: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPassword({
            ...email,
            [name]: value
        });
    };

    return (
        <div className={`${styles.login} center`}>
            <h2>Restablecer contraseña</h2>            
            <div className={`${styles.containerProducts} `}>
                    <form className={`${styles.form} `} >
                        <div className={`${styles.email} `}>
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" placeholder="Ingresa tu email" value={email.email} onChange={handleInputChange} />
                        </div> 
                        <button className={`${styles.button} `} type="submit">Crear Dirección</button>
                    </form>
                </div>
        </div>
    );
};