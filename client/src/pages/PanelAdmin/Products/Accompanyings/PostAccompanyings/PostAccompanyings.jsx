import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAccompanyings, getCategories } from '../../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
// import { Link } from "react-router-dom";
import styles from './PostAccompanyings.module.css';


export default function PostAccompanyings() {
    const dispatch = useDispatch();
    const [accompanyings, setAccompanyings] = useState({
        code: '',
        name: '',
        description: '',
        price: '',
        promoPrice: '',
        category: ''
    });
    
    const { categoriesId } = useSelector(state => state);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccompanyings({
            ...accompanyings,
            [name]: value
        });
    };

    const handleSelectChange = (event) => {
        const selectedCategoryId = event.target.value;
        setAccompanyings({
            ...accompanyings,
            category: selectedCategoryId
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(postAccompanyings(accompanyings));
            setAccompanyings({
                code: '',
                name: '',
                description: '',
                price: '',
                promoPrice: '',
                category: ''
            });
        } catch (error) {
            console.log(error);
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
                        <Link className={`${styles.link} ${isActive('/panelAdmin/products/accompanyings')} `} to='/panelAdmin/products/accompanyings'><p className={`${styles.paragraph} center`}>Acompañamientos</p></Link>
                        <Link className={`${styles.link}  ${isActive('/panelAdmin/products/accompanyings/postAccompanyings')}`} to='/panelAdmin/products/accompanyings/postAccompanyings'><p className={`${styles.paragraph} center`}>Crear Acompañamiento</p></Link>
                    </div>
                    <h1>Crear Acompañamiento</h1>
                    <div className={`${styles.indications} `}>
                        <p>Revisa el código relacionado a la categoría de productos y la secuencia para poder crear el producto</p>
                        <p>Acompañamientos: AC-90-***</p>
                        <p>Bebidas: BC-60-***</p>
                        <p>Extras: EX-70-***</p>
                        <p>Productos: CP-10-***</p>
                        <p>Salsas: SL-80-***</p>
                    </div>
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="code">Código:</label>
                            <input className={`${styles.input} `} type="text" name="code" value={accompanyings.code} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="name">Nombre:</label>
                            <input className={`${styles.input} `} type="text" name="name" value={accompanyings.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="description">Descripción:</label>
                            <input className={`${styles.input} `} type="text" name="description" value={accompanyings.description} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="price">Precio:</label>
                            <input className={`${styles.input} `} type="number" name="price" value={accompanyings.price} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="promoPrice">Precio de promoción:</label>
                            <input className={`${styles.input} `} type="number" name="promoPrice" value={accompanyings.promoPrice} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.select} `}>
                            <label className={`${styles.label} `} htmlFor="category">Categoría:</label>
                            <select className={`${styles.select__Category} `} name="category" value={accompanyings.category} onChange={handleSelectChange}>
                                <option value="">Selecciona categoría</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <button className={`${styles.button} `} type="submit">Crear Acompañamiento</button>
                    </form>
                </div>
            </div>
        </div>
    );
};