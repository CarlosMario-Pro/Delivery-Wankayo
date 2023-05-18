import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdUserOrders } from '../../../redux/actions/index';
import { useParams } from "react-router-dom";
import PanelUser from '../PanelUser';
import styles from './OrdersUser.module.css';


export default function OrdersUser() {
    const dispatch = useDispatch();
    const orderHistoryUser = useSelector((state) => state.orderHistoryUser);

    const idUser = useParams().idUser;
  
    //Trae todas las órdenes pendientes (La nuevas órdenes)
    useEffect(() => {
        dispatch(getIdUserOrders(idUser));
    }, [dispatch]);

  
    return (
        <div className={`${styles.ordersPreparation} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelUser />
                </div>
             </div>

             <div className={`${styles.ordersPendings} `}>

                <h1>Órdenes Activas</h1>
                <div>
                    {orderHistoryUser.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <h4><span className={styles.spanTitle}>Dirección de entrega: </span>{order.address[0].street}, {order.address[0].city}</h4>
                            <p><span className={styles.spanTitle}>Status: </span> {order.status}</p>
                            <p><span className={styles.spanTitle}>Observaciones del cliente: </span> {order.comment}</p>
                            <p><span className={styles.spanTitle}>Fecha de pedido: </span>{new Date(order.shippingDate).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} horas,</p>

                            <div className={styles.products}>
                            <h3>Productos</h3>
                            <div>
                                {order.products.map((product) => (
                                    <div key={product.IdProduct} className={styles.product}>
                                    <h4>{product.nameProduct}</h4>
                                    <p><span className={styles.spanTitle}>Cantidad:</span> {product.quantity}</p>
                                    <p><span className={styles.spanTitle}>Precio unitario: </span>S/ {product.unitPrice}</p>
                                    <p><span className={styles.spanTitle}>Sub total: </span>S/ {product.price}</p>
                                </div>
                                ))}
                            </div>
                            <h2><span className={styles.spanTitle}>Valor total a pagar:</span> S/ {order.total}</h2>
                        </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};