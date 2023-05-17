import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct, getCategories } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import { Link } from "react-router-dom";
import Options from '../../Options/Options';
import CloudinaryAll from './CloudinaryAll/CloudinaryAll';
import styles from './PostProducts.module.css';


export default function PostProducts() {
    const dispatch = useDispatch();
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

    const { categoriesId } = useSelector(state => state);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSelectChange = (event) => {
        const selectedCategoryId = event.target.value;
        setProduct({
            ...product,
            category: selectedCategoryId
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(postProduct(product));
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
                <CloudinaryAll />
                <div className={`${styles.container} `}>
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
                            <input className={`${styles.input} `} type="text" name="code" value={product.code} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="name">Nombre:</label>
                            <input className={`${styles.input} `} type="text" name="name" value={product.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="pseudoName">Pseudo Nombre:</label>
                            <input className={`${styles.input} `} type="text" name="pseudoName" value={product.pseudoName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="image">Imagen:</label>
                            <input className={`${styles.input} `} type="text" name="image" value={product.image} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="description">Descripción:</label>
                            <input className={`${styles.input} `} type="text" name="description" value={product.description} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="price">Precio:</label>
                            <input className={`${styles.input} `} type="number" name="price" value={product.price} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className={`${styles.label} `} htmlFor="promoPrice">Precio de promoción:</label>
                            <input className={`${styles.input} `} type="number" name="promoPrice" checked={product.promoPrice} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.select} `}>
                            <label className={`${styles.label} `} htmlFor="category">Categoría:</label>
                            <select className={`${styles.select__Category} `} name="category" value={product.category} onChange={handleSelectChange}>
                                <option>Selecciona una categoría</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <button className={`${styles.button} `} type="submit">Crear Producto</button>
                    </form>
                    <div className={`${styles.indications} `}>
                        <h3>Indicaciones para subir imágenes</h3>
                        <p>Recuerda que las imágenes una vez redimencianadas, deben de tener 400px de ancho por 235px de alto</p>
                        <p>Primero ingresa a: <Link className={`${styles.link} `} to='https://www.iloveimg.com/es' style={{ textDecoration: 'none' }} target='_blank' rel='noopener noreferrer'>https://www.iloveimg.com/es</Link>.</p>
                        <p>Luego, ingresa al apartado de "Recortar IMAGEN" y escoge la imagen, la proporción es de 1 a 1.7, es decir, la medida del ancho de la imagen es 1.7 veces más grande que la medida del alto.</p>
                        <p>Una vez recortada la imagen, se debe de redimencionar, así que volvemos a la página principal y escogemos el apartado de "Redimencionar IMAGEN".</p>
                        <p>Escogemos la imagen y en sección de medidas, basta con poner una, ponemos el ancho en 400px y el sistema automáticamente realiza la proporción arrojado el valor del alto, es importante que verifiquemos que el ancho y el alto tengan las medidas indicadas para lograr un mejor encuadre de la imagen.</p>
                        <p>Ahora procedemos a subir la imagen a Cloudinary, el link que genera esta plataforma para la imagen, es el que se debe de pegar en el formulario de actualización o creación del producto.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};