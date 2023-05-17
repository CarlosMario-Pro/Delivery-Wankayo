import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersHistory, deleteOrders, falseLogicalOrdersHistory } from '../../../../redux/actions/index';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from './Historial.module.css';


export default function Historial() {
    const dispatch = useDispatch();
    const ordersHistory = useSelector((state) => state.ordersHistory);
  
    //Trae todas las órdenes pendientes (La nuevas órdenes)
    useEffect(() => {
        dispatch(getOrdersHistory());
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
        dispatch(deleteOrders(idOrder));
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
    
    //Cambiar al status previo en caso de error
    const handleChangeStatusOrderPrevious = (idOrder) => {
        dispatch(falseLogicalOrdersHistory(idOrder));
    };
 
  
    return (
        <div className={`${styles.ordersPendings} `}>
            <h1>- Agregar los filtros para fechas</h1>
            <br />
            <h1>Historial de órdenes archivadas</h1>
            <div>
                {ordersHistory.map((order) => (
                    <div key={order._id} className={styles.orderCard}>
                        <div className={`${styles.order} jcspaceBetween`}>
                            <div>
                                {/* <h4><span className={styles.spanTitle}>ID: </span>{order._id}</h4> */}
                                <h3>Estatus: {order.status}</h3>
                                <h3>ID: {order._id}</h3>
                                <h3>Mensaje de cancelación: {order.cancelMessage}</h3>
                                <h3>{order.user.name} {order.user.lastName}</h3>
                                <p><span className={styles.spanTitle}>Fecha de pedido: </span>{new Date(order.shippingDate).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} horas</p>
                            </div>
                            
                            <div className={`${styles.fff} `}>
                                <div className={`${styles.buttons} `}>
                                    <button className={`${styles.button} `} onClick={() => handleShowDeleteModal(order._id)}><RiDeleteBin6Line className={`${styles.iconDelete} `}/></button>
                                    <button className={`${styles.buttonUpdatePrevius} `} onClick={() => handleShowChangeStatusModal(order._id)}>Devolver a "Entregado"</button>
                                </div>
                                
                                {showDeleteModal[order._id] && (
                                    <div className={`${styles.modal} centerColumn`}>
                                        <p>¿Estás seguro de que deseas eliminar esta orden?</p>
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
                                            <button className={`${styles.button} `} onClick={() => handleChangeStatusOrderPrevious(order._id)}>Sí</button>
                                            <button className={`${styles.buttonUpdate} `} onClick={() => setShowChangeStatusModal((prevState) => ({ ...prevState, [order._id]: false }))}>No</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
