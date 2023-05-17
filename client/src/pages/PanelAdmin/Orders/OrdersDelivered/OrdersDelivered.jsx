import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersHistoryDelivered, changeStatusOrderPrevious, trueLogicalOrdersHistory } from '../../../../redux/actions/index';
import PanelAdmin from '../../PanelAdmin';
import Options from '../Options/Options';
import styles from './OrdersDelivered.module.css';


export default function OrdersDelivered() {
    const dispatch = useDispatch();
    const ordersHistoryDelivered = useSelector((state) => state.ordersHistoryDelivered);
    const { userInfoLogin: session } = useSelector((state) => state);
  
    //Trae todas las órdenes entregadas
    useEffect(() => {
        dispatch(getOrdersHistoryDelivered());
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
        dispatch(trueLogicalOrdersHistory(idOrder, session));
        setShowChangeStatusModal((prevState) => ({
            ...prevState,
            [idOrder]: false,
        }));
    };

    //Cambiar al status previo en caso de error
    const handleChangeStatusOrderPrevious = (idOrder) => {
        dispatch(changeStatusOrderPrevious(idOrder, { "status": "En camino" }));
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
                <h1>Órdenes Entregadas</h1>
                <div>
                    {ordersHistoryDelivered.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <div className={`${styles.order} jcspaceBetween`}>
                                <div>
                                    <h2>ID ORDER {order._id}</h2>
                                    <h2>ID USER {order.user._id}</h2>
                                    <h2>{order.user.name} {order.user.lastName}</h2>
                                    <h4><span className={styles.spanTitle}>Dirección de entrega: </span>{order.address[0].street}, {order.address[0].city}</h4>
                                    <p><span className={styles.spanTitle}>Teléfono: </span>{order.user.phone}</p>
                                    <p><span className={styles.spanTitle}>Fecha de pedido: </span>{new Date(order.shippingDate).toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })} horas</p>
                                </div>
                                
                                <div className={`${styles.fff} `}>
                                    <div className={`${styles.buttons} centerColumnSpaceBetween `}>
                                        <button className={`${styles.buttonUpdatePrevius} `} onClick={() => handleChangeStatusOrderPrevious(order._id)}>Devolver a "En Camino"</button>
                                        <button className={`${styles.buttonUpdate} `} onClick={() => handleShowChangeStatusModal(order._id)}>Archivar en el Historial</button>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
