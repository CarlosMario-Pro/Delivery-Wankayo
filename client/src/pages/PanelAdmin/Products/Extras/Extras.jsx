import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExtras, deleteExtras } from '../../../../redux/actions/index';
import { Link } from 'react-router-dom';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';

import styles from './Extras.module.css';


export default function Extras () {
    const dispatch = useDispatch();
    const extras = useSelector(state => state.extras);
    const { userInfoLogin: session } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getExtras());
    }, [dispatch]);

    //Elimanar el proucto
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idExtras) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idExtras]: true,
        }));
    };

    const handleConfirmDelete = (idExtras) => {
        dispatch(deleteExtras(idExtras, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idExtras]: false,
        }));
    };
    

    return (
        <div className={`${styles.accompanyings} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div>
                <Options />              
                <div className={`${styles.containerAccompanyings}   `}>
                    <div className={` flex jcspaceBetween`}>
                        <Link className={`${styles.link}  `} to='/panelAdmin/products/extras'><p className={`${styles.paragraph} center`}>Todos los extras</p></Link>
                        <Link className={`${styles.link}  `} to='/panelAdmin/products/extras/postExtras'><p className={`${styles.paragraph} center`}>Crear Extra</p></Link>
                    </div>
                    <h1>Extras</h1>

                    <div className={`${styles.container} `}>
                        {extras?.map((el) => {
                            return (
                                <div key={ el._id }>
                                    <div className={`${styles.text__container} `}>
                                        <div className={`${styles.container_Image} `}>
                                            <img className={`${styles.image} `} src={ el.image } alt="Imagen" />
                                        </div>
                                        <div className={`${styles.fff} `}>
                                            <div className={`${styles.buttons} flex `}>
                                                <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(el._id)}>Eliminar</button>
                                                <Link className={`${styles.link} `} to={'/panelAdmin/products/extras/putExtras/' + el._id}  ><button className={`${styles.paragraph} center`}>Actualizar</button></Link>
                                            </div>
                                            {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                            {showDeleteModal[el._id] && (
                                                <div className={`${styles.modal} centerColumn`}>
                                                    <p>¿Estás seguro de que deseas eliminar este producto?</p>
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