import React from 'react';
import { Link } from 'react-router-dom';
import PanelAdmin from '../PanelAdmin';
import GetUsers from './GetUser/GetUser';
import Options from './Options/Options';
import styles from './UserAdmin.module.css';


export default function UserAdmin () {
    
    return (
        <div className={`${styles.userAdmin} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div className={`${styles.panel} `}>
                <Options />
                <GetUsers />
            </div>
        </div>
    );
};
