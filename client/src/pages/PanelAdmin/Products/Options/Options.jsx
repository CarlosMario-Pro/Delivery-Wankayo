import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Options.module.css';

export default function Options () {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };

    return (
        <div className={`${styles.options}  `}>
            <div className={`${styles.links} jcspaceBetween `}>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products')}`} to='/panelAdmin/products' >
                    <p className={`${styles.paragraph} center`}>Productos</p>
                </Link>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products/categories')}`} to='/panelAdmin/products/categories' >
                    <p className={`${styles.paragraph} center`}>Categorías</p>
                </Link>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products/drinks')}`} to='/panelAdmin/products/drinks' >
                    <p className={`${styles.paragraph} center`}>Bebidas</p>
                </Link>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products/extras')}`} to='/panelAdmin/products/extras' >
                    <p className={`${styles.paragraph} center`}>Extras</p>
                </Link>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products/accompanyings')}`} to='/panelAdmin/products/accompanyings' >
                    <p className={`${styles.paragraph} center`}>Acompañamientos</p>
                </Link>
                <Link className={`${styles.link} ${isActive('/panelAdmin/products/sauces')}`} to='/panelAdmin/products/sauces' >
                    <p className={`${styles.paragraph} center`}>Salsas</p>
                </Link>
            </div>
        </div>
    );
};
