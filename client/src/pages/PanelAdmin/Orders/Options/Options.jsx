import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Options.module.css';

export default function Options () {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };

    return (
        <div className={`${styles.options} flex `}>
            <div>
                <div className={`${styles.links} flex `}>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/orders')}`} to='/panelAdmin/orders' >
                        <p className={`${styles.paragraph} center`}>Órdenes Pendientes</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/orders/OrdersPreparation')}`} to='/panelAdmin/orders/OrdersPreparation' >
                        <p className={`${styles.paragraph} center`}>Órdenes En Preparación</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/orders/OrdersOnTheWay')}`} to='/panelAdmin/orders/OrdersOnTheWay' >
                        <p className={`${styles.paragraph} center`}>Órdenes en Camino</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/orders/OrdersDelivered')}`} to='/panelAdmin/orders/OrdersDelivered' >
                        <p className={`${styles.paragraph} center`}>Órdenes Entregadas</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
