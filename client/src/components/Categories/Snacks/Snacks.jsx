import React from 'react';
import styles from './Snacks.module.css';
import Snack from '../../../assets/Snack.png';


export default function Snacks() {
    return (
        <div className={`${styles.snacks} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={Snack} alt="Snack" />
            </div>
            <h3 className={`${styles.title} `}s>Snacks</h3>
        </div>
    );
};