import React from 'react';
import logo from '../../assets/WhatsApp.png';
import styles from "./WhatsApp.module.css";


export default function WhatsApp () {

    return (
        <div className={`${styles.whatsappLandgin} center`}>
            <a href="https://web.whatsapp.com/send?phone=51902140618&text" target="_blank" rel="noreferrer noopener">
                <img className={`${styles.whatsapp}`} src={ logo } alt="Logo WhatsApp" />
            </a>
        </div>
    );
};