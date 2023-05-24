import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putProduct, getCategories, getIdProduct } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutProduct.module.css';


function validate (product) {
    let errors = {};
    if(!product.code){
        errors.code = "El código de tu producto requerido";
    }
    if(!product.name){
        errors.name = "EL nombre de tu producto es requerido";
    }
    if(!product.pseudoName){
        errors.pseudoName = "El psuedo nombre de tu producto es requerido";
    }
    if(!product.image){
        errors.image = "La imagen de tu producto requerida";
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


export default function PutProducts() {
    const [touched, setTouched] = useState({});
    const [ errors, setErrors ] = useState({});
    const dispatch = useDispatch();
    const { idProduct } = useParams();

    const [product, setProduct] = useState({
        code: '',
        name: '',
        pseudoName: '',
        image: '',
        description: '',
        price: '',
        promoPrice: '',
        category: ''
    });

    const { categoriesId, productDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        productDetails: state.productDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdProduct(idProduct));
    }, [dispatch]);

    useEffect(() => {
        if (productDetails) {
        setProduct(prevProduct => ({
            ...prevProduct,
            ...productDetails
        }));
        }
    }, [productDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
        setErrors(validate({
            ...product,
            [name]: value
        }));
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true
        }));
    };

    function handleSelectChange (event) {
        const selectedCategoryId = event.target.value;
        setProduct(prevProduct => ({
            ...prevProduct,
            category: selectedCategoryId
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(putProduct(idProduct, product));
            setProduct({
                code: '',
                name: '',
                pseudoName: '',
                image: '',
                description: '',
                price: '',
                promoPrice: '',
                category: ''
            });
        } catch (error) {
            console.log(error);
        }
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
                <h1>Actualizar un Producto</h1>
                {product && (
                    <form className={`${styles.form} `} onSubmit={handleSubmit}>
                        <div>
                            <label className={`${styles.label} `} htmlFor="code">Código</label>
                            <input className={`${styles.input} `} type="text" name="code" value={product.code} onChange={handleInputChange} />
                            {touched.code && errors.code && <p className={`${styles.danger} `}>{errors.code}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="name">Nombre</label>
                            <input className={`${styles.input} `} type="text" name="name" value={product.name} onChange={handleInputChange} />
                            {touched.name && errors.name && <p className={`${styles.danger} `}>{errors.name}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="pseudoName">Pseudo Nombre</label>
                            <input className={`${styles.input} `} type="text" name="pseudoName" value={product.pseudoName} onChange={handleInputChange} />
                            {touched.pseudoName && errors.pseudoName && <p className={`${styles.danger} `}>{errors.pseudoName}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="image">Imagen</label>
                            <input className={`${styles.input} `} type="text" name="image" value={product.image} onChange={handleInputChange} />
                            {touched.image && errors.image && <p className={`${styles.danger} `}>{errors.image}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="description">Descripción</label>
                            <input className={`${styles.input} `} type="text" name="description" value={product.description} onChange={handleInputChange} />
                            {touched.description && errors.description && <p className={`${styles.danger} `}>{errors.description}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="price">Precio</label>
                            <input className={`${styles.input} `} type="number" name="price" value={product.price} onChange={handleInputChange} />
                            {touched.price && errors.price && <p className={`${styles.danger} `}>{errors.price}</p>}
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="promoPrice">promoPrice</label>
                            <input className={`${styles.input} `} type="number" name="promoPrice" value={product.promoPrice} onChange={handleInputChange} />
                            {touched.promoPrice && errors.promoPrice && <p className={`${styles.danger} `}>{errors.promoPrice}</p>}
                        </div>
                        <div className={`${styles.select} `}>
                            <label className={`${styles.label} `} htmlFor="category">Category</label>
                            <select className={`${styles.select__Category} `} name="category" value={product.category} onChange={handleSelectChange}>
                                <option value="">Select a category</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                            {touched.category && errors.category && <p className={`${styles.danger} `}>{errors.category}</p>}
                        </div>
                        {   
                            !errors.code && product.code.length > 0 &&
                            !errors.name && product.name.length > 0 &&
                            !errors.pseudoName && product.pseudoName.length > 0 &&
                            !errors.image && product.image.length > 0 &&
                            !errors.description && product.description.length > 0 &&
                            !errors.price && product.price.length > 0 &&
                            !errors.category && product.category.length > 0 ?
                            <button className={`${styles.button} `} type="submit">Actualizar producto</button> : <button className={`${styles.button} `} type="submit">Actualizar producto</button>
                        }
                    </form>
                )}
                </div>
            </div>
        </div>
    );
}