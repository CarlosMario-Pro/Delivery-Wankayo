import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './PanelUser.module.css';
import axios from 'axios';


export default function PanelUser () {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');

    const userInfoLogin = useSelector((state) => state.userInfoLogin);

    const handleLinkClick = (section) => {
        setActiveSection(section);
    };

    const idUser = userInfoLogin.id;

    const logout = async () =>{
        const response = await axios("http://localhost:3001/logout");
        console.log(response)
    }

    return (
        <div className={`${styles.panelAdmin} `}>
            <h1>Hola {userInfoLogin.name}</h1>
            <div className={`${styles.panel} `}>
                <Link className={`${styles.link} centerColumn ${location.pathname.includes(`/panelUser/allInfoUser/${idUser}`) ? styles.active : ''}`} to={`/panelUser/allInfoUser/${idUser}`} onClick={() => handleLinkClick('allInfoUser')} >
                    <p className={`${styles.paragraph}`}>Información Personal</p>
                </Link>                
                <Link className={`${styles.link} centerColumn ${location.pathname.includes(`/panelUser/ordersUser/${idUser}`) ? styles.active : ''}`} to={`/panelUser/ordersUser/${idUser}`} onClick={() => handleLinkClick('ordersUser')} >
                    <p className={`${styles.paragraph}`}>Órdenes activas</p>
                </Link>
                <Link className={`${styles.link} centerColumn ${location.pathname.includes(`/panelUser/ordersHistoryUser/${idUser}`) ? styles.active : ''}`} to={`/panelUser/ordersHistoryUser/${idUser}`} onClick={() => handleLinkClick('ordersHistoryUser')} >
                    <p className={`${styles.paragraph}`}>Historial de Órdenes</p>
                </Link>
                <button onClick={ logout }>Loguot</button>
            </div>
        </div>
    );
};
