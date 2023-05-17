import React from 'react';
import Hero from '../../components/Hero/Hero';
import { useSelector } from 'react-redux';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import Search from '../../components/Search/Search';
import { Link } from "react-router-dom";
import styles from './SearchResults.module.css';


export default function SearchResults() {
    const products = useSelector(state => state.products);

    return (
        <div className={`${styles.productList} centerColumn `}>
            <Hero />
            <Search />
            <h1>Resultados de búsqueda</h1>
            <div className={`${styles.container} `}>
                {products.map(product => (
                    <Link key={product._id} to={'/productDetail/'+ product._id} style={{ textDecoration: 'none' }} >
                        <div className={`${styles.cards}`}>
                            <div className={`${styles.image__container} `}>                                    
                                <div className={`${styles.aviso} center `}>
                                    <div className={`${styles.free} `}>
                                        <TiStarburst className={`${styles.tiStarburst} `}/>
                                        <p className={`${styles.percentage} `}>%</p>
                                    </div>
                                    <p>Envío gratis</p>
                                </div>
                                <img className={`${styles.image} `} src={ product.image } />
                                {product.promoPrice ? <div className={`${styles.promotionNotice} center`}>Promoción</div> : null}
                            </div>

                            <div className={`${styles.description} displayFlex`}>
                                <div className={`${styles.logo} center`}><BsFillBookmarkStarFill className={`${styles.logoIcon} `}/></div>
                                <div className={`${styles.text__container} `}>
                                    <h3>{ product.name }</h3>
                                    
                                    <div className={` flex`}>
                                        <h4 className={product.promoPrice ? styles.strikethrough : ''}>S/ { product.price }</h4>
                                        {product.promoPrice ? <h4>- Nuevo precio S/ { product.promoPrice }</h4> : null}
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

