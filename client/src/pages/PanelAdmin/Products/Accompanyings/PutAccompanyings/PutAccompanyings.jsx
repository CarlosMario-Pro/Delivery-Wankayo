import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putAccompanyings, getCategories, getIdAccompanyings } from '../../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutAccompanyings.module.css';


function validate (product) {
    let errors = {};
    if(!product.code){
        errors.code = "El código de tu producto requerido";
    }
    if(!product.name){
        errors.name = "EL nombre de tu producto es requerido";
    }
    if(!product.description){
        errors.description = "La descripci+on de tu producto es requerida";
    }
    if(!product.price){
        errors.price = "El precio de tu producto es requerido";
    } else if (!/^[0-9]+(\.[0-9]+)?$/.test(product.price)) {
        errors.price = "El precio de tu producto es requerido";
    }
    if(!product.category){
        errors.category = "La categoría de tu producto es requerida";
    }
    return errors;
};


export default function PutAccompanyings() {
    const [touched, setTouched] = useState({});
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const { idAccompanyings } = useParams();
    
    const [accompanyings, setAccompanyings] = useState({
        code: '',
        name: '',
        description: '',
        price: '',
        promoPrice: '',
        category: ''
    });

    const { categoriesId, accompanyingsDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        accompanyingsDetails: state.accompanyingsDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdAccompanyings(idAccompanyings));
    }, [dispatch]);


    useEffect(() => {
        if (accompanyingsDetails) {
        setAccompanyings(prevAccompanyings => ({
            ...prevAccompanyings,
            ...accompanyingsDetails
        }));
        }
    }, [accompanyingsDetails]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccompanyings((prevAccompanyings) => ({
            ...prevAccompanyings,
            [name]: value
        }));
        setErrors(validate({
            ...accompanyings,
            [name]: value
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true
        }));
    };

    function handleSelectChange (event) {
        const selectedCategoryId = event.target.value;
        setAccompanyings(prevAccompanyings => ({
            ...prevAccompanyings,
            category: selectedCategoryId
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(putAccompanyings(idAccompanyings, accompanyings));
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
                    <h1>Actualizar Acompañamiento</h1>
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="code">Código:</label>
                            <input className={`${styles.input} `} type="text" name="code" value={accompanyings.code} onChange={handleInputChange} />
                            {touched.code && errors.code && <p className={`${styles.danger} `}>{errors.code}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="name">Nombre:</label>
                            <input className={`${styles.input} `} type="text" name="name" value={accompanyings.name} onChange={handleInputChange} />
                            {touched.name && errors.name && <p className={`${styles.danger} `}>{errors.name}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="description">Descripción:</label>
                            <input className={`${styles.input} `} type="text" name="description" value={accompanyings.description} onChange={handleInputChange} />
                            {touched.description && errors.description && <p className={`${styles.danger} `}>{errors.description}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="price">Precio:</label>
                            <input className={`${styles.input} `} type="number" name="price" value={accompanyings.price} onChange={handleInputChange} />
                            {touched.price && errors.price && <p className={`${styles.danger} `}>{errors.price}</p>}
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
                            {touched.category && errors.category && <p className={`${styles.danger} `}>{errors.category}</p>}
                        </div>
                        {   
                            !errors.code && accompanyings.code.length > 0 &&
                            !errors.name && accompanyings.name.length > 0 &&
                            !errors.description && accompanyings.description.length > 0 &&
                            !errors.price && accompanyings.price.length > 0 &&
                            !errors.category && accompanyings.category.length > 0 ?
                            <button className={`${styles.button} `} type="submit">Actualizar Acompañamiento</button> : <button className={`${styles.button} `} type="submit">Actualizar Acompañamiento</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};