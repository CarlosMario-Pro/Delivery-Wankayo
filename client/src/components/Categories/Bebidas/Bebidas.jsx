import React from 'react';
import styles from './Bebidas.module.css';
import IncaKola from '../../../assets/IncaKola.png';


export default function Bebidas() {
    return (
        <div className={`${styles.bebidas} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={IncaKola} alt="Inca Kola" />
            </div>
            <h3 className={`${styles.title} `}>Bebidas</h3>
        </div>
    );
};