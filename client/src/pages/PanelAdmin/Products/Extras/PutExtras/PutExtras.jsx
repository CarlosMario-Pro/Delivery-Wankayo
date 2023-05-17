import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putExtras, getCategories, getIdExtras } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutExtras.module.css';

const initialExtrasState = {
    code: '',
    name: '',
    description: '',
    price: '',
    promoPrice: '',
    category: ''
};

export default function PutExtras () {
    const dispatch = useDispatch();
    const { idExtras } = useParams();
    
    const [extras, setExtras] = useState(initialExtrasState);
    const { categoriesId, extrasDetails } = useSelector(state => ({
        categoriesId: state.categoriesId,
        extrasDetails: state.extrasDetails
    }));

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getIdExtras(idExtras));
    }, [dispatch, idExtras]);

    useEffect(() => {
        if (extrasDetails) {
            setExtras(extrasDetails);
        }
    }, [extrasDetails]);

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
            const extrasToSend = { ...extras };
            dispatch(putExtras(idExtras, extrasToSend));
            setExtras(initialExtrasState);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className={`${styles.postProducts} flex`}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
            </div>
            
            <div className={`${styles.containerProducts} `}>
                {/* <CloudinaryAll /> */}
                <Options />
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
                    <button className={`${styles.button__submit} `} type="submit">Actualizar Extra</button>
                </form>
            </div>
        </div>
    );
};