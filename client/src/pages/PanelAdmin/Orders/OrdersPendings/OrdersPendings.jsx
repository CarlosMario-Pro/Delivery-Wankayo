import React, { useState, useEffect } from 'react';
import { getOrdersPendings, cancelOrder, changeStatusOrder } from '../../../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OrdersPendings.module.css';


export default function OrdersPendings() {
    const [message, setMessage] = useState({
        cancelMessage: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMessage({
            ...message,
            [name]: value
        });
    };


    const dispatch = useDispatch();
    const ordersPendings = useSelector((state) => state.ordersPendings);
  
    //Trae todas las órdenes pendientes (La nuevas órdenes)
    useEffect(() => {
        dispatch(getOrdersPendings());
    }, [dispatch]);

    //Eliminar la orden
    const [showDeleteModal, setShowDeleteModal] = useState({});
    const handleShowDeleteModal = (idOrder) => {
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idOrder]: true,
        }));
    };

    const handleConfirmDelete = (idOrder) => {
        dispatch(cancelOrder(idOrder, message));
        setShowDeleteModal((prevState) => ({
            ...prevState,
            [idOrder]: false,
        }));
    };

    //Cambiar de status la orden
    const [showChangeStatusModal, setShowChangeStatusModal] = useState({});
    const handleShowChangeStatusModal = (idOrder) => {
        setShowChangeStatusModal((prevState) => ({
            ...prevState,
            [idOrder]: true,
        }));
    };
    
    const handleConfirmChangeStatus = (idOrder) => {
        dispatch(changeStatusOrder(idOrder, { "status": "En preparación" }));
        setShowChangeStatusModal((prevState) => ({
            ...prevState,
            [idOrder]: false,
        }));
    };
 
  
    return (
        <div className={`${styles.ordersPendings} `}>
            <h1>Órdenes Pendientes</h1>
            <div>
                {ordersPendings.map((order) => (
                    <div key={order._id} className={styles.orderCard}>
                        <div className={`${styles.order} jcspaceBetween`}>
                            <div>
                                <h2>{order.user.name} {order.user.lastName}</h2>
                                <h2>{order._id}</h2>
                                <h4><span className={styles.spanTitle}>Dirección de entrega: </span>{order.address[0].street}, {order.address[0].city}</h4>
                                <p><span className={styles.spanTitle}>Teléfono: </span>{order.user.phone}</p>
                                <p><span className={styles.spanTitle}>Fecha de pedido: </span>{new Date(order.shippingDate).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} horas, {/* <Link className={styles.link} to={`/orders/${order._id}`}>Ver detalles</Link> */}</p>
                                <p><span className={styles.spanTitle}>Observación: </span></p>
                                <p>{order.comment}</p>
                            </div>
                            
                            <div className={`${styles.fff} `}>
                                <div className={`${styles.buttons} centerColumnSpaceBetween `}>
                                    <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(order._id)}>Cancelar Order</button>
                                    <button className={`${styles.buttonUpdate} `} onClick={() => handleShowChangeStatusModal(order._id)}>Cambiar a "En Prepración"</button>
                                </div>
                                {/* mostramos la ventana modal solo si el estado de la orden es verdadero */}
                                {showDeleteModal[order._id] && (
                                    <div className={`${styles.modal} centerColumn`}>
                                        <p>¿Estás seguro de que cancelar esta orden?</p>
                                        <div className={styles.modalInput}>
                                        <input className={`${styles.input} `} type="text" name="cancelMessage" value={message.cancelMessage} onChange={handleInputChange} />
                                            {/* <input type="text" placeholder="Ingresa un mensaje de cancelación" value={cancelMessage.message} onChange={handleInputChange} /> */}
                                        </div>
                                        <div className={styles.modalButtons}>
                                            <button className={`${styles.button} `} onClick={() => handleConfirmDelete(order._id)}>Sí</button>
                                            <button className={`${styles.buttonUpdate} `} onClick={() => setShowDeleteModal((prevState) => ({ ...prevState, [order._id]: false }))}>No</button>
                                        </div>
                                    </div>
                                )}

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
    );
};
