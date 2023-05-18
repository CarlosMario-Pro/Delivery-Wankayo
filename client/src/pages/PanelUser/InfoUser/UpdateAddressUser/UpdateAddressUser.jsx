import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getIdAddress, putAddress } from '../../../../redux/actions/index';
import PanelUser from '../../PanelUser';
import Options from '../../Options/Options';
import styles from './UpdateAddressUser.module.css';


const initialAddressState = {
    country: '',
    state: '',
    city: '',
    street: ''
};

export default function UpdateAddressUser () {
    const dispatch = useDispatch();

    const idUser = useParams().idUser;
    const idAddress = useParams().idAddress;

    const [address, setAddress] = useState(initialAddressState);
    const idAddressUser = useSelector((state) => state.idAddressUser);

    useEffect(() => {
        dispatch(getIdAddress(idAddress));//Traer la dirección por ID
    }, [dispatch, idUser]);

    useEffect(() => {
        if (idAddressUser) {
            setAddress(idAddressUser);
        }
    }, [idAddressUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const addressToSend = { ...address };
            dispatch(putAddress(idUser, idAddress, addressToSend));
            setAddress(initialAddressState);
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
                    <h1>Actualizar tu dirección</h1>
                    <form className={`${styles.form} `} onSubmit={(e) => handleSubmit(e)}>
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
                            <button type="submit" className={`${styles.button} `} >Actualizar dirección</button>
                            <Link className={`${styles.link} center`} to={`/panelUser/allInfoUser/${idUser}`}><button className={`${styles.backButton} `}>Volver</button></Link>
                        </div> 
                    </form>
                </div>
            </div> 
        </div>
    );
};