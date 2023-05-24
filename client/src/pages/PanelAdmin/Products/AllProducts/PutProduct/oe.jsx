import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putProduct, getCategories, getIdProduct } from '../../../../../redux/actions/index';
import PanelAdmin from '../../../PanelAdmin';
import Options from '../../Options/Options';
import styles from './PutProduct.module.css';

const initialProductState = {
  code: '',
  name: '',
  pseudoName: '',
  image: '',
  description: '',
  price: '',
  promoPrice: '',
  category: ''
};

export default function PutProducts() {
  const dispatch = useDispatch();
  const { idProduct } = useParams();

  const [product, setProduct] = useState(initialProductState);
  const { categoriesId, productDetails } = useSelector(state => ({
    categoriesId: state.categoriesId,
    productDetails: state.productDetails
  }));

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIdProduct(idProduct));
  }, [dispatch, idProduct]);

  useEffect(() => {
    if (productDetails) {
      setProduct(prevProduct => ({
        ...prevProduct,
        ...productDetails
      }));
    }
  }, [productDetails]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSelectChange = (event) => {
    const selectedCategoryId = event.target.value;
    setProduct(prevProduct => ({
      ...prevProduct,
      category: selectedCategoryId
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const productToSend = { ...product };
      dispatch(putProduct(idProduct, productToSend));
      setProduct(initialProductState);
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
                <label className={`${styles.label} `} htmlFor="code">Código:</label>
                <input className={`${styles.input} `} type="text" name="code" value={product.code || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="name">Nombre:</label>
                <input className={`${styles.input} `} type="text" name="name" value={product.name || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="pseudoName">Pseudo Nombre:</label>
                <input className={`${styles.input} `} type="text" name="pseudoName" value={product.pseudoName || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="image">Imagen:</label>
                <input className={`${styles.input} `} type="text" name="image" value={product.image || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="description">Descripción:</label>
                <input className={`${styles.input} `} type="text" name="description" value={product.description || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="price">Precio:</label>
                <input className={`${styles.input} `} type="number" name="price" value={product.price || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label className={`${styles.label} `} htmlFor="promoPrice">promoPrice:</label>
                <input className={`${styles.input} `} type="number" name="promoPrice" value={product.promoPrice || ''} onChange={handleInputChange} />
              </div>
              <div className={`${styles.select} `}>
                <label className={`${styles.label} `} htmlFor="category">Category:</label>
                <select className={`${styles.select__Category} `} name="category" value={product.category || ''} onChange={handleSelectChange}>
                  <option value="">Select a category</option>
                  {categoriesId.map(category => (
                    <option key={category._id} value={category._id}>{category.category}</option>
                  ))}
                </select>
              </div>
              <button className={`${styles.button} `} type="submit">Actualizar producto</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
                  }