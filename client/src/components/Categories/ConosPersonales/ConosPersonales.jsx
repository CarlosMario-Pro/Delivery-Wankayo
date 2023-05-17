import React from 'react';
import styles from './ConosPersonales.module.css';
import Chicken from '../../../assets/Chicken.png';


export default function ConosPersonales() {
    return (
        <div className={`${styles.conosPersonales} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={Chicken} alt="Chicken" />
            </div>
            <h3 className={`${styles.title} `}>Conos</h3>
        </div>
    );
};