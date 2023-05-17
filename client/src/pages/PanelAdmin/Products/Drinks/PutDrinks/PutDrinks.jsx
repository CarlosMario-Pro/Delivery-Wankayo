import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putDrinks, getCategories, getIdDrinks } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutDrinks.module.css';

const initialDrinksState = {
    code: '',
    name: '',
    image: '',
    description: '',
    price: '',
    promoPrice: '',
    category: ''
}

export default function PutDrinks () {
    const dispatch = useDispatch();
    const { idDrinks } = useParams();
    
    const [drinks, setDrinks] = useState(initialDrinksState);
    const { categoriesId, drinksDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        drinksDetails: state.drinksDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdDrinks(idDrinks));
    }, [dispatch, idDrinks]);

    useEffect(() => {
        if (drinksDetails) {
            setDrinks(drinksDetails);
        }
    }, [drinksDetails]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDrinks({
            ...drinks,
            [name]: value
        });
    };

    const handleSelectChange = (event) => {
        const selectedCategoryId = event.target.value;
        setDrinks({
            ...drinks,
            category: selectedCategoryId
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const drinksToSend = { ...drinks };
            dispatch(putDrinks(idDrinks, drinksToSend));
            setDrinks(initialDrinksState);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={`${styles.postProducts} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>


            <div className={`${styles.containerProducts} `}>
                <Options />
                <h3>Actualizar Bebida</h3>
                <form className={`${styles.formProducts} `} onSubmit={handleSubmit}>
                    <div className={`${styles.input} `}>
                        <label htmlFor="code">Código:</label>
                        <input type="text" name="code" value={drinks.code} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" name="name" value={drinks.name} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="image">Imagen:</label>
                        <input type="text" name="image" value={drinks.image} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="description">Descripción:</label>
                        <input type="text" name="description" value={drinks.description} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="price">Precio:</label>
                        <input type="number" name="price" value={drinks.price} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="promoPrice">Precio de promoción:</label>
                        <input type="number" name="promoPrice" checked={drinks.promoPrice} onChange={handleInputChange} />
                    </div>
                    <div className={`${styles.input} `}>
                        <label htmlFor="category">Categoría:</label>
                        <select className={`${styles.select__Category} `} name="category" value={drinks.category} onChange={handleSelectChange}>
                            <option value="">Selecciona una categoría</option>
                            {categoriesId.map(category => (
                                <option key={category._id} value={category._id}>{category.category}</option>
                            ))}
                        </select>
                    </div>
                    <button className={`${styles.button__submit} `} type="submit">Actualizar Bebida</button>
                </form>
            </div>
        </div>
    );
};