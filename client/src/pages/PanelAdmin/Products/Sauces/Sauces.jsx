import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSauces, deleteSauces } from '../../../../redux/actions/index';
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};