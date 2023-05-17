import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccompanyings, deleteAccompanyings } from '../../../../redux/actions/index';
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
                                <div className={`${styles.all} `} key={ el._id }>
                                    <div>
                                        <h4>{el.name}</h4>
                                        <p>{el.description}</p>
                                        <div className={` flex`}>
                                            <h4 className={el.promoPrice ? styles.strikethrough : ''}>Precio { el.price } Soles</h4>
                                        </div>
                                        {el.promoPrice ? <h4>S/ { el.promoPrice }</h4> : ''}
                                    </div>
                                    <div className={`${styles.container__buttons} flex `}>
                                        <button className={`${styles.buttonDelete} `} onClick={() => handleShowDeleteModal(el._id)}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                        <Link className={`${styles.link} `} to={'/panelAdmin/products/accompanyings/putAccompanyings/' + el._id}  ><button className={`${styles.buttonUpdate} center`}>Actualizar</button></Link>
                                    </div>
                                    {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                    {showDeleteModal[el._id] && (
                                        <div className={`${styles.modal} centerColumn`}>
                                            <p>¿Deseas eliminar esta categoría?</p>
                                            <div>
                                                <button className={`${styles.approve} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                                <button className={`${styles.disapprove} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
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