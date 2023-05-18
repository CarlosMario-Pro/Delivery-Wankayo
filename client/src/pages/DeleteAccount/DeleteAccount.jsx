import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountUser  } from "../../redux/actions/index";
import styles from './DeleteAccount.module.css';


export default function DeleteAccount () {
    const dispatch = useDispatch();

    const userInfoLogin = useSelector((state) => state.userInfoLogin);

    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idUser) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idUser]: true,
        }));
    };

    const handleConfirmDelete = (idUser) => {
        dispatch(deleteAccountUser(idUser));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idUser]: false,
        }));
    };

    
    return (
        <div className={`${styles.general} flex `}>
            <h1>Delete Account</h1>
                <div>
                    <p>{userInfoLogin.name}</p>

                    <div className={`${styles.fff} `}>
                        <div className={`${styles.buttons}  centerColumnSpaceBetween`}>
                            <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(userInfoLogin.id)}>Eliminar</button>
                        </div>
                        {showDeleteModal[userInfoLogin.id] && (
                            <div className={`${styles.modal} centerColumn`}>
                                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                                <div className={styles.modalButtons}>
                                    <button className={`${styles.button} `} onClick={() => handleConfirmDelete(userInfoLogin.id)}>Sí</button>
                                    <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [userInfoLogin.id]: false }))}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        </div>
    );
};
