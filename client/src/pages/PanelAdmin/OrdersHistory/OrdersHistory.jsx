import React from 'react';
import PanelAdmin from '../PanelAdmin';
import Options from './Options/Options';
import Historial from './Historial/Historial';
import styles from './OrdersHistory.module.css';


export default function OrdersHistory () {

    return (
        <div className={`${styles.orders} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>
            <div>
                <Options />
                <Historial />
            </div>
        </div>
    );
};
