import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSauces, deleteSauces, trueLogicalDeletionSauces, falseLogicalDeletionSauces } from '../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './Sauces.module.css';


export default function Sauces () {
    const dispatch = useDispatch();
    const sauces = useSelector(state => state.sauces);
    const { userInfoLogin: session } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getSauces());
    }, [dispatch]);

    //Elimanar el proucto
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idSauces) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idSauces]: true,
        }));
    };

    const handleConfirmDelete = (idSauces) => {
        dispatch(deleteSauces(idSauces, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idSauces]: false,
        }));
    };

    const location = useLocation();
    const isCategoryActive = () => {
        return location.pathname.startsWith('/panelAdmin/products/sauces');
    };

    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };

    //Elimina el producto con borrado lógico
    const [showDeleteTrueLogicalModal, setShowDeleteTrueLogicalModal] = useState({});
    const handleShowDeleteTrueLogicalModal = (idSauces) => {
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idSauces]: true,
        }));
    };

    const handleConfirmDeleteTrueLogical = (idSauces) => {
        dispatch(trueLogicalDeletionSauces(idSauces, session));
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idSauces]: false,
        }));
    };

    //Retita un producto eliminado con borrado lógico
    const [showDeleteFalseLogicalModal, setShowDeleteFalseLogicalModal] = useState({});
    const handleShowDeleteFalseLogicalModal = (idSauces) => {
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idSauces]: true,
        }));
    };

    const handleConfirmDeleteFalseLogical = (idSauces) => {
        dispatch(falseLogicalDeletionSauces(idSauces, session));
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idSauces]: false,
        }));
    };


    return (
        <div className={`${styles.general} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>
            <div>
                <Options />
                <div className={`${styles.container} `}>
                    <div className={` flex  jcspaceBetween`}>
                        <Link className={`${styles.options} ${isActive('/panelAdmin/products/sauces')} ${isCategoryActive('/panelAdmin/products/sauces') ? styles.active : ''}`} to='/panelAdmin/products/sauces'><p className={`${styles.paragraph} center`}>Salsas</p></Link>
                        <Link className={`${styles.options}  `} to='/panelAdmin/products/sauces/postSauces'><p className={`${styles.paragraph} center`}>Crear Salsas</p></Link>
                    </div>
                    <h1>Salsas</h1>
                    <div>
                        {sauces?.map((el) => {
                            return (
                                <div className={`${styles.all} `} key={ el._id }>
                                    <div>
                                        <h4>{el.name}</h4>
                                        <p>{el.description}</p>
                                    </div>
                                    <div className={`${styles.pppppppppppp} `}>
                                            {el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteFalseLogicalModal(el._id)}>Retirar de Agotados</button>}
                                            {!el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteTrueLogicalModal(el._id)}>Marcar como agotado</button>}
                                        </div>
                                    <div className={`${styles.container__buttons} flex`}>
                                        <button className={`${styles.buttonDelete} `} onClick={() => handleShowDeleteModal(el._id)}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                        <Link className={`${styles.link} `} to={'/panelAdmin/products/sauces/putSauces/' + el._id}  ><button className={`${styles.buttonUpdate} center`}>Actualizar</button></Link>
                                    </div>
                                    {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                    {showDeleteModal[el._id] && (
                                        <div className={`${styles.modal} centerColumn`}>
                                            <p>¿Deseas eliminar esta salsa</p>
                                            <div>
                                                <button className={`${styles.button} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        {/* Eliminar un producto con borrado lógico de la base de datos */}
                                        {showDeleteTrueLogicalModal[el._id] && (
                                            <div className={`${styles.modal} centerColumn`}>
                                                <p>¿Estás seguro de que deseas marcar como Agotado este producto?</p>
                                                <div className={styles.modalButtons}>
                                                    <button className={`${styles.buttonModale} `} onClick={() => handleConfirmDeleteTrueLogical(el._id)}>Sí</button>
                                                    <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteTrueLogicalModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                </div>
                                            </div>
                                        )}
                                        {/* Retirar un producto eliminado con borrado lógico de la base de datos */}
                                        {showDeleteFalseLogicalModal[el._id] && (
                                            <div className={`${styles.modal} centerColumn`}>
                                                <p>¿Estás seguro de que deseas retirar como Agotado este producto?</p>
                                                <div className={styles.modalButtons}>
                                                    <button className={`${styles.buttonModale} `} onClick={() => handleConfirmDeleteFalseLogical(el._id)}>Sí</button>
                                                    <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteFalseLogicalModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
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
        </div>
    );
};