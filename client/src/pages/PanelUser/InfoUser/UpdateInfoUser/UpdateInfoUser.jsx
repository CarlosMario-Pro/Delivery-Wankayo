import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getAllInfoUser, putUserInfo } from '../../../../redux/actions/index';
import PanelUser from '../../PanelUser';
import Options from '../../Options/Options';
import styles from './UpdateInfoUser.module.css';


const initialUserState = {
    name: '',
    lastName: '',
    docIdentity: '',
    email: '',
    phone: ''
};

export default function UpdateInfoUser () {
    const dispatch = useDispatch();
    const idUser = useParams().idUser;

    const [user, setUser] = useState(initialUserState);
    const allInfoUser = useSelector((state) => state.allInfoUser);

    useEffect(() => {
        dispatch(getAllInfoUser(idUser));//Traer la información del usuario por ID
    }, [dispatch, idUser]);

    useEffect(() => {
        if (allInfoUser) {
            setUser(allInfoUser);
        }
    }, [allInfoUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userToSend = { ...user };
            dispatch(putUserInfo(idUser, userToSend));
            setUser(initialUserState);
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
                <div className={`${styles.containerProducts} center `}>
                    <form className={`${styles.formProducts} `} onSubmit={(e) => handleSubmit(e)}>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} >Nombre</label>
                            <input type="name" name='name' placeholder="Nombre"value={ user.name } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} >Apellido</label>
                            <input type="text" name='lastName' placeholder="Apellido" value={ user.lastName } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} >Documento de identidad</label>
                            <input type="text" name='docIdentity' placeholder="Documento de identidad" value={ user.docIdentity } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} >Email</label>
                            <input type="text" name='email' placeholder="Email" value={ user.email } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label className={`${styles.formLabel} `} >Teléfono</label>
                            <input type="text" name='phone' placeholder="Teléfono" value={ user.phone } onChange={(e) => handleInputChange(e)} />
                        </div>
                        <div className={`${styles.buttons} centerColumn`}>
                            <button type="submit" className={`${styles.button} `} >Actualizar usuario</button>
                            <div><Link to='/panelUser/allInfoUser'><button className={`${styles.backButton} `}>Volver</button></Link></div>
                        </div> 
                    </form>
                </div>
            </div>
 
        </div>
    );
};
