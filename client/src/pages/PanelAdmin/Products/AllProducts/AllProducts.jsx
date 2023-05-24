import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProducts, deleteProduct, trueLogicalDeletionProduct, falseLogicalDeletionProduct } from '../../../../redux/actions/index';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from "react-router-dom";
import styles from './AllProducts.module.css';


export default function AllProducts () {
    const dispatch = useDispatch();
    const { categoriesId } = useSelector(state => state);    
    const { categories } = useSelector(state => state);
    const { userInfoLogin: session } = useSelector((state) => state);
    
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);
    
    const getCategoryName = (categoryId) => {
        const category = categoriesId.find(c => c._id === categoryId);
        return category ? category.category : categoryId;
    };

    //Eliminar el proucto permanentemente
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idProduct) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idProduct]: true,
        }));
    };

    const handleConfirmDelete = (idProduct) => {
        dispatch(deleteProduct(idProduct, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idProduct]: false,
        }));
    };

    //Elimina el producto con borrado lógico
    const [showDeleteTrueLogicalModal, setShowDeleteTrueLogicalModal] = useState({});
    const handleShowDeleteTrueLogicalModal = (idProduct) => {
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idProduct]: true,
        }));
    };

    const handleConfirmDeleteTrueLogical = (idProduct) => {
        dispatch(trueLogicalDeletionProduct(idProduct, session));
        setShowDeleteTrueLogicalModal((prevState) => ({
            ...prevState,
            [idProduct]: false,
        }));
    };

    //Retita un producto eliminado con borrado lógico
    const [showDeleteFalseLogicalModal, setShowDeleteFalseLogicalModal] = useState({});
    const handleShowDeleteFalseLogicalModal = (idProduct) => {
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idProduct]: true,
        }));
    };

    const handleConfirmDeleteFalseLogical = (idProduct) => {
        dispatch(falseLogicalDeletionProduct(idProduct, session));
        setShowDeleteFalseLogicalModal((prevState) => ({
            ...prevState,
            [idProduct]: false,
        }));
    };


    return (
        <div className={`${styles.general} `}>
            <div className={` flex jcspaceBetween`}>
                <Link className={`${styles.options}  `} to='/panelAdmin/products/postProducts'><p className={`${styles.create__product} center`}>Crear Producto</p></Link>
            </div>

            {Object.entries(categories).map(([category, products]) => (
                <div key={category} className={`${styles.container} `} >
                    <h1>{getCategoryName(category)}</h1>
                    <div className={`${styles.container__description} `}>
                        {products.map(el => {
                            return (
                                <div key={ el._id } className={` center`}>
                                    <div className={`${styles.text__container} ${el.isDeleted ? `${styles.isDeleted}` : ''}`}>
                                        <div className={`${styles.container_Image} ${el.isDeleted ? `${styles.isDeletedContainerImage}` : ''}`}>
                                            <img className={`${styles.image} ${el.isDeleted ? `${styles.isDeletedImage}` : ''}`} src={ el.image } alt="Imagen" />
                                            <div className={`${styles.deleted} `}>
                                                {el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteFalseLogicalModal(el._id)}>Retirar de Agotados</button>}
                                                {!el.isDeleted && <button className={`${styles.buttonModale} `} onClick={() => handleShowDeleteTrueLogicalModal(el._id)}>Marcar como agotado</button>}
                                            </div>
                                        </div>
                                        <div className={`${styles.containers__modals} `}>
                                            <div className={`${styles.buttons} flex `}>
                                                <button className={`${styles.buttonDelete} ${el.isDeleted ? `${styles.isDeletedButton}` : ''}`} onClick={() => handleShowDeleteModal(el._id)} disabled={el.isDeleted}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                                <Link className={`${styles.link} `} to={'/panelAdmin/products/putProduct/' + el._id}><button className={`${styles.paragraph} ${el.isDeleted ? `${styles.isDeletedButton}` : ''} center`} disabled={el.isDeleted}>Actualizar</button></Link>
                                            </div>

                                            {/* Eliminar permanentemente un producto de la base de datos */}
                                            {showDeleteModal[el._id] && (
                                                <div className={`${styles.modal} centerColumn`}>
                                                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
                                                    <div className={styles.modalButtons}>
                                                        <button onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                        <button onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                {/* Eliminar un producto con borrado lógico de la base de datos */}
                                                {showDeleteTrueLogicalModal[el._id] && (
                                                    <div className={`${styles.modal} centerColumn`}>
                                                        <p>¿Estás seguro de que deseas marcar como Agotado este producto?</p>
                                                        <div className={styles.modalButtons}>
                                                            <button onClick={() => handleConfirmDeleteTrueLogical(el._id)}>Sí</button>
                                                            <button onClick={() => setShowDeleteTrueLogicalModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Retirar un producto eliminado con borrado lógico de la base de datos */}
                                                {showDeleteFalseLogicalModal[el._id] && (
                                                    <div className={`${styles.modal} centerColumn`}>
                                                        <p>¿Estás seguro de que deseas retirar como Agotado este producto?</p>
                                                        <div className={styles.modalButtons}>
                                                            <button onClick={() => handleConfirmDeleteFalseLogical(el._id)}>Sí</button>
                                                            <button onClick={() => setShowDeleteFalseLogicalModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
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
            ))}
        </div>
    );
};
