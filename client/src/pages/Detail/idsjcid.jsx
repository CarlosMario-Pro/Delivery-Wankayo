import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyingsLogical, getDrinksLogical, getExtrasLogical, getSaucesLogical, selectProducts, postOrders } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();

    const userInfoLogin = useSelector(state => state.userInfoLogin);
    const productDetails = useSelector(state => state.productDetails);
    const accompanyingsLogical = useSelector(state => state.accompanyingsLogical);
    const drinksLogical = useSelector(state => state.drinksLogical);
    const extrasLogical = useSelector(state => state.extrasLogical);
    const saucesLogical = useSelector(state => state.saucesLogical);

    const idUser = userInfoLogin.id;

    const [count, setCount] = useState(1);
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);

    // Calcular el precio del producto principal
    const [selectedSauces, setSelectedSauces] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({
        user: idUser,
        address: "646c2bbf498adcf26c6d8877",
        comment: "Yo lo recojo en tienda",
        products: [],
        total: 0,
    });
    console.log(selectedProducts)

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getAccompanyingsLogical());
        dispatch(getDrinksLogical());
        dispatch(getExtrasLogical());
        dispatch(getSaucesLogical());
    }, [dispatch]);

    // Actualizar selectedProducts cuando el valor de totalPrice cambie
    useEffect(() => {
        setSelectedProducts(prevState => ({
            ...prevState,
            total: totalPrice,
        }));
    }, [totalPrice]);

    useEffect(() => {
        setTotalPricePPal(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);

    useEffect(() => {
        if (productDetails) {
            const mainProduct = {
                nameProduct: productDetails.name,
                quantity: count,
                unitPrice: productDetails.promoPrice ? productDetails.promoPrice : productDetails.price,
                price: count * (productDetails.promoPrice || productDetails.price),
                IdProduct: productDetails._id,
            };
            setSelectedProducts((prevState) => {
                const updatedProducts = { ...prevState };
                updatedProducts.products[0] = mainProduct;
                return updatedProducts;
            });
        }
    }, [productDetails, count]);
      
    useEffect(() => {
        const updatedTotalPrice = selectedProducts.products.reduce((acc, product) => acc + product.price, 0);
        setTotalPrice(updatedTotalPrice);
    }, [selectedProducts]);

    const handleIncrementSauces = (id) => {
        const sauce = saucesLogical.find((sauce) => sauce._id === id);
        if (sauce) {
            const existingSauce = selectedSauces.find((sauce) => sauce.IdProduct === id);
            const totalQuantity = selectedSauces.reduce((acc, sauce) => acc + sauce.quantity, 0);
        
            if (totalQuantity < 3) {
                if (existingSauce) {
                if (existingSauce.quantity < 3) {
                    setSelectedSauces((prevSauces) => {
                        const updatedSauces = prevSauces.map((sauce) => {
                            if (sauce.IdProduct === id) {
                                return {
                                    ...sauce,
                                    quantity: sauce.quantity + 1,
                                };
                            }
                            return sauce;
                        });
                        return updatedSauces;
                    });
                    setSelectedProducts((prevSelectedProducts) => {
                        const updatedProducts = { ...prevSelectedProducts };
                        const sauces = [...prevSelectedProducts.products];
                        const existingProductIndex = sauces.findIndex((sauce) => sauce.IdProduct === id);
                        if (existingProductIndex !== -1) {
                            sauces[existingProductIndex] = {
                                ...sauces[existingProductIndex],
                                quantity: sauces[existingProductIndex].quantity + 1,
                            };
                        }
                        updatedProducts.products = sauces;
                        return updatedProducts;
                    });
                }
                } else {
                    const newSauce = {
                        nameProduct: sauce.name,
                        quantity: 1,
                        unitPrice: 0,
                        price: 0,
                        IdProduct: sauce._id,
                    };
                    setSelectedSauces((prevSauces) => [...prevSauces, newSauce]);
                    setSelectedProducts((prevSelectedProducts) => {
                        const updatedProducts = { ...prevSelectedProducts };
                        const sauces = [...prevSelectedProducts.products, newSauce];
                        updatedProducts.products = sauces;
                        return updatedProducts;
                    });
                }
            }
        }
    };

    const handleDecrementSauces = (id) => {
        setSelectedSauces((prevSauces) => {
            const updatedSauces = prevSauces.map((sauce) => {
                if (sauce.IdProduct === id && sauce.quantity > 0) {
                    return {
                        ...sauce,
                        quantity: sauce.quantity - 1,
                    };
                }
                return sauce;
            });
            return updatedSauces.filter((sauce) => sauce.quantity > 0);
        });
      
        setSelectedProducts((prevSelectedProducts) => {
            const updatedProducts = { ...prevSelectedProducts };
            const sauces = [...prevSelectedProducts.products];
            const index = sauces.findIndex((sauce) => sauce.IdProduct === id);
            if (index !== -1) {
                if (sauces[index].quantity === 1) {
                    sauces.splice(index, 1);
                } else {
                    sauces[index] = { ...sauces[index], quantity: sauces[index].quantity - 1 };
                }
            }
            updatedProducts.products = sauces;
            return updatedProducts;
        });
    };


    // Demás
    const handleIncrement = (id, productType) => {
        let productList;
        if (productType === "drink") {
            productList = drinksLogical;
        } else if (productType === "extra") {
            productList = extrasLogical;
        } else if (productType === "accompanying") {
            productList = accompanyingsLogical;
        }
        const product = productList.find((item) => item._id === id);
        if (product) {
            setSelectedProducts((prevSelectedProducts) => {
                const existingProductIndex = prevSelectedProducts.products.findIndex((selected) => selected.IdProduct === id);
                if (existingProductIndex !== -1) {
                    const updatedProducts = [...prevSelectedProducts.products];
                    updatedProducts[existingProductIndex].quantity++;
                    updatedProducts[existingProductIndex].price = updatedProducts[existingProductIndex].unitPrice * updatedProducts[existingProductIndex].quantity;
                    return {
                        ...prevSelectedProducts,
                        products: updatedProducts,
                    };
                } else {
                    const newProduct = {
                        nameProduct: product.name,
                        quantity: 1,
                        unitPrice: product.price,
                        price: product.price,
                        IdProduct: product._id,
                    };            
                    return {
                        ...prevSelectedProducts,
                        products: [...prevSelectedProducts.products, newProduct],
                    };
                }
            });      
            setTotalPrice((prevTotal) => prevTotal + product.price);
        }
    };

    const handleDecrement = (id) => {
        setSelectedProducts((prevSelectedProducts) => {
            const productIndex = prevSelectedProducts.products.findIndex((selected) => selected.IdProduct === id);
            if (productIndex !== -1) {
                const updatedProducts = [...prevSelectedProducts.products];
                if (updatedProducts[productIndex].quantity > 1) {
                    updatedProducts[productIndex].quantity--;
                    updatedProducts[productIndex].price = updatedProducts[productIndex].unitPrice * updatedProducts[productIndex].quantity;
                    setTotalPrice((prevTotal) => prevTotal - updatedProducts[productIndex].unitPrice);            
                    return {
                        ...prevSelectedProducts,
                        products: updatedProducts,
                    };
                } else {
                    const totalPriceChange = -updatedProducts[productIndex].price;
                    updatedProducts.splice(productIndex, 1);            
                    setTotalPrice((prevTotal) => prevTotal + totalPriceChange);            
                    return {
                        ...prevSelectedProducts,
                        products: updatedProducts,
                    };
                }
            }
            return prevSelectedProducts;
        });
    };

    function handleSubmit() {
        dispatch(postOrders(idUser, selectedProducts));
    }


    return (
        <div>
            <div className={`${styles.detail} `}>
                <h1>{ productDetails.name }</h1>
                <div className={`${styles.container} `}>
                    <div className={`${styles.product} `}>
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ productDetails.image } />
                                {productDetails.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ productDetails.name }</h3>                                            
                                    <div className={` flex`}>
                                        <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                                        {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                                    </div>

                                    <div className={`${styles.timeShipment} `}>
                                        <div className={`${styles.time} displayFlex`}>
                                            <MdAccessTime className={`${styles.icon} `}/>
                                            <p>30 - 45 min</p>
                                        </div>
                                        <div className={`${styles.shipment} displayFlex`}>
                                            <MdOutlineDeliveryDining className={`${styles.icon} `}/>
                                            <p>Envío gratis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={`${styles.description} `}>{ productDetails.description }</p>
                        </div>

                        <div className={`${styles.totals__container} `}>
                            <div className={`${styles.counterController} center`}>
                                <button className={`${styles.buttonController} `} onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                <span>{count}</span>
                                <button className={`${styles.buttonController} `} onClick={() => setCount(count + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            {productDetails.promoPrice ? <h4>Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            <h3 className={`${styles.text__price} `}>{(((productDetails.promoPrice * -100) / productDetails.price) + 100)}% de descuento</h3>
                        </div>

                        <div className={`${styles.options} `}>
                            <div className={`${styles.option__container} `}>
                                <h3>Escoge máximo tres unidades de tus salsas favoritas</h3>
                                <div className={`${styles.products} `}>
                                    {saucesLogical?.map((el) => {
                                        const isDisabled = selectedSauces.length === 3 && !selectedSauces.find(sauce => sauce.IdProduct === el._id);
                                        const sauceClassName = selectedSauces.length === 3 ? styles.disabledSauce : "";
                                        const sauce = selectedSauces.find(sauce => sauce.IdProduct === el._id);
                                        const quantity = sauce ? sauce.quantity : 0;
                                        return (
                                            <div key={el._id} className={`${styles.unit__container} ${sauceClassName}`}>
                                                <div className={`${styles.text__container} `}>
                                                    <p>{el.name}</p>
                                                    <h4 className={`${styles.sauce__free} `}>Gratis</h4>
                                                </div>
                                                <div className={`${styles.counter__container} `}>
                                                    <button className={`${styles.button} `} onClick={() => handleDecrementSauces(el._id)} disabled={quantity === 0}>-</button>
                                                    <span className={`${styles.counter} `}>{quantity} </span>
                                                    <button className={`${styles.button} `} onClick={() => handleIncrementSauces(el._id)} disabled={isDisabled}>+</button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className={`${styles.option__container} `}>
                                <h3>Escoge tu acompañamiento</h3>
                                <div className={styles.products}>
                                    {accompanyingsLogical?.map((accompanying) => {
                                        const selectedAccompanyings = selectedProducts.products.find((selected) => selected.IdProduct === accompanying._id);
                                        const quantity = selectedAccompanyings ? selectedAccompanyings.quantity : 0;
                                        const totalPrice = selectedAccompanyings ? selectedAccompanyings.price : 0;
                                        return (
                                            <div key={accompanying._id} className={`${styles.unit__container}`}>
                                                <div className={styles.text__container}>
                                                    <p>{accompanying.name}</p>
                                                    <h4 className={`${styles.text__price} `}>S/ {accompanying.price}</h4>
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
                            </div>

                            <div className={`${styles.option__container} `}>
                                <h3>Escoge tu Extra</h3>
                                <div className={`${styles.products} `}>
                                    {extrasLogical?.map((extra) => {
                                        const selectedExtras = selectedProducts.products.find((selected) => selected.IdProduct === extra._id);
                                        const quantity = selectedExtras ? selectedExtras.quantity : 0;
                                        const totalPrice = selectedExtras ? selectedExtras.price : 0;
                                        return (
                                            <div key={extra._id} className={`${styles.unit__container}`}>
                                                <div className={styles.text__container}>
                                                    <p>{extra.name}</p>
                                                    <h4 className={`${styles.text__price} `}>S/ {extra.price}</h4>
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
                            </div> 

                            <div className={`${styles.option__container} `}>
                                <h3>Escoge tu Bebida</h3>
                                <div className={`${styles.products} `}>
                                    {drinksLogical?.map((drink) => {
                                        const selectedDrinks = selectedProducts.products.find((selected) => selected.IdProduct === drink._id);
                                        const quantity = selectedDrinks ? selectedDrinks.quantity : 0;
                                        const totalPrice = selectedDrinks ? selectedDrinks.price : 0;
                                        return (
                                            <div key={drink._id} className={`${styles.unit__container}`}>
                                                <div className={styles.text__container}>
                                                    <p>{drink.name}</p>
                                                    <h4 className={`${styles.text__price} `}>S/ {drink.price}</h4>
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
                            </div>
                        </div>
                        <button  className={`${styles.totals} center`} onClick={handleSubmit} disabled={selectedProducts.length === 0}>Agregar e ir a pagar: S/ {totalPrice}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};




/*

!VERSION 1
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyings } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getAccompanyings());
    }, [dispatch]);

    useEffect(() => {
        setTotalPricePPal(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);

    //Calcular el precio del producto principal
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);
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
            <div className={`${styles.detail} `}>
                <h1>{ productDetails.name }</h1>
                <div className={`${styles.container} `}>
                    <div className={`${styles.product} `}>
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ productDetails.image } />
                                {productDetails.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ productDetails.name }</h3>                                            
                                    <div className={` flex`}>
                                        <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                                        {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                                    </div>

                                    <div className={`${styles.timeShipment} `}>
                                        <div className={`${styles.time} displayFlex`}>
                                            <MdAccessTime className={`${styles.icon} `}/>
                                            <p>30 - 45 min</p>
                                        </div>
                                        <div className={`${styles.shipment} displayFlex`}>
                                            <MdOutlineDeliveryDining className={`${styles.icon} `}/>
                                            <p>Envío gratis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={`${styles.description} `}>{ productDetails.description }</p>
                        </div>

                        <div className={`${styles.totals__container} `}>
                            <div className={`${styles.counter} `}>
                                <button onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                <span>{count}</span>
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div>
                            <div className={`${styles.totalPrice} `}>
                                <p>Total: S/ {totalPricePPal}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                        </div>
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
            </div>
        </div>
    );
};


*/






/*


import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyings } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const accompanyings = useSelector(state => state.accompanyings);

    const [count, setCount] = useState(1);
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);

    //Calcular el precio del producto principal
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([productDetails]);
    console.log(selectedProducts)

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getAccompanyings());
    }, [dispatch]);

    useEffect(() => {
        setTotalPricePPal(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);

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
                    existingProduct.price = existingProduct.unitPrice * existingProduct.quantity; // Actualiza el precio con el total
                    setSelectedProducts([...selectedProducts]);
                }
            } else if (selectedProducts.length < 50) {
                setSelectedProducts([
                    ...selectedProducts,
                    {
                        nameProduct: product.name,
                        quantity: 1,
                        unitPrice: product.price,
                        price: product.price, // Establece el precio inicial con el valor del total
                        IdProduct: product._id,
                    },
                ]);
            }
        }
        setTotalPrice((prevTotal) => prevTotal + product.price); // Actualiza el precio total de la orden
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
            <div className={`${styles.detail} `}>
                <h1>{ productDetails.name }</h1>
                <div className={`${styles.container} `}>
                    <div className={`${styles.product} `}>
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ productDetails.image } />
                                {productDetails.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ productDetails.name }</h3>                                            
                                    <div className={` flex`}>
                                        <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                                        {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                                    </div>

                                    <div className={`${styles.timeShipment} `}>
                                        <div className={`${styles.time} displayFlex`}>
                                            <MdAccessTime className={`${styles.icon} `}/>
                                            <p>30 - 45 min</p>
                                        </div>
                                        <div className={`${styles.shipment} displayFlex`}>
                                            <MdOutlineDeliveryDining className={`${styles.icon} `}/>
                                            <p>Envío gratis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={`${styles.description} `}>{ productDetails.description }</p>
                        </div>

                        <div className={`${styles.totals__container} `}>
                            <div className={`${styles.counter} `}>
                                <button onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                <span>{count}</span>
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div>
                            <div className={`${styles.totalPrice} `}>
                                <p>Total: S/ {totalPricePPal}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                        </div>
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
            </div>
        </div>
    );
};


*/



/*
!VERSION 2 CON LA PROPIEDAD "products"
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyings } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const accompanyings = useSelector(state => state.accompanyings);

    const [count, setCount] = useState(1);
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);

    //Calcular el precio del producto principal
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({ products: [] });
    console.log(selectedProducts)

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getAccompanyings());
    }, [dispatch]);

    useEffect(() => {
        setTotalPricePPal(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);

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
            const existingProductIndex = selectedProducts.products.findIndex((selected) => selected.IdProduct === id);
            if (existingProductIndex !== -1) {
                const updatedProducts = [...selectedProducts.products];
                if (updatedProducts[existingProductIndex].quantity < 50) {
                    updatedProducts[existingProductIndex].quantity++;
                    updatedProducts[existingProductIndex].price = updatedProducts[existingProductIndex].unitPrice * updatedProducts[existingProductIndex].quantity;
                    setSelectedProducts({ products: updatedProducts });
                }
            } else if (selectedProducts.products.length < 50) {
                setSelectedProducts({
                    products: [
                        ...selectedProducts.products,
                        {
                            nameProduct: product.name,
                            quantity: 1,
                            unitPrice: product.price,
                            price: product.price,
                            IdProduct: product._id,
                        },
                    ],
                });
            }
        }
        setTotalPrice((prevTotal) => prevTotal + product.price);
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
            <div className={`${styles.detail} `}>
                <h1>{ productDetails.name }</h1>
                <div className={`${styles.container} `}>
                    <div className={`${styles.product} `}>
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ productDetails.image } />
                                {productDetails.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ productDetails.name }</h3>                                            
                                    <div className={` flex`}>
                                        <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                                        {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                                    </div>

                                    <div className={`${styles.timeShipment} `}>
                                        <div className={`${styles.time} displayFlex`}>
                                            <MdAccessTime className={`${styles.icon} `}/>
                                            <p>30 - 45 min</p>
                                        </div>
                                        <div className={`${styles.shipment} displayFlex`}>
                                            <MdOutlineDeliveryDining className={`${styles.icon} `}/>
                                            <p>Envío gratis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={`${styles.description} `}>{ productDetails.description }</p>
                        </div>

                        <div className={`${styles.totals__container} `}>
                            <div className={`${styles.counter} `}>
                                <button onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                <span>{count}</span>
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div>
                            <div className={`${styles.totalPrice} `}>
                                <p>Total: S/ {totalPricePPal}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                        </div>
                        <div className={styles.option__container}>
                            <div className={styles.accompanyings}>
                                <h3>Escoge tu acompañamiento</h3>
                                {accompanyings?.map((accompanying) => {
                                    const selectedAccompanyings = selectedProducts.products.find((selected) => selected.IdProduct === accompanying._id);
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
            </div>
        </div>
    );
};



*/




/*

!VERSION 3, ENLAZADO EL PRECIO DEL PRODUCTO PRINCIPAL Y LOS ACOMPAÑAMIENTOS
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyings } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const accompanyings = useSelector(state => state.accompanyings);

    const [count, setCount] = useState(1);
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);

    //Calcular el precio del producto principal
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({ products: [] });
    console.log(selectedProducts)

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getAccompanyings());
    }, [dispatch]);

    useEffect(() => {
        setTotalPricePPal(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);

    useEffect(() => {
        if (productDetails) {
            const mainProduct = {
                nameProduct: productDetails.name,
                quantity: count,
                unitPrice: productDetails.promoPrice ? productDetails.promoPrice : productDetails.price,
                price: totalPricePPal,
                IdProduct: productDetails._id,
            };
            setSelectedProducts({ products: [mainProduct] });
            setTotalPrice(totalPricePPal);
        }
    }, [productDetails, count, totalPricePPal]);

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
            const existingProductIndex = selectedProducts.products.findIndex((selected) => selected.IdProduct === id);
            if (existingProductIndex !== -1) {
                const updatedProducts = [...selectedProducts.products];
                if (updatedProducts[existingProductIndex].quantity < 50) {
                    updatedProducts[existingProductIndex].quantity++;
                    updatedProducts[existingProductIndex].price = updatedProducts[existingProductIndex].unitPrice * updatedProducts[existingProductIndex].quantity;
                    setSelectedProducts({ products: updatedProducts });
                }
            } else if (selectedProducts.products.length < 50) {
                setSelectedProducts({
                    products: [
                        ...selectedProducts.products,
                        {
                            nameProduct: product.name,
                            quantity: 1,
                            unitPrice: product.price,
                            price: product.price,
                            IdProduct: product._id,
                        },
                    ],
                });
            }
        }
        setTotalPrice((prevTotal) => prevTotal + product.price);
    };

    const handleDecrement = (id, productType) => {
        const productIndex = selectedProducts.products.findIndex((selected) => selected.IdProduct === id);
        if (productIndex !== -1) {
          const updatedProducts = [...selectedProducts.products];
          if (updatedProducts[productIndex].quantity > 1) {
            updatedProducts[productIndex].quantity--;
            updatedProducts[productIndex].price = updatedProducts[productIndex].unitPrice * updatedProducts[productIndex].quantity;
            const totalPriceChange = -updatedProducts[productIndex].unitPrice;
            setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
          } else {
            const totalPriceChange = -updatedProducts[productIndex].price;
            updatedProducts.splice(productIndex, 1);
            setTotalPrice((prevTotal) => prevTotal + totalPriceChange);
          }
          setSelectedProducts({ products: updatedProducts });
        }
      };
    

    return (
        <div>
            <div className={`${styles.detail} `}>
                <h1>{ productDetails.name }</h1>
                <div className={`${styles.container} `}>
                    <div className={`${styles.product} `}>
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ productDetails.image } />
                                {productDetails.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ productDetails.name }</h3>                                            
                                    <div className={` flex`}>
                                        <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                                        {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                                    </div>

                                    <div className={`${styles.timeShipment} `}>
                                        <div className={`${styles.time} displayFlex`}>
                                            <MdAccessTime className={`${styles.icon} `}/>
                                            <p>30 - 45 min</p>
                                        </div>
                                        <div className={`${styles.shipment} displayFlex`}>
                                            <MdOutlineDeliveryDining className={`${styles.icon} `}/>
                                            <p>Envío gratis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={`${styles.description} `}>{ productDetails.description }</p>
                        </div>

                        <div className={`${styles.totals__container} `}>
                            <div className={`${styles.counter} `}>
                                <button onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                <span>{count}</span>
                                <button onClick={() => setCount(count + 1)}>+</button>
                            </div>
                            <div className={`${styles.totalPrice} `}>
                                <p>Total: S/ {totalPricePPal}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            {productDetails.promoPrice ? <h4>- Nuevo precio S/ { productDetails.promoPrice }</h4> : null}
                        </div>
                        <div className={styles.option__container}>
                            <div className={styles.accompanyings}>
                                <h3>Escoge tu acompañamiento</h3>
                                {accompanyings?.map((accompanying) => {
                                    const selectedAccompanyings = selectedProducts.products.find((selected) => selected.IdProduct === accompanying._id);
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
            </div>
        </div>
    );
};
*/







/*


products: [
    {nameProduct: 'Cono La Justa', quantity: 4, unitPrice: 8, price: 32, IdProduct: '646c4ccc94498d23d0a2d133'}
]





*/