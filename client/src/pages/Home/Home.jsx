import React from 'react';
import styles from './Home.module.css';
import Map from '../../components/Map/Map';
import Conditions from '../../components/Conditions/Conditions';
import Hero from '../../components/Hero/Hero';
import Search from '../../components/Search/Search';
import ProductList from '../../components/ProductList/ProductList';


export default function Home() {

    return (
        <div className={`${styles.home}`}>
            <div className={`${styles.home__container}`}>
                <Hero />
                <Search />
                <ProductList />
                <Conditions />
                <Map />
            </div>
        </div>
    );
};