import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccompanyings } from '../../../redux/actions/index';
import styles from './Drinks.module.css';

export default function Drinks() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAccompanyings());
    }, [dispatch]);

    const accompanyings = useSelector(state => state.accompanyings);

    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    //Demás
    const handleIncrement = (id, productType) => {
        let productList;
        if (productType === "drink") {
            productList = drinks;
        } else if (productType === "extra") {
            productList = extras;
        } else if (productType === "accompanying") {
            productList = accompanyings;
        }
        const product = productList.find((item) => item._id === id);
        if (product) {
            const existingProduct = selectedProducts.find((selected) => selected.IdProduct === id);
            if (existingProduct) {
                if (existingProduct.quantity < 50) {
                    existingProduct.quantity++;
                    setSelectedProducts([...selectedProducts]);
                }
            } else if (selectedProducts.length < 50) {
                setSelectedProducts([
                    ...selectedProducts,
                    {
                        nameProduct: product.name,
                        quantity: 1,
                        unitPrice: product.price,
                        price: product.price,
                        IdProduct: product._id,
                    },
                ]);
            }
        }
        const productPrice = product.price || 0;
        setTotalPrice((prevTotal) => prevTotal + productPrice);
    };

    const handleDecrement = (id, productType) => {
        const index = selectedProducts.findIndex((selected) => selected.IdProduct === id);
        if (index !== -1) {
            const updatedProducts = [...selectedProducts];
            if (updatedProducts[index].quantity > 1) {
                updatedProducts[index].quantity--;
                updatedProducts[index].price = updatedProducts[index].unitPrice * updatedProducts[index].quantity;
                const totalPriceChange = -updatedProducts[index].unitPrice;
                setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
            } else {
                const totalPriceChange = -updatedProducts[index].price;
                updatedProducts.splice(index, 1);
                setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
            }
            setSelectedProducts(updatedProducts);
        }
    };


    return (
        <div>
            <div className={styles.options}>
                <div className={styles.option__container}>
                    <div className={styles.accompanyings}>
                        <h3>Escoge tu acompañamiento</h3>
                        {accompanyings?.map((accompanying) => {
                            const selectedAccompanyings = selectedProducts.find((selected) => selected.IdProduct === accompanying._id);
                            const quantity = selectedAccompanyings ? selectedAccompanyings.quantity : 0;
                            const totalPrice = selectedAccompanyings ? selectedAccompanyings.price : 0;
                            return (
                                <div key={accompanying._id} className={`${styles.accompanyings__container}`}>
                                    <div className={styles.text__container}>
                                        <p>{accompanying.name}</p>
                                        <p>S/ {accompanying.price}</p>
                                    </div>
                                    <div className={styles.counter__container}>
                                        <button className={styles.button} onClick={() => handleDecrement(accompanying._id, "accompanying")}>-</button>
                                        <span className={styles.counter}>{quantity}</span>
                                        <button className={styles.button} onClick={() => handleIncrement(accompanying._id, "accompanying")}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>            
                    <div>Total: S/ {totalPrice}</div>                   
                </div>
            </div>
        </div>
    );
}


/*



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrinks, getExtras, getAccompanyings } from '../../../redux/actions/index';
import styles from './Drinks.module.css';

export default function Drinks() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDrinks());
        dispatch(getExtras());
        dispatch(getAccompanyings());
    }, [dispatch]);


    const accompanyings = useSelector(state => state.accompanyings);
    const drinks = useSelector(state => state.drinks);
    const extras = useSelector(state => state.extras);

    const [totalPrice, setTotalPrice] = useState(0);
    console.log('Total ',totalPrice)
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    //Demás
    const handleIncrement = (id, productType) => {
        let productList;
        if (productType === "drink") {
            productList = drinks;
        } else if (productType === "extra") {
            productList = extras;
        } else if (productType === "accompanying") {
            productList = accompanyings;
        }
        const product = productList.find((item) => item._id === id);
        if (product) {
            const existingProduct = selectedProducts.find((selected) => selected.IdProduct === id);
            if (existingProduct) {
                if (existingProduct.quantity < 50) {
                    existingProduct.quantity++;
                    setSelectedProducts([...selectedProducts]);
                }
            } else if (selectedProducts.length < 50) {
                setSelectedProducts([
                    ...selectedProducts,
                    {
                        nameProduct: product.name,
                        quantity: 1,
                        unitPrice: product.price,
                        price: product.price,
                        IdProduct: product._id,
                    },
                ]);
            }
        }
        const productPrice = product.price || 0;
        setTotalPrice((prevTotal) => prevTotal + productPrice);
    };

    const handleDecrement = (id, productType) => {
        const index = selectedProducts.findIndex((selected) => selected.IdProduct === id);
        if (index !== -1) {
            const updatedProducts = [...selectedProducts];
            if (updatedProducts[index].quantity > 1) {
                updatedProducts[index].quantity--;
                updatedProducts[index].price = updatedProducts[index].unitPrice * updatedProducts[index].quantity;
                const totalPriceChange = -updatedProducts[index].unitPrice;
                setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
            } else {
                const totalPriceChange = -updatedProducts[index].price;
                updatedProducts.splice(index, 1);
                setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
            }
            setSelectedProducts(updatedProducts);
        }
    };


    return (
        <div>
            <div className={styles.options}>
                <div className={styles.option__container}>
 

                    <div className={styles.accompanyings}>
                        <h3>Escoge tu acompañamiento</h3>
                        {accompanyings?.map((accompanying) => {
                            const selectedAccompanyings = selectedProducts.find((selected) => selected.IdProduct === accompanying._id);
                            const quantity = selectedAccompanyings ? selectedAccompanyings.quantity : 0;
                            const totalPrice = selectedAccompanyings ? selectedAccompanyings.price : 0;
                            return (
                                <div key={accompanying._id} className={`${styles.accompanyings__container}`}>
                                    <div className={styles.text__container}>
                                        <p>{accompanying.name}</p>
                                        <p>S/ {accompanying.price}</p>
                                    </div>
                                    <div className={styles.counter__container}>
                                        <button className={styles.button} onClick={() => handleDecrement(accompanying._id, "accompanying")}>-</button>
                                        <span className={styles.counter}>{quantity}</span>
                                        <button className={styles.button} onClick={() => handleIncrement(accompanying._id, "accompanying")}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.accompanyings}>
                        <h3>Escoge tu bebida</h3>
                        {drinks?.map((drink) => {
                            const selectedDrink = selectedProducts.find((selected) => selected.IdProduct === drink._id);
                            const quantity = selectedDrink ? selectedDrink.quantity : 0;
                            const totalPrice = selectedDrink ? selectedDrink.price : 0;
                            return (
                                <div key={drink._id} className={`${styles.accompanyings__container}`}>
                                    <div className={styles.text__container}>
                                        <p>{drink.name}</p>
                                        <p>S/ {drink.price}</p>
                                    </div>
                                    <div className={styles.counter__container}>
                                        <button className={styles.button} onClick={() => handleDecrement(drink._id, "drink")}>-</button>
                                        <span className={styles.counter}>{quantity}</span>
                                        <button className={styles.button} onClick={() => handleIncrement(drink._id, "drink")}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            
                    <div className={styles.accompanyings}>
                        <h3>Escoge tu extra</h3>
                        {extras?.map((extra) => {
                            const selectedExtra = selectedProducts.find((selected) => selected.IdProduct === extra._id);
                            const quantity = selectedExtra ? selectedExtra.quantity : 0;
                            const totalPrice = selectedExtra ? selectedExtra.price : 0;
                            return (
                                <div key={extra._id} className={`${styles.accompanyings__container}`}>
                                    <div className={styles.text__container}>
                                        <p>{extra.name}</p>
                                        <p>S/ {extra.price}</p>
                                    </div>
                                    <div className={styles.counter__container}>
                                        <button className={styles.button} onClick={() => handleDecrement(extra._id, "extra")}>-</button>
                                        <span className={styles.counter}>{quantity}</span>
                                        <button className={styles.button} onClick={() => handleIncrement(extra._id, "extra")}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div> 
                    <div>Total: S/ {totalPrice}</div>                   
                </div>
            </div>
        </div>
    );
}



*/