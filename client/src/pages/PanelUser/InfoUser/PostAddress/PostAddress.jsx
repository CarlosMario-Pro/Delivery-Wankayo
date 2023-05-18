import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { postAddress } from '../../../../redux/actions/index';
import { useSelector } from 'react-redux';
import PanelUser from '../../PanelUser';
import Options from '../../Options/Options';
import styles from './PostAddress.module.css';

export default function PostAddress () {
    const dispatch = useDispatch();
    const [address, setAddress] = useState({
        country: '',
        state: '',
        city: '',
        street: ''
    });

    const userInfoLogin = useSelector((state) => state.userInfoLogin);
    const idUser = userInfoLogin.id;
    // console.log(idUser)

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
        <div className={`${styles.general} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelUser} `}>
                    <PanelUser />
                </div>
            </div>
            
            <div>
                <Options />
                <div className={`${styles.container} `}>
                    <h1>Crea una dirección</h1>
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="country">País:</label>
                            <input className={`${styles.input} `} type="text" name="country" value={address.country} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="state">Estado:</label>
                            <input className={`${styles.input} `} type="text" name="state" value={address.state} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="city">Ciudad:</label>
                            <input className={`${styles.input} `} type="text" name="city" value={address.city} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="street">Calle:</label>
                            <input className={`${styles.input} `} type="text" name="street" value={address.street} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.buttons} centerColumn`}>
                            <button type="submit" className={`${styles.button} `} >Crear dirección</button>
                            <Link className={`${styles.link} center`} to={`/panelUser/allInfoUser/${idUser}`}><button className={`${styles.backButton} `}>Volver</button></Link>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
};
