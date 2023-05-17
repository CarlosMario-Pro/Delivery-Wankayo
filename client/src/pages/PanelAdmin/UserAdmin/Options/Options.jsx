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
                <div className={`${styles.links}  `}>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/userAdmin')} `} to='/panelAdmin/userAdmin' >
                        <p className={`${styles.paragraph} center`}>Usuarios</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive('/panelAdmin/userAdmin/postUserAdmin')} `} to='/panelAdmin/userAdmin/postUserAdmin' >
                        <p className={`${styles.paragraph} center`}>Crear Usuarios</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
