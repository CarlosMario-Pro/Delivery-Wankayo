import React, { useState, useEffect } from 'react';
import { getOrdersInPreparation, changeStatusOrder, changeStatusOrderPrevious } from '../../../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './OrdersPreparation.module.css';


export default function OrdersPreparation() {
    const dispatch = useDispatch();
    const ordersInPreparation = useSelector((state) => state.ordersInPreparation);
  
    //Trae todas las órdenes pendientes (La nuevas órdenes)
    useEffect(() => {
        dispatch(getOrdersInPreparation());
    }, [dispatch]);

    //Cambiar de status la orden
    const [showChangeStatusModal, setShowChangeStatusModal] = useState({});
    const handleShowChangeStatusModal = (idOrder) => {
        setShowChangeStatusModal((prevState) => ({
            ...prevState,
            [idOrder]: true,
        }));
    };
    
    const handleConfirmChangeStatus = (idOrder) => {
        dispatch(changeStatusOrder(idOrder, { "status": "En camino" }));
        setShowChangeStatusModal((prevState) => ({
            ...prevState,
            [idOrder]: false,
        }));
    };

    //Cambiar al status previo en caso de error
    const handleChangeStatusOrderPrevious = (idOrder) => {
        dispatch(changeStatusOrderPrevious(idOrder, { "status": "Pendiente" }));
    };
 
  
    return (
        <div className={`${styles.ordersPreparation} flex `}>
            <div className={` flex `}>
                <div className={`${styles.panelAdmin} `}>
                    <PanelAdmin />
                </div>
             </div>

             <div className={`${styles.ordersPendings} `}>
                <Options />
                <h1>Órdenes en Preparación</h1>
                <div>
                    {ordersInPreparation.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <div className={`${styles.order} jcspaceBetween`}>
                                <div>
                                    <h2>{order.user.name} {order.user.lastName}</h2>
                                    <h4><span className={styles.spanTitle}>Dirección de entrega: </span>{order.address[0].street}, {order.address[0].city}</h4>
                                    <p><span className={styles.spanTitle}>Teléfono: </span>{order.user.phone}</p>
                                    <p><span className={styles.spanTitle}>Fecha de pedido: </span>{new Date(order.shippingDate).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} horas,</p>
                                    <p><span className={styles.spanTitle}>Observación: </span></p>
                                    <p>{order.comment}</p>
                                </div>
                                
                                <div className={`${styles.fff} `}>
                                    <div className={`${styles.buttons} centerColumnSpaceBetween `}>
                                <button className={`${styles.buttonUpdatePrevius} `} onClick={() => handleChangeStatusOrderPrevious(order._id)}>Devolver a "Pendiente"</button>
                                        <button className={`${styles.buttonUpdate} `} onClick={() => handleShowChangeStatusModal(order._id)}>Cambiar a "En camino"</button>
                                    </div>

                                    {showChangeStatusModal[order._id] && (
                                        <div className={`${styles.modal} centerColumn`}>
                                            <p>¿Estás seguro de que deseas cambiar de status la orden?</p>
                                            <div className={styles.modalButtons}>
                                                <button className={`${styles.button} `} onClick={() => handleConfirmChangeStatus(order._id)}>Sí</button>
                                                <button className={`${styles.buttonUpdate} `} onClick={() => setShowChangeStatusModal((prevState) => ({ ...prevState, [order._id]: false }))}>No</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

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
