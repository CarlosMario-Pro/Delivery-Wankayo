import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Options.module.css';

export default function Options () {
    const location = useLocation();
    const userInfoLogin = useSelector((state) => state.userInfoLogin);
    const idUser = userInfoLogin.id;
    
    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };

    return (
        <div className={`${styles.options}  `}>
            <div>
                <div className={`${styles.links} flex `}>
                    <Link className={`${styles.link} ${isActive(`/panelUser/allInfoUser/${idUser}`)}`} to={`/panelUser/allInfoUser/${idUser}`} >
                        <p className={`${styles.paragraph} center`}>Tu información</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive(`/panelUser/allInfoUser/UpdateInfoUser/${idUser}`)}`} to={`/panelUser/allInfoUser/UpdateInfoUser/${idUser}`} >
                        <p className={`${styles.paragraph} center`}>Actualiza tu información personal</p>
                    </Link>
                    <Link className={`${styles.link} ${isActive(`/deleteAccount/${idUser}`)}`} to={`/deleteAccount/${idUser}`} >
                        <p className={`${styles.paragraph} center`}>Elimina tu cuenta</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};
