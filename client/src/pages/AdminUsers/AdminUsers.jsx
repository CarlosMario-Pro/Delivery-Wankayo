import React from 'react';
import PanelAdmin from '../PanelAdmin/PanelAdmin';
import styles from './AdminUsers.module.css';


export default function AdminUsers () {
    return (
        <div className={`${styles.adminUsers} centerColumn `}>
            <PanelAdmin /> 
        </div>
    );
};