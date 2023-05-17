import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategory } from '../../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PostCategories.module.css';


export default function PostCategory () {
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        category: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({
            ...category,
            [name]: value 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (category.category.trim() !== '') { // Validar que el campo no esté vacío
            try {
                dispatch(postCategory(category));
                setCategory({
                    category: ''
                });
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    const location = useLocation();    
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
                        <Link className={`${styles.link} ${isActive('/panelAdmin/products/categories')} `} to='/panelAdmin/products/categories'><p className={`${styles.paragraph} center`}>Categorías</p></Link>
                        <Link className={`${styles.link}  ${isActive('/panelAdmin/products/categories/postCategories')}`} to='/panelAdmin/products/categories/postCategories'><p className={`${styles.paragraph} center`}>Crear Categoría</p></Link>
                    </div>
                    <h1>Crear categorías</h1>
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="category">Nueva categoría:</label>
                            <input className={`${styles.input} `} type="text" name="category" value={category.category} onChange={handleInputChange} />
                        </div>
                        <button className={`${styles.button} `} type="submit">Crear Categoría</button>
                    </form>
                </div>
            </div>
        </div>
    );
};