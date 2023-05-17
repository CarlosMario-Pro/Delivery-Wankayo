import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserAdmin, deleteUserAdmin  } from "../../../../redux/actions/index";
import styles from './GetUser.module.css';


export default function GetUsers () {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(()=>{
        dispatch(getUserAdmin());
    }, [dispatch]);


    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idUser) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idUser]: true,
        }));
    };

    const handleConfirmDelete = (idUser) => {
        dispatch(deleteUserAdmin(idUser));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idUser]: false,
        }));
    };

    // const handleDeleteUser = (idUser) => {
    //     dispatch(deleteUserAdmin(idUser));
    // };


    return (
        <div className={`${styles.getUsers}  `}>
            <div>
                <div>
                    {user?.map((el) => {
                        return (
                            <div key={ el._id }>
                                <div className={`${styles.text__container} `}>
                                    <div>
                                        <p>Nombres: { el.name }</p>
                                        <p>Apellidos: { el.lastName }</p>
                                        <p>Documento de identidad: { el.docIdentity }</p>
                                        <p>Email: { el.email }</p>
                                        <p>Número telefónico: { el.phone }</p>
                                        <p>Rol: { el.role }</p>
                                        <p>Bloqueado: { el.isBlocked }</p>
                                        <p>Oculto: { el.isDeleted }</p>
                                        <p>Fecha de creación: { el.createdAt }</p>
                                    </div>

                                    <div className={`${styles.fff} `}>
                                        <div className={`${styles.buttons}  centerColumnSpaceBetween`}>
                                            <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(el._id)}>Eliminar</button>
                                            <Link className={`${styles.link} `} to={'/panelAdmin/userAdmin/putUserAdmin/' + el._id} ><button className={`${styles.paragraph} center`}>Actualizar usuario</button></Link>
                                        </div>
                                        {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                        {showDeleteModal[el._id] && (
                                            <div className={`${styles.modal} centerColumn`}>
                                                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                                                <div className={styles.modalButtons}>
                                                    <button className={`${styles.button} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                    <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};