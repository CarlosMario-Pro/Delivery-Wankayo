import React from 'react';
import styles from './Hamburguesas.module.css';
import Burguer from '../../../assets/Burguer.png';


export default function Hamburguesas() {
    return (
        <div className={`${styles.hamburguesas} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={Burguer} alt="Burguer" />
            </div>
            <h3 className={`${styles.title} `}>Hamburguesas</h3>
        </div>
    );
};