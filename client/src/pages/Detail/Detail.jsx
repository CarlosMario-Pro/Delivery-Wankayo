import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getIdProduct, getDrinks, getAccompanyings, getExtras, getSauces } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import styles from './Detail.module.css';

import Accompanyings from '../Detail/Accompanyings/Accompanyings';
import Drinks from '../Detail/Drinks/Drinks';
import Extras from '../Detail/Extras/Extras';
import Sauces from '../Detail/Sauces/Sauces';


export default function Detail () {
    const { idProduct } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getIdProduct(idProduct));
    }, [dispatch, idProduct]);

    useEffect(() => {
        dispatch(getDrinks());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccompanyings());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getExtras());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSauces());
    }, [dispatch]);


    //Calcular el precio del producto principal
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(productDetails.promoPrice || productDetails.price);

    useEffect(() => {
        setTotalPrice(count *  (productDetails.promoPrice || productDetails.price));
    }, [count, productDetails]);


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
                                <div className={`${styles.logo} `}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h4>{ productDetails.name }</h4>
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
                                    <div className={` flex`}>
                                        {productDetails.promoPrice ? <h4> - S/ { productDetails.promoPrice }</h4> : null}
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
                                <p>Total: S/ {totalPrice}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${styles.price} flex`}>
                            <h4 className={productDetails.promoPrice ? styles.strikethrough : ''}>S/ { productDetails.price }</h4>
                            {productDetails.promoPrice ? <h4> - S/ { productDetails.promoPrice }</h4> : null}
                        </div>

                        <div className={`${styles.options} `}>                            
                            <Sauces />
                            <Drinks />
                            <Accompanyings />
                            <Extras />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
