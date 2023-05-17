import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrinks, deleteDrinks } from '../../../../redux/actions/index';
import { Link } from 'react-router-dom';
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




    //Elimanar el proucto
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
                            <div key={ el._id }>
                                <div className={`${styles.text__container} `}>
                                    <div className={`${styles.container_Image} `}>
                                        <img className={`${styles.image} `} src={ el.image } alt="Imagen" />
                                    </div>
                                    <div className={`${styles.fff} `}>
                                        <div className={`${styles.buttons} flex `}>
                                            <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(el._id)}>Eliminar</button>
                                            <Link className={`${styles.link} `} to={'/panelAdmin/products/drinks/putDrinks/' + el._id}  ><button className={`${styles.paragraph} center`}>Actualizar</button></Link>
                                        </div>
                                        {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                        {showDeleteModal[el._id] && (
                                            <div className={`${styles.modal} centerColumn`}>
                                                <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
                                                <div className={styles.modalButtons}>
                                                    <button className={`${styles.button} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                    <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <h4>{ el.name }</h4>
                                    <p>{ el.description }</p>                              
                                    <div className={` flex`}>
                                            <h4 className={el.promoPrice ? styles.strikethrough : ''}>
                                                Precio: S/ {el.price.toFixed(2)}
                                            </h4>
                                            {el.promoPrice ? <h4>Nuevo Precio: S/ {el.promoPrice.toFixed(2)}</h4> : ''}
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