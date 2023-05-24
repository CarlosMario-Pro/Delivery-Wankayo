import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { getIdProduct, postOrders, getAddress } from '../../../redux/actions/index';
import styles from './ShoppingCart.module.css';


export default function ShoppingCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    console.log(orderData)
    const [comment, setComment] = useState('');
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    console.log(selectedAddressId)

  
    const productDetails = useSelector(state => state.productDetails);
    const userInfoLogin = useSelector((state) => state.userInfoLogin);
    const addressUser = useSelector((state) => state.addressUser);
    const idUser = userInfoLogin.id;
  
    useEffect(() => {
        const order = localStorage.getItem('order');
        if (order) {
            const parsedOrder = JSON.parse(order);
            setOrderData(parsedOrder);
            dispatch(getIdProduct(parsedOrder.idProduct));
            dispatch(getAddress(idUser));
        }
    }, [dispatch]);
  
    function handleSubmit() {
        if (selectedAddressId) { // Verifica si se ha seleccionado una dirección
            const updatedOrderData = { ...orderData, addressId: selectedAddressId };
            dispatch(postOrders(idUser, updatedOrderData)).then(() => {
                localStorage.removeItem('order');
                if (!userInfoLogin) {
                    setShouldRedirect(true);
                }
            });
        } else {
            console.log("Debe seleccionar una dirección");
        }
    }
  
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
  
    const handleAddressChange = (event) => {
        setSelectedAddressId(event.target.value);
    };
  
    useEffect(() => {
        if (orderData) {
            setOrderData((prevOrderData) => ({
                ...prevOrderData,
                comment: comment
            }));
        }
    }, [comment]);
  
    return (
      <div className={`${styles.shoppingCart} `}>
        <h2>Hola {userInfoLogin.name}!</h2>
        <div>
            {addressUser?.map((el) => {
                return (
                <div key={el._id} className={`${styles.address} jcspaceBetween`}>
                    <input type="radio" name="address" value={el._id} onChange={handleAddressChange} />
                    <div>
                        <p><span className={styles.spanTitle}>Dirección: </span>{el.street}</p>
                        <p><span className={styles.spanTitle}>Ciudad: </span>{el.city}</p>
                        <p><span className={styles.spanTitle}>Estado: </span>{el.state}</p>
                        <p><span className={styles.spanTitle}>País: </span>{el.country}</p>
                    </div>
                </div>
                );
            })}
        </div>

            <div className={`${styles.product} `}>
                <div className={`${styles.container__image} `}>
                    <img className={`${styles.image} `} src={productDetails.image} alt="Producto" />
                </div>
                <div className={`${styles.description} `}>
                    <h2>{productDetails.name}</h2>
                    <p>{productDetails.description}</p>
                    {orderData && (
                        <div>
                            {orderData.products?.map((el) => {
                                if (el.nameProduct === productDetails.name) {
                                    return (
                                        <div key={el.IdProduct} className={`${styles.principal__product}`}>
                                            {el.nameProduct !== productDetails.name && <p>{el.nameProduct}</p>}
                                            <p>Haz pedido <span className={`${styles.quantity}`}>{el.quantity} unidad(es)</span> de tu producto seleccionado</p>
                                            <p>Cada uno te cuesta S/ {el.unitPrice}</p>
                                            <p>EL subtotal es de S/ {el.price}</p>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    )}
                </div>                
            </div>

            {orderData && (
                <div className={`${styles.other__products}`}>
                    <div className={`${styles.container__two}`}>
                        {orderData.products?.map((el) => {
                            if (el.nameProduct === productDetails.name) return ( <div key={el.IdProduct}></div> )
                            else {
                                return (
                                    <div key={el.IdProduct} className={`${styles.unit__container} jcspaceBetween`}>
                                        <div className={`${styles.aaaaaaaaaaaaaa}`}>
                                            <p className={`${styles.title}`}>{el.nameProduct}</p>
                                            <p className={`${styles.quantity__product}`}>Cantidad {el.quantity}</p>
                                        </div>
                                        <div className={` center`}>
                                            <div className={`${styles.counter__container} jcspaceFlexStart`}>

                                                <div>
                                                    <h4>S/ {el.price}</h4>
                                                    {el.unitPrice ? <p className={`${styles.unity}`}>S/ {el.unitPrice} por unidad</p> : <p className={`${styles.free}`}>Gratis</p>}
                                                </div>
                                            </div>
                                            <div className={`${styles.delete} center`}>
                                                <button className={`${styles.button__delete}`}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <textarea value={comment} onChange={handleCommentChange} />
                    <div className={`${styles.end} centerColumn`}>
                        <h2>Precio Total: S/ {orderData.total}</h2>
                        {userInfoLogin ? <button className={`${styles.orderNow} center`} onClick={handleSubmit}>Ordenar Ahora</button> : <Link to="/login"><button>Iniciar sesión</button></Link>}
                        <Link className={`${styles.link} `} to='/' >
                            <p className={`${styles.back} center`}>Volver a los Productos</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};