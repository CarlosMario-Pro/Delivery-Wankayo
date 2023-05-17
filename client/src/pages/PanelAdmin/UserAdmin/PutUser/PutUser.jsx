import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putUserAdmin, getIdUserAdmin } from '../../../../redux/actions/index';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './PutUser.module.css';

const initialAdminState = {
    name: '',
    lastName: '',
    docIdentity: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    isBlocked: '',
    isDeleted: ''
};

export default function PutUser() {
    const dispatch = useDispatch();
    const { idUserAdmin } = useParams();

    const [userAdmin, setUserAdmin] = useState(initialAdminState);
    const { adminDetails } = useSelector(state => ({
        adminDetails: state.adminDetails
    }));

    useEffect(() => {
        dispatch(getIdUserAdmin(idUserAdmin));
    }, [dispatch, idUserAdmin]);

    useEffect(() => {
        if (adminDetails) {
            setUserAdmin(adminDetails);
        }
    }, [adminDetails]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserAdmin({
            ...userAdmin,
            [name]: value
        });
    };

    const handleRoleChange = (event) => {
        const { value } = event.target;
        setUserAdmin({
            ...userAdmin,
            role: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const drinksToSend = { ...userAdmin };
            dispatch(putUserAdmin(idUserAdmin, drinksToSend));
            setUserAdmin(initialAdminState);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${styles.putUser} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>


            <div className={`${styles.containerUser} `}>
                <Options />
                <h3>Actualizar Usuarios</h3>
                <form className={`${styles.formProducts} `} onSubmit={handleSubmit}>
                    <div className={`${styles.input} `}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" value={userAdmin.name} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="image">Apellido:</label>
                        <input type="text" name="lastName" value={userAdmin.lastName} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="docIdentity">Documento de identidad:</label>
                        <input type="text" name="docIdentity" value={userAdmin.docIdentity} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="email">Correo:</label>
                        <input type="text" name="email" value={userAdmin.email} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="text" name="password" value={userAdmin.password} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="text" name="phone" value={userAdmin.phone} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="role">Rol:</label>
                        <select className={`${styles.select__Category} `} name="role" value={userAdmin.role} onChange={handleRoleChange}>
                            <option >Selecciona una opción</option>
                            <option value="superAdmin">Super Administrador</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="isBlocked">Usuario bloqueado:</label>
                        <input type="text" name="isBlocked" value={userAdmin.isBlocked} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="isDeleted">Usuario Ocultado:</label>
                        <input type="text" name="isDeleted" value={userAdmin.isDeleted} onChange={handleInputChange} />
                    </div>
                    <button className={`${styles.button__submit} `} type="submit">Actualizar Usuario</button>
                </form>
            </div>
        </div>
    );
};