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
        <div className={`${styles.productos} flex `}>
           <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelUser />
                </div>
            </div>
            
            <div>
                <Options />
                <h1>Rellena todos los espacios para actualizar tu dirección</h1>
                <div className={`${styles.containerProducts} center`}>
                    <form className={`${styles.formProducts} `} onSubmit={(e) => handleSubmit(e)}>
                        <div className={`${styles.input} `}>
                            <label>Country</label>
                            <input type="name" name='country' placeholder="Country" value={ address.country } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label>State</label>
                            <input type="text" name='state' placeholder="State" value={ address.state } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label>City</label>
                            <input type="text" name='city' placeholder="City" value={ address.city } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label>Street</label>
                            <input type="text" name='street' placeholder="Street" value={ address.street } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.buttons} centerColumn`}>
                            <button className={`${styles.button} `} type="submit">Actualizar dirección</button>
                            <Link to='/panelUser/allInfoUser'><button className={`${styles.backButton} `}>Volver</button></Link>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
};




/*


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getAddress, putAddressUser } from '../../../../redux/actions/index';
import PanelUser from '../../PanelUser';
import Options from '../../Options/Options';
import styles from './UpdateAddressUser.module.css';

function validate (input) {
    let errors = {};
    if(!input.country){
        errors.country = "Tu país es requerido.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.country)){
        errors.country = "Tu País no puede tener números o caracteres especiales.";
    }
    if(!input.state){
        errors.state = "Tu Estado, Departamento o Provincia es requerido.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.state)){
        errors.state = "Tu Estado, Departamento o Provincia no puede tener números o caracteres especiales.";
    }
    if(!input.city){
        errors.city = "Tu ciudad es requerida.";
    } else if(/[.!@#$%^&*()_+-=]/.test(input.city)){
        errors.city = "Tu ciudad no puede tener números o caracteres especiales.";
    }
    // if(!input.street){
    //     errors.street = "Tu dirección es requerida.";
    // } else if(/[.!@#$%^&*()_+-=]/.test(input.street)){
    //     errors.street = "Tu dirección se requiere.";
    // }
    return errors;
};


export default function UpdateAddressUser () {
    const dispatch = useDispatch();
    const [ errors, setErrors ] = useState({});

    const idAddress = useParams().idAddress;
    const idUser = useParams().idUser;

    useEffect(()=>{
        dispatch(getAddress(idUser));
    }, [dispatch]);

    const [ input, setInput ] = useState({
        country: '',
        state: '',
        city: '',
        street: ''
    });

    function handleChange(e) {
        setInput({                      
            ...input,                  
            [e.target.name] : e.target.value   
        });
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    };


    function handleSubmit(e) {
        e.preventDefault(); 
        dispatch(putAddressUser(idUser, idAddress, input ));
        setInput({
            country: '',
            state: '',
            city: '',
            street: ''
        });
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
                <h1>Rellena todos los espacios para actualizar tu dirección</h1>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <div>
                                <label>Country</label>
                                <input type="name" name='country' placeholder="Country"value={ input.country } onChange={(e) => handleChange(e)} />
                                {errors.country && <p className="danger">{ errors.country }</p>}
                            </div>
                            <div>
                                <label>State</label>
                                <input type="text" name='state' placeholder="State" value={ input.state } onChange={(e) => handleChange(e)} />
                                {errors.state && <p className="danger">{ errors.state }</p>}
                            </div>
                            <div>
                                <label>City</label>
                                <input type="text" name='city' placeholder="City" value={ input.city } onChange={(e) => handleChange(e)} />
                                {errors.city && <p className="danger">{ errors.city }</p>}
                            </div>
                            <div>
                                <label>Street</label>
                                <input type="text" name='street' placeholder="Street" value={ input.street } onChange={(e) => handleChange(e)} />
                                {errors.street && <p className="danger">{ errors.street }</p>}
                            </div>
                            {
                                !errors.country && input.country.length > 0 &&
                                !errors.state && input.state.length > 0 &&
                                !errors.city && input.city.length > 0  &&
                                !errors.street && input.street.length > 0 ?
                                <button type="submit">Actualizar</button> : <button type="submit" disabled>Actualizar</button>
                            }
                            <div>
                                <Link to='/panelUser/allInfoUser'><button >Volver</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
        </div>
    );
};


*/