import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postExtras, getCategories } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import CloudinaryAll from './CloudinaryAll/CloudinaryAll';
import styles from './PostExtras.module.css';


export default function PostExtras () {
    const dispatch = useDispatch();
    const [extras, setExtras] = useState({
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
        setExtras({
            ...extras,
            [name]: value
        });
    };

    const handleSelectChange = (event) => {
        const selectedCategoryId = event.target.value;
        setExtras({
            ...extras,
            category: selectedCategoryId
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(postExtras(extras));
            setExtras({
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


    return (
        <div className={`${styles.postProducts} flex`}>
            <div className={`${styles.container} flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>

            <div>                
                <Options />
                <CloudinaryAll />
                <div className={`${styles.containerProducts} `}>
                    <p>Revisa el código relacionado a la categoría de productos y la secuencia para poder crear el producto</p>
                    <p>Acompañamientos: AC-90-***</p>
                    <p>Bebidas: BC-60-***</p>
                    <p>Extras: EX-70-***</p>
                    <p>Productos: CP-10-***</p>
                    <p>Salsas: SL-80-***</p>
                    <form className={`${styles.formProducts} `} onSubmit={handleSubmit}>
                        <div className={`${styles.input} `}>
                            <label htmlFor="code">Código:</label>
                            <input type="text" name="code" value={extras.code} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" name="name" value={extras.name} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label htmlFor="description">Descripción:</label>
                            <input type="text" name="description" value={extras.description} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label htmlFor="price">Precio:</label>
                            <input type="number" name="price" value={extras.price} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label htmlFor="promoPrice">Precio de promoción:</label>
                            <input type="number" name="promoPrice" checked={extras.promoPrice} onChange={handleInputChange} />
                        </div>
                        <div className={`${styles.input} `}>
                            <label htmlFor="category">Categoría:</label>
                            <select className={`${styles.select__Category} `} name="category" value={extras.category} onChange={handleSelectChange}>
                                <option value="">Selecciona una categoría</option>
                                {categoriesId.map(category => (
                                    <option key={category._id} value={category._id}>{category.category}</option>
                                ))}
                            </select>
                        </div>
                        <button className={`${styles.button__submit} `} type="submit">Crear Extras</button>
                    </form>
                </div>
            </div>
        </div>
    );
};