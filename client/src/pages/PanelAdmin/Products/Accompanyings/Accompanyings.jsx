import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccompanyings, deleteAccompanyings, trueLogicalDeletionAccompanying, falseLogicalDeletionAccompanying } from '../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './Accompanyings.module.css';


export default function Accompanyings () {
    const dispatch = useDispatch();
    const accompanyings = useSelector(state => state.accompanyings);
    const { userInfoLogin: session } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getAccompanyings());
    }, [dispatch]);

    //Elimanar el proucto
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idAccompanyings) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: true,
        }));
    };

    const handleConfirmDelete = (idAccompanyings) => {
        dispatch(deleteAccompanyings(idAccompanyings, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: false,
        }));
    };

    const location = useLocation();
    const isCategoryActive = () => {
        return location.pathname.startsWith('/panelAdmin/products/accompanyings');
    };

    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };


    //Elimina el producto con borrado lógico
    const [showDeleteTrueLogicalModal, setShowDeleteTrueLogicalModal] = useState({});
    const handleShowDeleteTrueLogicalModal = (idAccompanyings) => {
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: true,
        }));
    };

    const handleConfirmDeleteTrueLogical = (idAccompanyings) => {
        dispatch(trueLogicalDeletionAccompanying(idAccompanyings, session));
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: false,
        }));
    };

    //Retita un producto eliminado con borrado lógico
    const [showDeleteFalseLogicalModal, setShowDeleteFalseLogicalModal] = useState({});
    const handleShowDeleteFalseLogicalModal = (idAccompanyings) => {
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: true,
        }));
    };

    const handleConfirmDeleteFalseLogical = (idAccompanyings) => {
        dispatch(falseLogicalDeletionAccompanying(idAccompanyings, session));
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idAccompanyings]: false,
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
                    <div className={` flex jcspaceBetween`}>
                        <Link className={`${styles.options} ${isActive('/panelAdmin/products/categories')} ${isCategoryActive('/panelAdmin/products/accompanyings') ? styles.active : ''}`} to='/panelAdmin/products/accompanyings'><p className={`${styles.paragraph} center`}>Acompañamientos</p></Link>
                        <Link className={`${styles.options} ${isActive('/panelAdmin/products/accompanyings/postAccompanyings')}`} to='/panelAdmin/products/accompanyings/postAccompanyings'><p className={`${styles.paragraph} center`}>Crear Acompañamientos</p></Link>
                    </div>
                    <h1>Acompañamientos</h1>
                    <div>
                        {accompanyings?.map((el) => {
                            return (
                                <div key={ el._id } className={`${styles.cards} center`}>
                                    <div className={`${styles.text__container} ${el.isDeleted ? `${styles.isDeleted}` : ''}`}>
                                        <div className={`${styles.container_Image} ${el.isDeleted ? `${styles.isDeletedContainerImage}` : ''}`}>
                                            <img className={`${styles.image} ${el.isDeleted ? `${styles.isDeletedImage}` : ''}`} src={ el.image } alt="Imagen" />
                                            <div className={`${styles.pppppppppppp} `}>
                                                {el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteFalseLogicalModal(el._id)}>Retirar de Agotados</button>}
                                                {!el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteTrueLogicalModal(el._id)}>Marcar como agotado</button>}
                                            </div>
                                        </div>
                                        <div className={`${styles.fff} `}>
                                            <div className={`${styles.buttons} flex `}>
                                                <button className={`${styles.buttonDelete} ${el.isDeleted ? `${styles.isDeletedButton}` : ''}`} onClick={() => handleShowDeleteModal(el._id)} disabled={el.isDeleted}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                                <Link className={`${styles.link} `} to={'/panelAdmin/products/putProduct/' + el._id}><button className={`${styles.paragraph} ${el.isDeleted ? `${styles.isDeletedButton}` : ''} center`} disabled={el.isDeleted}>Actualizar</button></Link>
                                            </div>
    
                                            {/* Eliminar permanentemente un producto de la base de datos */}
                                            {showDeleteModal[el._id] && (
                                                <div className={`${styles.modal} centerColumn`}>
                                                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                                                    <div className={styles.modalButtons}>
                                                        <button className={`${styles.buttonModale} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                        <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                    </div>
                                                </div>
                                            )}
    
                                            <div className={`${styles.modalPPPPPP} `}>
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
                                        <div className={`${styles.text} `}>
                                            <h4>{ el.name }</h4>
                                            <h4>{ el.pseudoName }</h4>
                                            {!el.pseudoName && <h4>No tiene Segundo Nombre</h4>}
                                            <h5>Código: { el.code }</h5>
                                            <div className={` flex`}>
                                                <h4 className={el.promoPrice ? styles.strikethrough : ''}>Precio: S/ {el.price.toFixed(2)}</h4>
                                                {el.promoPrice ? <h4>Nuevo Precio: S/ {el.promoPrice.toFixed(2)}</h4> : ''}
                                            </div>
                                            <p>{ el.description }</p>
                                        </div>                              
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