import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserAdmin } from '../../../../redux/actions/index';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './PostUser.module.css';


export default function PostUser() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        docIdentity: '',
        email: '',
        password: '',
        phone: '',
        role: ''
    });
    console.log(user)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleRoleChange = (event) => {
        const { value } = event.target;
        setUser({
            ...user,
            role: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(postUserAdmin(user));
            setUser({
                name: '',
                lastName: '',
                docIdentity: '',
                email: '',
                password: '',
                phone: '',
                role: ''
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${styles.postUser} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div className={`${styles.containerUser} `}>
                <Options />
                <form className={`${styles.formProducts} `} onSubmit={handleSubmit}>
                    <div className={`${styles.input} `}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="image">Apellido:</label>
                        <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="docIdentity">Documento de identidad:</label>
                        <input type="text" name="docIdentity" value={user.docIdentity} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="email">Correo:</label>
                        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="text" name="password" checked={user.password} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="text" name="phone" checked={user.phone} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="role">Rol:</label>
                        <select className={`${styles.select__Category} `} name="role" value={user.role} onChange={handleRoleChange}>
                            <option >Selecciona una opción</option>
                            <option value="superAdmin">Super Administrador</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <button className={`${styles.button__submit} `} type="submit">Crear Usuario</button>
                </form>
            </div>
        </div>
    );
};