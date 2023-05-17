// const allInfoUser = useSelector((state) => state.allInfoUser);
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllInfoUser, getAddress, deleteAddress } from '../../../../redux/actions/index';
import styles from './AllInfoUser.module.css';

export default function AllInfoUser () {
    const location = useLocation();
    const dispatch = useDispatch();

    const userInfoLogin = useSelector((state) => state.userInfoLogin);
    const addressUser = useSelector((state) => state.addressUser);

    const idUser = userInfoLogin.id;


    useEffect(()=>{
        dispatch(getAllInfoUser(idUser));
    }, [dispatch]);


    useEffect(()=>{
        dispatch(getAddress(idUser));
    }, [dispatch]);

    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };


    //Eliminar la orden
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idAddress) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idAddress]: true,
        }));
    };

    const handleConfirmDelete = (idAddress) => {
        dispatch(deleteAddress(idAddress));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idAddress]: false,
        }));
    };


    return (
        <div className={`${styles.panelAdmin} `}>
            <h1>Tu información personal</h1>
            <div>
                <div>
                    <p>Nombre: {userInfoLogin.name}</p>
                    <p>Apellidos: { userInfoLogin.lastName }</p>
                    <p>Documento de identidad: { userInfoLogin.docIdentity }</p>
                    <p>Email: { userInfoLogin.email }</p>
                    <p>Número telefónico: { userInfoLogin.phone }</p>
                </div>
                <div>
                    {addressUser?.map((el) => {
                        return (
                            <div key={ el._id } className={`${styles.address} jcspaceBetween`}>
                                <div className={`${styles.address__container} `}>
                                    <p><span className={styles.spanTitle}>País: </span>{ el.country }</p>
                                    <p><span className={styles.spanTitle}>Estado: </span>{ el.state }</p>
                                    <p><span className={styles.spanTitle}>Ciudad: </span>{ el.city }</p>
                                    <p><span className={styles.spanTitle}>Dirección: </span>{ el.street }</p>
                                </div>

                                <div className={`${styles.fff} `}>
                                    <div className={`${styles.buttons} centerColumnSpaceBetween `}>
                                        <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(el._id)}>Eliminar</button>
                                        <Link className={`${styles.link} `} to={'/panelUser/allInfoUser/UpdateAddressUser/' + idUser + '/' + el._id}  ><button className={`${styles.paragraph} center`}>Actualizar</button></Link>
                                    </div>

                                    {showDeleteModal[el._id] && (
                                        <div className={`${styles.modal}  `}>
                                            <p>¿Estás seguro de que deseas eliminar esta dirección?</p>
                                            <div className={`${styles.modalButtons} jcspaceAround `}>
                                                <button className={`${styles.button} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p>Fecha de pedido: {new Date(userInfoLogin.createdAt).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} </p>
            </div>
        </div>
    );
};
