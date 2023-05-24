import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSauces, selectProducts } from '../../../redux/actions/index';
import styles from './Sauces.module.css';

export default function Sauces() {
    const dispatch = useDispatch();
    const sauces = useSelector(state => state.sauces);

    useEffect(() => {
        dispatch(getSauces());
    }, [dispatch]);
    
    const [selectedSauces, setSelectedSauces] = useState([]);

    const handleIncrementSauces = (id) => {
        const sauce = sauces.find((sauce) => sauce._id === id);
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
                }
            }
        }
    };

    const handleDecrementSauces = (id) => {
        setSelectedSauces((prevSauces) => {
            const updatedSauces = prevSauces.map((sauce) => {
                if (sauce.IdProduct === id) {
                    return {
                        ...sauce,
                        quantity: sauce.quantity - 1,
                    };
                }
                return sauce;
            });
            return updatedSauces.filter((sauce) => sauce.quantity > 0);
        });
    };
    

    function handleSubmit() {
        dispatch(selectProducts(selectedSauces));
    }

    return (
        <div>
            <div className={`${styles.options} `}>
                <div className={`${styles.option__container} `}>
                    <h3>Escoge máximo tres unidades de tus salsas favoritas</h3>
                    <div className={`${styles.accompanyings} `}>
                        {sauces?.map((el) => {
                            const isDisabled = selectedSauces.length === 3 && !selectedSauces.find(sauce => sauce.IdProduct === el._id);
                            const sauceClassName = selectedSauces.length === 3 ? styles.disabledSauce : "";
                            const sauce = selectedSauces.find(sauce => sauce.IdProduct === el._id);
                            const quantity = sauce ? sauce.quantity : 0;
                            return (
                                <div key={el._id} className={`${styles.accompanyings__container} ${sauceClassName}`}>
                                    <div className={`${styles.text__container} `}>
                                        <p>{el.name}</p>
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
                    <button className={styles.submitButton} onClick={handleSubmit} disabled={selectedSauces.length === 0 || selectedSauces.length > 3}>Despachar Orden</button>
            </div>
        </div>
    );
}




/*

!FUNCIONA, POR FAVOR NO BORRAR
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSauces, selectProducts } from '../../../redux/actions/index';
import styles from './Sauces.module.css';

export default function Sauces() {
    const dispatch = useDispatch();
    const sauces = useSelector(state => state.sauces);

    useEffect(() => {
        dispatch(getSauces());
    }, [dispatch]);
    
    const [selectedSauces, setSelectedSauces] = useState([]);

    const handleIncrementSauces = (id) => {
        const sauce = sauces.find((sauce) => sauce._id === id);
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
                }
            }
        }
    };

    const handleDecrementSauces = (id) => {
        setSelectedSauces((prevSauces) => {
          const updatedSauces = prevSauces.map((sauce) => {
            if (sauce.IdProduct === id) {
              return {
                ...sauce,
                quantity: sauce.quantity - 1,
              };
            }
            return sauce;
          });
          return updatedSauces.filter((sauce) => sauce.quantity > 0);
        });
      };
    

    function handleSubmit() {
        dispatch(selectProducts(selectedSauces));
    }

    return (
        <div>
            <div className={`${styles.options} `}>
                <div className={`${styles.option__container} `}>
                    <h3>Escoge máximo tres unidades de tus salsas favoritas</h3>
                    <div className={`${styles.accompanyings} `}>
                        {sauces?.map((el) => {
                            const isDisabled = selectedSauces.length === 3 && !selectedSauces.find(sauce => sauce.IdProduct === el._id);
                            const sauceClassName = selectedSauces.length === 3 ? styles.disabledSauce : "";
                            const sauce = selectedSauces.find(sauce => sauce.IdProduct === el._id);
                            const quantity = sauce ? sauce.quantity : 0;
                            return (
                                <div key={el._id} className={`${styles.accompanyings__container} ${sauceClassName}`}>
                                    <div className={`${styles.text__container} `}>
                                        <p>{el.name}</p>
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
                    <button className={styles.submitButton} onClick={handleSubmit} disabled={selectedSauces.length === 0 || selectedSauces.length > 3}>Despachar Orden</button>
                </div>
            </div>
        </div>
    );
}

*/




/*


!VERSION CON .PUSH A selectedProducts
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getAccompanyings, getSauces } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const sauces = useSelector(state => state.sauces);

    const [count, setCount] = useState(1);
    const [totalPricePPal, setTotalPricePPal] = useState(productDetails.promoPrice || productDetails.price);

    //Calcular el precio del producto principal
    const [selectedSauces, setSelectedSauces] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState({ products: [] });
    console.log(selectedProducts)

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
        dispatch(getSauces());
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
        const sauce = sauces.find((sauce) => sauce._id === id);
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
                            <div className={`${styles.option__container} `}>
                                <h3>Escoge máximo tres unidades de tus salsas favoritas</h3>
                                <div className={`${styles.accompanyings} `}>
                                    {sauces?.map((el) => {
                                        const isDisabled = selectedSauces.length === 3 && !selectedSauces.find(sauce => sauce.IdProduct === el._id);
                                        const sauceClassName = selectedSauces.length === 3 ? styles.disabledSauce : "";
                                        const sauce = selectedSauces.find(sauce => sauce.IdProduct === el._id);
                                        const quantity = sauce ? sauce.quantity : 0;
                                        return (
                                            <div key={el._id} className={`${styles.accompanyings__container} ${sauceClassName}`}>
                                                <div className={`${styles.text__container} `}>
                                                    <p>{el.name}</p>
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
                            <div>Total: S/ {totalPrice}</div>                   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


*/