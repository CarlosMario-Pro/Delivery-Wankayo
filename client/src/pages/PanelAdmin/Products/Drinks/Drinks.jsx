import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinks, deleteDrinks, trueLogicalDeletionDrink, falseLogicalDeletionDrink } from '../../../../redux/actions/index';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './Drinks.module.css';


export default function Drinks () {
    const dispatch = useDispatch();
    const drinks = useSelector(state => state.drinks);
    const { userInfoLogin: session } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getDrinks());
    }, [dispatch]);

    //Elimanar una bebida permanentemente
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idDrinks) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idDrinks]: true,
        }));
    };

    const handleConfirmDelete = (idDrinks) => {
        dispatch(deleteDrinks(idDrinks, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idDrinks]: false,
        }));
    };

    //Elimina el producto con borrado lógico
    const [showDeleteTrueLogicalModal, setShowDeleteTrueLogicalModal] = useState({});
    const handleShowDeleteTrueLogicalModal = (idDrinks) => {
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idDrinks]: true,
        }));
    };

    const handleConfirmDeleteTrueLogical = (idDrinks) => {
        dispatch(trueLogicalDeletionDrink(idDrinks, session));
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idDrinks]: false,
        }));
    };

    //Retita un producto eliminado con borrado lógico
    const [showDeleteFalseLogicalModal, setShowDeleteFalseLogicalModal] = useState({});
    const handleShowDeleteFalseLogicalModal = (idDrinks) => {
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idDrinks]: true,
        }));
    };

    const handleConfirmDeleteFalseLogical = (idDrinks) => {
        dispatch(falseLogicalDeletionDrink(idDrinks, session));
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idDrinks]: false,
        }));
    };


    return (
        <div className={`${styles.drinks} flex `}>
        <div className={` flex `}>
            <div className={`${styles.panelAdmin} `}>
                <PanelAdmin />
            </div>
        </div>

        <div>
            <Options />
            <div className={`${styles.containerDrinks}   `}>
                <div className={` flex jcspaceBetween`}>
                    <Link className={`${styles.link}  `} to='/panelAdmin/products/drinks'><p className={`${styles.paragraph} center`}>Todas las Bebidas</p></Link>
                    <Link className={`${styles.link}  `} to='/panelAdmin/products/drinks/postDrinks'><p className={`${styles.paragraph} center`}>Crear Bebida</p></Link>
                </div>
                <h1>Bebidas</h1>

                <div className={`${styles.container} `}>
                    {drinks?.map((el) => {
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