import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSauces } from '../../../redux/actions/index';
import styles from './Sauces.module.css';

export default function Sauces () {
    const dispatch = useDispatch();
    const sauces = useSelector(state => state.sauces);

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

    useEffect(() => {
        dispatch(getSauces());
    }, [dispatch]);

    return (
        <div>
            <div className={`${styles.options} `}>
                <div className={`${styles.option__container} `}>
                    <h3>Escoge máximo tres unidades de tus salsas favoritas</h3>
                    <div className={`${styles.accompanyings} `}>
                        {sauces?.map((el) => {
                            return (
                                <div key={ el._id } className={`${styles.accompanyings__container} `} >
                                    <div className={`${styles.text__container} `}>
                                        <p>{el.name}</p>
                                    </div>
                                    <div className={`${styles.counter__container} `}>
                                        <button className={`${styles.button} `} onClick={() => handleDecrement(el._id)}>-</button>
                                        <span>{counters[el._id] || 0}</span>
                                        <button className={`${styles.button} `} onClick={() => handleIncrement(el._id)}>+</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>                          
        </div>
    );
};

