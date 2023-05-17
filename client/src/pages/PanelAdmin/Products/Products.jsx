import React from 'react';
import PanelAdmin from '../PanelAdmin';
import AllProducts from './AllProducts/AllProducts';
import Options from './Options/Options';
import styles from './Products.module.css';


export default function Products () {

    return (
        <div className={`${styles.productos} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div>
                <Options />
                <AllProducts />
            </div>
        </div>
    );
};