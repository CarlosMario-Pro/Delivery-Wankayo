import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { postAddress } from '../../../../redux/actions/index';
import PanelUser from '../../PanelUser';
import Options from '../../Options/Options';
import styles from './PostAddress.module.css';

export default function PostAddress () {
    const idUser = useParams().idUser;

    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        country: '',
        state: '',
        city: '',
        street: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddress({
            ...address,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(postAddress(idUser, address));
            setAddress({
                country: '',
                state: '',
                city: '',
                street: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

 

    return (
        <div className={`${styles.productos} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelUser />
                </div>
            </div>
            
            <div>
                <Options />
                <h1>Crea una dirección</h1>
                <div className={`${styles.containerProducts} center`}>
                    <form className={`${styles.formProducts} `} onSubmit={handleSubmit}>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} htmlFor="country">País:</label>
                            <input type="text" name="country" value={address.country} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} htmlFor="state">Estado:</label>
                            <input type="text" name="state" value={address.state} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} htmlFor="city">Ciudad:</label>
                            <input type="text" name="city" value={address.city} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} htmlFor="street">Calle:</label>
                            <input type="text" name="street" value={address.street} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.buttons} centerColumn`}>
                            <button type="submit" className={`${styles.button} `} >Crear dirección</button>
                            <div><Link to='/panelUser/allInfoUser'><button className={`${styles.backButton} `}>Volver</button></Link></div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};
