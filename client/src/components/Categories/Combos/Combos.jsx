import React from 'react';
import styles from './Combos.module.css';
import Combo from '../../../assets/Combo.png';


export default function Combos() {
    return (
        <div className={`${styles.combos} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={Combo} alt="Combo" />
            </div>
            <h3 className={`${styles.title} `}>Combos</h3>
        </div>
    );
};