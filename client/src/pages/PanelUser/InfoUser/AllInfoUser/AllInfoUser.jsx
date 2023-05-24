import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getAllInfoUser, getAddress, deleteAddress } from '../../../../redux/actions/index';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from './AllInfoUser.module.css';


export default function AllInfoUser () {
    const location = useLocation();
    const dispatch = useDispatch();

    const userInfoLogin = useSelector((state) => state.userInfoLogin);
    const idUser = userInfoLogin.id;
    const addressUser = useSelector((state) => state.addressUser);

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
        <div className={`${styles.panelUser} `}>
            <h1>Tu información personal</h1>
            <div>
                <div>
                    <p><span className={styles.spanTitle}>Nombre:</span> {userInfoLogin.name} { userInfoLogin.lastName }</p>
                    <p><span className={styles.spanTitle}>Documento de identidad: </span>{ userInfoLogin.docIdentity }</p>
                    <p><span className={styles.spanTitle}>Email: </span>{ userInfoLogin.email }</p>
                    <p><span className={styles.spanTitle}>Número telefónico: </span>{ userInfoLogin.phone }</p>
                </div>

                <div>
                    <Link className={`${styles.link} flex`} to={'/panelUser/allInfoUser/postAddress/' + idUser} ><AiOutlinePlus className={`${styles.icon} `}/> <p>Añadir Dirección</p></Link>
                </div>
                <div>
                    {addressUser?.map((el) => {
                        return (
                            <div key={ el._id } className={`${styles.address} jcspaceBetween`}>
                                <div>
                                    <p><span className={styles.spanTitle}>País: </span>{ el.country }</p>
                                    <p><span className={styles.spanTitle}>Estado: </span>{ el.state }</p>
                                    <p><span className={styles.spanTitle}>Ciudad: </span>{ el.city }</p>
                                    <p><span className={styles.spanTitle}>Dirección: </span>{ el.street }</p>
                                </div>

                                <div className={`${styles.container__buttos} `}>
                                    <div className={`${styles.buttons} centerColumnSpaceBetween `}>
                                        <button className={`${styles.delete} `} onClick={() => handleShowDeleteModal(el._id)}><RiDeleteBin6Line /></button>
                                        <Link className={`${styles.update} `} to={'/panelUser/allInfoUser/UpdateAddressUser/' + idUser + '/' + el._id}  ><button className={`${styles.textUpdate} center`}>Actualizar</button></Link>
                                    </div>

                                    {showDeleteModal[el._id] && (
                                        <div className={`${styles.modal}  `}>
                                            <p>¿Estás seguro de que deseas eliminar esta dirección?</p>
                                            <div className={`${styles.modalButtons} jcspaceAround `}>
                                                <button className={`${styles.delete} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
