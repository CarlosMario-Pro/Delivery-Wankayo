import React from 'react';
import styles from './Boxes.module.css';
import Potato from '../../../assets/Potato.png';


export default function Boxes() {
    return (
        <div className={`${styles.boxes} centerColumn`}>
            <div className={`${styles.container} center`}>
                <img className={`${styles.image} `} src={Potato} alt="Potato" />
            </div>
            <h3 className={`${styles.title} `}>Boxes</h3>
        </div>
    );
};