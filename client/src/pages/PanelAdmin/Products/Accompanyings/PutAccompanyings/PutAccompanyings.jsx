import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putAccompanyings, getCategories, getIdAccompanyings } from '../../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutAccompanyings.module.css';

const initialAccompanyingsState = {
    code: '',
    name: '',
    description: '',
    price: '',
    promoPrice: '',
    category: ''
};

export default function PutAccompanyings() {
    const dispatch = useDispatch();
    const { idAccompanyings } = useParams();
    
    const [accompanyings, setAccompanyings] = useState(initialAccompanyingsState);
    const { categoriesId, accompanyingsDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        accompanyingsDetails: state.accompanyingsDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdAccompanyings(idAccompanyings));
    }, [dispatch, idAccompanyings]);

    useEffect(() => {
        if (accompanyingsDetails) {
            setAccompanyings(accompanyingsDetails);
        }
    }, [accompanyingsDetails]);

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
            const accompanyingsToSend = { ...accompanyings };
            dispatch(putAccompanyings(idAccompanyings, accompanyingsToSend));
            setAccompanyings(initialAccompanyingsState);
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
                    <h1>Actualizar Acompañamiento</h1>
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
                                <option value="">Select a category</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <button className={`${styles.button} `} type="submit">Actualizar Acompañamiento</button>
                    </form>
                </div>
            </div>
        </div>
    );
};