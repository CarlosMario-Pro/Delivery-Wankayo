import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNameProducts } from '../../redux/actions/index';
import { Navigate } from 'react-router-dom';
import Burguer from '../../assets/Burguer.png';
import Combo from '../../assets/Combo.png';
import Potato from '../../assets/Potato.png';
import Soda from '../../assets/Soda.png';
import styles from './Search.module.css';


export default function Search() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);    
  
    function handleInputChange(e) {
        setName(e.target.value);
    };
  
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameProducts(name));
        clearSearch();
        setShouldRedirect(true);
    };
  
    function clearSearch() {
        setName('');
    };
  

    return (
        <div className={`${styles.container} centerColumn`}>
            <div className={`${styles.containerImage} flex`}>
                <div className={`${styles.circleImage} center`}><img className={`${styles.image}`} src={Burguer} alt="Burguer" /></div>
                <div className={`${styles.circleImage} center`}><img className={`${styles.image}`} src={Combo} alt="Combo" /></div>
                <div className={`${styles.circleImage} center`}><img className={`${styles.image}`} src={Potato} alt="Potato" /></div>
                <div className={`${styles.circleImage} center`}><img className={`${styles.image}`} src={Soda} alt="Soda" /></div>
            </div>
            <form onSubmit={handleSubmit} className={`${styles.input} flex`}>
                <input className={`${styles.search}`} type="text" placeholder='Hamburguesas, boxes, combos, snacks, tu eliges...' onChange={ handleInputChange } value={ name } />
                <button className={`${styles.bsSearch} flex`} type="button" onClick={ handleSubmit } >Buscar</button>
                {shouldRedirect && <Navigate to={`/searchResults?name=` + name } />}
            </form>
            <p>Busca hamburguesas, boxes, combos, snacks, lo que tu desees...</p>
        </div>
    );
};