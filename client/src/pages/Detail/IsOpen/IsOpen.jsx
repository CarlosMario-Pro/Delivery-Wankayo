import React, { useState, useEffect } from 'react';
import styles from './IsOpen.module.css';

export default function IsOpen () {
    const [isOpen, setIsOpen] = useState(false);

    function getCurrentDayAndTime() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        return { day, hour, minute };
    }

    function isOpenNow() {
        const { day, hour, minute } = getCurrentDayAndTime();
        const schedule = [
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Domingo
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Lunes
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Martes
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Miércoles
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Jueves
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Viernes
            { open: { hour: 11, minute: 30 }, close: { hour: 23, minute: 0 } },      // Sábado
        ];
        const { open, close } = schedule[day];
        const openTime = open.hour * 60 + open.minute;
        const closeTime = close.hour * 60 + close.minute;
        const currentTime = hour * 60 + minute;
        return currentTime >= openTime && currentTime < closeTime;
    }

    useEffect(() => {
        setIsOpen(isOpenNow());
    }, []);


    return (
        <div className={`${styles.isOpen} center`}>
            {isOpenNow() ? <p className={`${styles.open} `}>Adelante - Haz tu pedido y danos el gusto de atenderte</p> : <p className={`${styles.close} `}>Cerrado - Abrimos mañana a las 11:30 am</p>}
        </div>
    );
};