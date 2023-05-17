import React from 'react';
import styles from './Hero.module.css';


export default function Hero () {
    return (
        <div className={`${styles.hero} centerColumn `}>
            <h1>Wankayo</h1>
            <h2>Sabor peruano, desde la pachamama hasta tu mesa</h2>
        </div>
    );
};