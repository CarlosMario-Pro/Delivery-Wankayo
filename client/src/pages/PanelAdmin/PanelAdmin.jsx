import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './PanelAdmin.module.css';

export default function PanelAdmin () {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');

    const handleLinkClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className={`${styles.panelAdmin}`}>
            <h1>Panel Admin</h1>
            <div className={`${styles.panel}`}>
                <Link className={`${styles.link} centerColumn ${location.pathname.includes('/panelAdmin/products') ? styles.active : ''}`} to='/panelAdmin/products' onClick={() => handleLinkClick('products')} >
                    <p className={`${styles.paragraph}`}>Productos</p>
                </Link>                
                <Link className={`${styles.link} centerColumn ${location.pathname.includes('/panelAdmin/userAdmin') ? styles.active : ''}`} to='/panelAdmin/userAdmin' onClick={() => handleLinkClick('users')} >
                    <p className={`${styles.paragraph}`}>Usuarios administradores</p>
                </Link>
                <Link className={`${styles.link} centerColumn ${location.pathname.includes('/panelAdmin/orders') ? styles.active : ''}`} to='/panelAdmin/orders' onClick={() => handleLinkClick('orders')} >
                    <p className={`${styles.paragraph}`}>Órdenes</p>
                </Link>
                <Link className={`${styles.link} centerColumn ${location.pathname.includes('/OrdersHistory/history') ? styles.active : ''}`} to='/OrdersHistory/history' onClick={() => handleLinkClick('history')} >
                    <p className={`${styles.paragraph}`}>Historial de Órdenes</p>
                </Link>
            </div>
        </div>
    );
};
