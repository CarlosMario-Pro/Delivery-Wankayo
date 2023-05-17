import React from 'react';
import PanelAdmin from '../PanelAdmin';
import Options from './Options/Options';
import OrdersPendings from './OrdersPendings/OrdersPendings';
import styles from './Orders.module.css';


export default function Orders () {
    
    return (
        <div className={`${styles.orders} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div>
                <Options />
                <OrdersPendings />
            </div>
        </div>
    );
};