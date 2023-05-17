import React from 'react';
import PanelUser from '../PanelUser';
import AllInfoUser from './AllInfoUser/AllInfoUser';
import Options from '../Options/Options';
import styles from './InfoUser.module.css';


export default function InfolUser () {

    return (
        <div className={`${styles.productos} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelUser />
                </div>
            </div>

            <div className={`${styles.content} `}>
                <Options className={`${styles.option} `}/>
                <AllInfoUser />
            </div>
        </div>
    );
};