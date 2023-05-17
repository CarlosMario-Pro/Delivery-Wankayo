import React, { useState, useEffect } from 'react';
import styles from './Map.module.css';

export default function Map () {
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
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Domingo
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Lunes
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Martes
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Miércoles
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },     // Jueves
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Viernes
            { open: { hour: 11, minute: 0 }, close: { hour: 23, minute: 0 } },      // Sábado
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
        <div className={`${styles.map} displayFlex`}>
            <div className={`${styles.container} marginCenter `}>
                <div className={`${styles.schedules} `}>
                    <h4>Horarios de Apertura y Cierre</h4>
                    <div className={`${styles.schedules__container} `}>
                        <div className={`${styles.one} `}>
                            <p className={`${styles.text} `}>Lunes</p>
                            <p className={`${styles.text} `}>Martes</p>
                            <p className={`${styles.text} `}>Miércoles</p>
                            <p className={`${styles.text} `}>Jueves</p>
                            <p className={`${styles.text} `}>Viernes</p>
                            <p className={`${styles.text} `}>Sábado</p>
                            <p className={`${styles.text} `}>Domingo</p>
                        </div>
                        <div className={`${styles.two}`}>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                            <p className={`${styles.text} `}>11:00 - 23:00</p>
                        </div>
                    </div>

                    <div>
                        {isOpenNow() ? <p className={`${styles.open} `}>Abierto</p> : <p className={`${styles.close} `}>Cerrado</p>}
                    </div>

                    <div className={`${styles.address} centerColumn`}>
                        <h3>Nos puedes encontrar en</h3>
                        <p>Av. Ferrocarril 502, Huancayo, Perú</p>
                        <p>+51 903140618</p>
                        <p>wankayo.comercial@gmail.com</p>
                    </div>
                </div>

                <div className={`${styles.map__container}`}>
                    <iframe
                        className={`${styles.iframe}`}
                        src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15606.801083663238!2d-75.2074463!3d-12.0641318!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97f569eb62a5%3A0xc2d3a38d70cf5704!2sWankayo%20Sabor%20Peruano!5e0!3m2!1ses!2sco!4v1679092960689!5m2!1ses!2sco`}
                        width="600"
                        height="450"
                        frameBorder="0"
                        style={{border:0}}
                        allowFullScreen
                    />
                </div>
           </div>
        </div>
    );
};