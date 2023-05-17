import React from 'react';
import styles from './Categories.module.css';
import Bebidas from './Bebidas/Bebidas';
import Boxes from './Boxes/Boxes';
import Combos from './Combos/Combos';
import ConosPersonales from './ConosPersonales/ConosPersonales';
import Hamburguesas from './Hamburguesas/Hamburguesas';
import Snacks from './Snacks/Snacks';


export default function Categories() {
    return (
        <div className={`${styles.categories} `}>
            <h1 className={`${styles.title} `}>Categorias</h1>
            <div className={`${styles.container} flex `}>
                <ConosPersonales />
                <Snacks />
                <Boxes />
                <Combos />
                <Hamburguesas />
                <Bebidas />
            </div>
        </div>
    );
};