import React from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaShippingFast } from 'react-icons/fa';
import styles from './Conditions.module.css';


export default function Conditions () {
    
    return (
        <div className={`${styles.conditions} `}>
            <div className={`${styles.cash}`}>
                <div className={`${styles.container__icon} center `}><GiReceiveMoney className={`${styles.icon} `}/></div>
                <div className={`${styles.text} centerColumn `}>
                    <h3>Paga en efectivo y contra entrega</h3>
                    <p>Paga tus compras fácil y seguro en efectivo al momento de recibir un pedido</p>
                </div>
            </div>

            <div className={`${styles.cash} `}>
                <div className={`${styles.container__icon} center `}><FaShippingFast className={`${styles.icon} `}/></div>
                <div className={`${styles.text} centerColumn `}>
                    <h3>Envío gratis</h3>
                    <p>Envío gratis a toda nuestra ciudad, a cualquier hora y por cualquier compra</p>
                </div>
            </div>

            <div className={`${styles.cash} `}>
                <div className={`${styles.container__icon} center `}><BsCashCoin className={`${styles.icon} `}/></div>
                <div className={`${styles.text} centerColumn `}>
                    <h3>Ahorra en comisiones</h3>
                    <p>En nuestro delivery ofrecemos los precios más competitivos y sin comisiones</p>
                </div>
            </div>
        </div>
    );
};