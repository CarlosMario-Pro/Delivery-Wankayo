import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProductsLogical } from '../../redux/actions/index';
import { MdAccessTime, MdOutlineDeliveryDining } from 'react-icons/md';
import { TiStarburst } from 'react-icons/ti';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import styles from './ProductList.module.css';


export default function ProductList () {
    const dispatch = useDispatch();
    const { categoriesId } = useSelector(state => state);    
    const { categoriesLogical } = useSelector(state => state);
    
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProductsLogical());
    }, [dispatch]);
    
    const getCategoryName = (categoryId) => {
        const category = categoriesId.find(c => c._id === categoryId);
        return category ? category.category : categoryId;
    };


    return (
        <div className={`${styles.productList} `}>
            <h2 className={`${styles.title} `}>Todos nuestros productos al alcance de tu mano</h2>
            <p>Somos un emprendimiento familiar de comida rápida</p>
            <p>donde las papas nativas son orgullosas protagonistas de nuestra variada Carta</p>
            {Object.entries(categoriesLogical).map(([category, products]) => (
                <div key={category} className={`${styles.container} `} >
                    <h1>{getCategoryName(category)}</h1>
                    <div className={`${styles.containerDescription} `}>
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
            ))}
        </div>
    );
};