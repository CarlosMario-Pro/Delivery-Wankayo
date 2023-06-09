import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccompanyings } from '../../../redux/actions/index';
import styles from './Accompanyings.module.css';

export default function Accompanyings () {
    const dispatch = useDispatch();
    const accompanyings = useSelector(state => state.accompanyings);

    const [counters, setCounters] = useState({});

    const handleIncrement = (id) => {
        setCounters({
            ...counters,
            [id]: (counters[id] || 0) + 1
        });
    };

    const handleDecrement = (id) => {
        if (counters[id] && counters[id] > 0) {
            setCounters({
                ...counters,
                [id]: counters[id] - 1
            });
        }
    };

    const getTotalPrice = (id) => {
        const price = accompanyings.find((drink) => drink._id === id)?.price || 0;
        return counters[id] ? counters[id] * price : 0;
    };

    const getTotalCartPrice = () => {
        let total = 0;
        for (let id in counters) {
            total += getTotalPrice(id);
        }
        return total;
    };
    // Esta función calcula el precio total de todas las bebidas seleccionadas

    useEffect(() => {
        dispatch(getAccompanyings());
    }, [dispatch]);

    return (
        <div>
            <div className={`${styles.options} `}>
                <div className={`${styles.option__container} `}>
                    <h3>Escoge tu acompañamiento</h3>
                    <div className={`${styles.accompanyings} `}>
                        {accompanyings?.map((el) => {
                            const totalPrice = getTotalPrice(el._id);
                            return (
                                <div key={ el._id } className={`${styles.accompanyings__container} `} >
                                    <div className={`${styles.text__container} `}>
                                        <p>{el.name}</p>
                                        <p>{el.description}</p>
                                        <h4>+ S/ {el.price}</h4>
                                    </div>
                                    <div className={`${styles.counter__container} `}>
                                        <button className={`${styles.button} `} onClick={() => handleDecrement(el._id)}>-</button>
                                        <span>{counters[el._id] || 0}</span>
                                        <button className={`${styles.button} `} onClick={() => handleIncrement(el._id)}>+</button>
                                    </div>
                                    {/* <h5>Total: S/ {totalPrice}</h5> */}
                                </div>
                            );
                        })}
                    </div>
                    <h3>Total carrito: S/ {getTotalCartPrice()}</h3>
                </div>
            </div>                          
        </div>
    );
};

