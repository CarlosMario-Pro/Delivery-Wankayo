import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './Categories.module.css';


export default function Categories () {
    const dispatch = useDispatch();
    const { categoriesId } = useSelector(state => state);
    const { userInfoLogin: session } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    //Elimanar el proucto
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idCategory) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idCategory]: true,
        }));
    };

    const handleConfirmDelete = (idCategory) => {
        dispatch(deleteCategory(idCategory, session));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idCategory]: false,
        }));
    };

    
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');
    const isCategoryActive = () => {
        return location.pathname.startsWith('/panelAdmin/products/categories');
    };

    const isActive = (path) => {
        return location.pathname === path ? `${styles.active}` : '';
    };
    
    const handleLinkClick = (section) => {
        setActiveSection(section);
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
                <div className={`${styles.container}   `}>
                    <div className={` flex jcspaceBetween`}>
                        <Link className={`${styles.options} ${isActive('/panelAdmin/products/categories')} ${isCategoryActive('/panelAdmin/products/categories') ? styles.active : ''}`} to='/panelAdmin/products/categories'><p className={`${styles.paragraph} center`}>Categorías</p></Link>
                        <Link className={`${styles.options} ${isActive('/panelAdmin/products/categories/postCategories')}`} to='/panelAdmin/products/categories/postCategories'><p className={`${styles.paragraph} center`}>Crear Categoría</p></Link>
                    </div>
                    <h1>Categorías</h1>
                    <div>
                        {categoriesId.map(el => (
                            <div className={`${styles.all} `} key={el._id}>
                                <p>{el.category}</p>
                                <div className={`${styles.container__buttons} `}>
                                    <button className={`${styles.buttonDelete} `} onClick={() => handleShowDeleteModal(el._id)}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                    <Link className={`${styles.link} `} to={'/panelAdmin/products/categories/putCategory/' + el._id }><button className={`${styles.buttonUpdate} center`}>Actualizar</button></Link>
                                </div>
                                
                                {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                {showDeleteModal[el._id] && (
                                    <div className={`${styles.modal} centerColumn`}>
                                        <p>¿Eliminar esta categoría?</p>
                                        <div>
                                            <button className={`${styles.approve} `} onClick={() => handleConfirmDelete(el._id)}>Sí</button>
                                            <button className={`${styles.disapprove} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [el._id]: false }))}>No</button>
                                        </div>
                                    </div>
                                )}                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};