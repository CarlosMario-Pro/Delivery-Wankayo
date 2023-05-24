import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyingsLogical, getDrinksLogical, getExtrasLogical, getSaucesLogical, selectProducts, postOrders } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import IsOpen from './IsOpen/IsOpen';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const navigate = useNavigate();
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

    const [selectedSauces, setSelectedSauces] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({
        user: idUser,
        // address: "646d5b43e6e3954d93d13bd3",
        // comment: "Yo lo recojo en tienda",
        products: [],
        total: 0,
        idProduct: idProduct,
    });
    // console.log(selectedProducts)

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

    const handleSubmit = () => {
        localStorage.setItem('order', JSON.stringify(selectedProducts));
        navigate(`/shoppingCart`);
    };


    return (
        <div className={`${styles.detail} `}>
            <IsOpen />            
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
                    <div className={`${styles.price} `}>
                        <h1>{ productDetails.name }</h1>
                        {productDetails.promoPrice ? <h2>Nuevo precio S/ { productDetails.promoPrice }</h2> : null}
                        <h2 className={productDetails.promoPrice ? styles.strikethrough : ''}>Precio S/ { productDetails.price }</h2>
                        {/* <h3 className={`${styles.text__price} `}>{(((productDetails.promoPrice * -100) / productDetails.price) + 100)}% de descuento</h3> */}
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
                    <button className={`${styles.totals} center`} onClick={handleSubmit} disabled={selectedProducts.length === 0} >Agregar al carrito S/ {totalPrice}</button>
                </div>
            </div>
        </div>
    );
};


