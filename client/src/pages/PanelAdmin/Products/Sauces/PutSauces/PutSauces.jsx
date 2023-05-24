import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putSauces, getCategories, getIdSauces } from '../../../../../redux/actions/index';
import { Link, useLocation } from 'react-router-dom';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutSauces.module.css';

const initialSaucesState = {
    code: '',
    name: '',
    category: ''
}

function validate (product) {
    let errors = {};
    if(!product.code){
        errors.code = "El código de tu producto requerido";
    }
    if(!product.name){
        errors.name = "EL nombre de tu producto es requerido";
    }
    if(!product.category){
        errors.category = "La categoría de tu producto es requerida";
    }
    return errors;
};

export default function PutSauces () {
    const [touched, setTouched] = useState({});
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const { idSauces } = useParams();
  
    const [sauces, setSauces] = useState({
        code: '',
        name: '',
        category: ''
    });
    const { categoriesId, saucesDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        saucesDetails: state.saucesDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdSauces(idSauces));
    }, [dispatch]);

    useEffect(() => {
        if (saucesDetails) {
        setSauces(prevSauces => ({
            ...prevSauces,
            ...saucesDetails
        }));
        }
    }, [saucesDetails]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSauces((prevSauces) => ({
            ...prevSauces,
            [name]: value
        }));
        setErrors(validate({
            ...sauces,
            [name]: value
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true
        }));
    };



    function handleSelectChange (event) {
        const selectedCategoryId = event.target.value;
        setSauces(prevSauces => ({
            ...prevSauces,
            category: selectedCategoryId
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(putSauces(idSauces, sauces));
            setSauces({
                code: '',
                name: '',
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
                        <Link className={`${styles.link} ${isActive('/panelAdmin/products/sauces')} `} to='/panelAdmin/products/sauces'><p className={`${styles.paragraph} center`}>Salsas</p></Link>
                        <Link className={`${styles.link}  ${isActive('/panelAdmin/products/sauces/postSauces')}`} to='/panelAdmin/products/sauces/postSauces'><p className={`${styles.paragraph} center`}>Crear Salsas</p></Link>
                    </div>
                    <h1>Actualizar Salsa</h1>
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="code">Código:</label>
                            <input className={`${styles.input} `} type="text" name="code" value={sauces.code} onChange={handleInputChange} />
                            {touched.code && errors.code && <p className={`${styles.danger} `}>{errors.code}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="name">Nombre:</label>
                            <input className={`${styles.input} `} type="text" name="name" value={sauces.name} onChange={handleInputChange} />
                            {touched.name && errors.name && <p className={`${styles.danger} `}>{errors.name}</p>}
                        </div>
                        <div  className={`${styles.select} `}>
                            <label className={`${styles.label} `} htmlFor="category">Categoría:</label>
                            <select className={`${styles.select__Category} `} name="category" value={sauces.category} onChange={handleSelectChange}>
                                <option value="">Selecciona una categoría</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                            {touched.category && errors.category && <p className={`${styles.danger} `}>{errors.category}</p>}
                        </div>
                        {   
                            !errors.code && sauces.code.length > 0 &&
                            !errors.name && sauces.name.length > 0 &&
                            !errors.category && sauces.category.length > 0 ?
                            <button className={`${styles.button} `} type="submit">Actualizar Salsa</button> : <button className={`${styles.button} `} type="submit">Actualizar Salsa</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};