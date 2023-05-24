import axios from 'axios';
import { toast } from "react-toastify";
// import Cookies from "js-cookie";


//^PRODUCTS--------------------------------------------------------------------------------
//Crea productos
export function postProduct(payload) {
    try {
        return async function (dispatch) {
            const { data } = await axios.post('http://localhost:3001/admin', payload);
            window.location.href =  '/panelAdmin/products';
            dispatch({ type: 'POST_PRODUCT', payload: data });
        };
    } catch (error) {
        dispatch({ type: 'POST_PRODUCTS_ERROR', payload: error.message || 'Ocurrió un error al crear el producto' });
    }
};

//Obtener todos los productos incluyendo los de borrado lógico (Para panel del Admin)
export function getProducts (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin`);
            return dispatch({ type: 'GET_PRODUCTS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtener todos los productos a a excepción de los marcados con borrado lógico (Son los que se muestran al público)
export function getProductsLogical (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getProductsLogical`);
            return dispatch({ type: 'GET_PRODUCTS_LOGICAL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae un producto por id
export function getIdProduct (idProduct){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/${idProduct}`);
            return dispatch({ type: 'GET_PRODUCT_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza un producto
export const putProduct = (idProduct, product) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/${idProduct}`, product);
        window.location.href =  '/panelAdmin/products';
        dispatch({ type: 'PUT_PRODUCT', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente un producto
export const deleteProduct = (idProduct, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.delete(`http://localhost:3001/admin/${idProduct}`, config);        
        window.location.reload();
        dispatch({ type: 'DELETE_PRODUCT', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina un producto con borrado lógico
export const trueLogicalDeletionProduct = (idProduct, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalDeletionProduct/${idProduct}`, config);        
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_DELETION_PRODUCT', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Activa un producto eliminado con borrado lógico
export const falseLogicalDeletionProduct = (idProduct, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalDeletionProduct/${idProduct}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_DELETION_PRODUCT', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Trae los productos al buscar por nombre
export function getNameProducts (name) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getNameProducts?name=` + name);
            dispatch({ type: 'GET_NAME_PRODUCTS', payload: data});
        };
    } catch (error) {
        console.log(error);
    }
};



//^USERADMIN--------------------------------------------------------------------------------
//Crea usuarios administradores
export function postUserAdmin(payload) {
    try {
        return async function (dispatch) {
            const { data } = await axios.post('http://localhost:3001/admin/postUserAdmin', payload);
            window.location.href =  '/panelAdmin/userAdmin';
            dispatch({ type: 'POST_USERADMIN', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todos los Usuarios Adminisrtadores
export function getUserAdmin(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getUserAdmin`);
            return dispatch({ type: 'GET_USERADMIN', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae un Usuario Adminisrtador por id
export function getIdUserAdmin(idAdmin){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getIdUserAdmin/${idAdmin}`);
            return dispatch({ type: 'GET_ADMIN_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza un usuario administrador
export const putUserAdmin = (idUserAdmin, userAdmin) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putUserAdmin/${idUserAdmin}`, userAdmin);
        window.location.href =  '/panelAdmin/userAdmin';
        dispatch({ type: 'PUT_USERADMIN', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente un usuario administrador
export const deleteUserAdmin = (idUser) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`http://localhost:3001/admin/deleteUserAdmin/${idUser}`);
        window.location.reload();
        dispatch({ type: 'DELETE_USERADMIN', payload: data });
    } catch (error) {
        console.log(error);
    }
};



//^CATEGORIES--------------------------------------------------------------------------------
//Crea una categoría
export function postCategory(payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/admin/postCategory`, payload);
            window.location.href =  '/panelAdmin/products/categories';
            return dispatch({ type: 'POST_CATEGORY', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtiene todas las categoría
export function getCategories(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getCategories`);
            return dispatch({ type: 'GET_CATEGORIES', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza el nombre de una categoría
export const putCategory = (idCategory, category) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putCategory/${idCategory}`, category);
        window.location.href =  '/panelAdmin/products/categories';
        dispatch({ type: 'PUT_CATEGORY', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente una categoría
export function deleteCategory(idCategory){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteCategory/${idCategory}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_CATEGORY', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};



//^DRINKS--------------------------------------------------------------------------------
//Crea una bebida
export function postDrinks(payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/admin/postDrinks`, payload);
            window.location.href =  '/panelAdmin/products/drinks';
            return dispatch({ type: 'POST_DRINKS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtener todos los productos incluyendo los de borrado lógico (Para panel del Admin)
export function getDrinks(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getDrinks`);
            return dispatch({ type: 'GET_DRINKS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtener todos los productos a a excepción de los marcados con borrado lógico (Son los que se muestran al público)
export function getDrinksLogical (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getDrinksLogical`);
            return dispatch({ type: 'GET_DRINKS_LOGICAL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae una bebida por id
export function getIdDrinks(idDrinks){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getDrinks/${idDrinks}`);
            return dispatch({ type: 'GET_DRINK_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza una bebida
export const putDrinks = (idDrinks, category) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putDrinks/${idDrinks}`, category);
        window.location.href =  '/panelAdmin/products/drinks';
        dispatch({ type: 'PUT_DRINKS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente una bebida
export function deleteDrinks(idDrinks){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteDrinks/${idDrinks}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_DRINKS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina una bebida con borrado lógico
export const trueLogicalDeletionDrink = (idDrinks, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalDeletionDrink/${idDrinks}`, config);        
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_DELETION_DRINK', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Activa una bebida eliminada con borrado lógico
export const falseLogicalDeletionDrink = (idDrinks, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalDeletionDrink/${idDrinks}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_DELETION_DRINK', payload: data });
    } catch (error) {
        console.log(error);
    }
};



//^ACCOMPANYINGS--------------------------------------------------------------------------------
//Crea un acompañamiento
export function postAccompanyings(payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/admin/postAccompanyings`, payload);
            window.location.href =  '/panelAdmin/products/accompanyings';
            return dispatch({ type: 'POST_ACCOMPANYINGS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

export function getAccompanyingsLogical (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getAccompanyingsLogical`);
            return dispatch({ type: 'GET_ACCOMPANYING_LOGICAL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todos los acompañamientos
export function getAccompanyings(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getAccompanyings`);
            return dispatch({ type: 'GET_ACCOMPANYINGS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae un acompañamiento por id
export function getIdAccompanyings(idAccompanyings){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getAccompanyings/${idAccompanyings}`);
            return dispatch({ type: 'GET_ACCOMPANYING_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza un acompañamiento
export const putAccompanyings = (idAccompanyings, accompanyings) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putAccompanyings/${idAccompanyings}`, accompanyings);
        window.location.href =  '/panelAdmin/products/accompanyings';
        dispatch({ type: 'PUT_ACCOMPANYINGS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente un acompañamiento
export function deleteAccompanyings(idAccompanyings){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteAccompanyings/${idAccompanyings}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_ACCOMPANYINGS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina un acompañamiento con borrado lógico
export const trueLogicalDeletionAccompanying = (idAccompanying, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalDeletionAccompanying/${idAccompanying}`, config);        
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_DELETION_ACCOMPANYNG', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Activa un acompañamiento eliminado con borrado lógico
export const falseLogicalDeletionAccompanying = (idAccompanying, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalDeletionAccompanying/${idAccompanying}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_DELETION_ACCOMPANYNG', payload: data });
    } catch (error) {
        console.log(error);
    }
};



//^EXTRAS--------------------------------------------------------------------------------
//Crea un extra
export function postExtras(payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/admin/postExtras`, payload);
            window.location.href =  '/panelAdmin/products/extras';
            return dispatch({ type: 'POST_EXTRAS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todos los extras
export function getExtras(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getExtras`);
            return dispatch({ type: 'GET_EXTRAS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtener todos los productos a a excepción de los marcados con borrado lógico (Son los que se muestran al público)
export function getExtrasLogical (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getExtrasLogical`);
            return dispatch({ type: 'GET_EXTRAS_LOGICAL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae un extra por id
export function getIdExtras(idExtras){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getExtras/${idExtras}`);
            return dispatch({ type: 'GET_EXTRA_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza un extra
export const putExtras = (idExtras, category) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putExtras/${idExtras}`, category);
        window.location.href =  '/panelAdmin/products/extras';
        dispatch({ type: 'PUT_EXTRAS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente un extra
export function deleteExtras(idExtras){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteExtras/${idExtras}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_EXTRAS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina una bebida con borrado lógico
export const trueLogicalDeletionExtras = (idExtras, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalDeletionExtras/${idExtras}`, config);        
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_DELETION_EXTRAS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Activa una bebida eliminada con borrado lógico
export const falseLogicalDeletionExtras = (idExtras, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalDeletionExtras/${idExtras}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_DELETION_EXTRAS', payload: data });
    } catch (error) {
        console.log(error);
    }
};



//^SAUCES--------------------------------------------------------------------------------
//Crea una salsa
export function postSauces(payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/admin/postSauces`, payload);
            window.location.href =  '/panelAdmin/products/sauces';
            return dispatch({ type: 'POST_SAUCES', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las salsas
export function getSauces(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getSauces`);
            return dispatch({ type: 'GET_SAUCES', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtener todos los productos a a excepción de los marcados con borrado lógico (Son los que se muestran al público)
export function getSaucesLogical (){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getSaucesLogical`);
            // console.log(data)
            return dispatch({ type: 'GET_SAUCES_LOGICAL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae una salsa por id
export function getIdSauces(idSauces){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getSauces/${idSauces}`);
            return dispatch({ type: 'GET_SAUCE_DETAIL', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza una bebida
export const putSauces = (idSauces, category) => async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/admin/putSauces/${idSauces}`, category);
        window.location.href =  '/panelAdmin/products/sauces';
        dispatch({ type: 'PUT_SAUCES', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanentemente una salsa
export function deleteSauces(idSauces){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteSauces/${idSauces}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_SAUCES', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina una salsa con borrado lógico
export const trueLogicalDeletionSauces = (idSauces, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalDeletionSauces/${idSauces}`, config);        
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_DELETION_SAUCES', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Activa una salsa eliminada con borrado lógico
export const falseLogicalDeletionSauces = (idSauces, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalDeletionSauces/${idSauces}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_DELETION_SAUCES', payload: data });
    } catch (error) {
        console.log(error);
    }
};




//^ORDERS PANEL ADMIN--------------------------------------------------------------------------------
//Agrega productos al estado 'selectProducts' para llamarlo en el componente 'ShoppingCart'
export function selectProducts(products){
    try {
        return async function (dispatch) {
            return dispatch({ type: 'SELECT_PRODUCTS', payload: products });
        }
    } catch (error) {
        console.log(error);
    }
};

//Crea una orden
export function postOrders(idUser, payload){
    // console.log('Hola ')
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/user/postOrders/${idUser}`, payload);
            console.log('Data ', data)
            window.location.href =  `/panelUser/ordersUser/${idUser}`;
            return dispatch({ type: 'POST_ORDER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las órdenes PENDIENTES al Panel del Admin
export function getOrdersPendings(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getOrdersPendings`);
            return dispatch({ type: 'GET_ORDERS_PENDINGS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las órdenes EN PREPARACION al Panel del Admin
export function getOrdersInPreparation(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getOrdersInPreparation`);
            return dispatch({ type: 'GET_ORDERS_INPREPARATION', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las órdenes EN CAMINO al Panel del Admin
export function getOrdersOnTheWay(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getOrdersOnTheWay`);
            return dispatch({ type: 'GET_ORDERS_ON_THE_WAY', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las órdenes ENTREGADAS en el panel del Admin
export function getOrdersHistoryDelivered(session){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getOrdersHistoryDelivered`, session);
            return dispatch({ type: 'GET_ORDERS_HISTORY_DELIVERED', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las órdenes archivadas al Panel del Admin
export function getOrdersHistory(){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/admin/getOrdersHistory`);
            return dispatch({ type: 'GET_ORDERS_HISTORY', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina una orden sin importar su status
export function deleteOrders(idOrder){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/admin/deleteOrder/${idOrder}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_ORDERS_DELIVERED', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Cancela una orden 
export function cancelOrder(idOrder, message){
    try {
        return async function (dispatch) {
            const {data} = await axios.put(`http://localhost:3001/admin/cancelOrder/${idOrder}`, { cancelMessage: message.cancelMessage, status: "Cancelada" });
            window.location.reload();
            return dispatch({ type: 'CANCEL_ORDER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Cambia el status de la orden ("Pendiente", "En preparación", "En camino", "Entregado")
export function changeStatusOrder(idOrder, orderStatus){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/admin/changeStatusOrder/${idOrder}`, orderStatus);
            window.location.reload();
            return dispatch({ type: 'CHANGE_STATUS_ORDER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Cambia la orden al status previo en caso de cambiarlas por error
export function changeStatusOrderPrevious (idOrder, orderStatus){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/admin/changeStatusOrderPrevious/${idOrder}`, orderStatus);
            window.location.reload();
            return dispatch({ type: 'CHANGE_STATUS_ORDER_PREVIUS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Marca una orden como archivada
export const trueLogicalOrdersHistory = (idOrder, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) } };
        const { data } = await axios.put(`http://localhost:3001/admin/trueLogicalOrdersHistory/${idOrder}`, config);
        window.location.reload();
        dispatch({ type: 'TRUE_LOGICAL_ORDERS_HISTORY', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Desmarca una orden del archivo
export const falseLogicalOrdersHistory = (idOrder, session) => async (dispatch) => {
    try {
        const config = { headers: { "x-user-session": JSON.stringify(session) }, };
        const { data } = await axios.put(`http://localhost:3001/admin/falseLogicalOrdersHistory/${idOrder}`, config);        
        window.location.reload();
        dispatch({ type: 'FALSE_LOGICAL_ORDERS_HISTORY', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//Trae todos los Usuarios con rol "user"
export function getAllUsers(){              //!NO IMPLEMENTADA
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getAllUsers`);
            return dispatch({ type: 'GET_ALL_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};



//^USER--------------------------------------------------------------------------------
//Register
export function registerUser(payload) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`http://localhost:3001/user/register`, payload);
            dispatch({ type: 'REGISTER_USER', payload: data });
            toast.success('Registrado correctamente');
            setTimeout(() => {
                window.location.href = '/login';
            }, 5000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('El correo electrónico ya está registrado');
            } else {
                toast.error('Error en el registro');
            }
        }
    }
}

//Elimina permanentemente la cuenta de un usuario
export function deleteAccountUser (idUser){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/user/deleteAccount/${idUser}`);
            window.location.reload();
            window.location.href =  '/';
            return dispatch({ type: 'DELETE_ACCOUNT', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtiene toda información de sesión del usuario
export function getUserInfo(dispatch, data){
    try {
        return dispatch({ type: 'GET_USER_INFO', payload: data });
    } catch (error) {
        console.log(error);
    }
};

//!IMPLEMENTAR deleteAccountUser o logicalDeletionUser

//Se usa para recuperar contraseña cuando el usuario bloquea la cuenta
export function recoverPassword (idUser, payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/user/recoverPassword/${idUser}`, payload);
            window.location.href =  '/login';
            return dispatch({ type: 'CHANGE_PASSWORD_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza la constraseña de un usuario
export function changePassword (payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/user/changePasswordr`, payload);
            window.location.href =  '/login';
            return dispatch({ type: 'CHANGE_PASSWORD', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae toda la información del usuario
export function getAllInfoUser(idUser){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getAllInfoUser/${idUser}`);
            return dispatch({ type: 'GET_ALL_INFO_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza la información del usuario
export function putUserInfo (idUser, payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/user/putUserInfo/${idUser}`, payload);
            window.location.href =  '/panelUser/allInfoUser';
            return dispatch({ type: 'PUT_INFO_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Crea la dirección de un usuario
export function postAddress (idUser, payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.post(`http://localhost:3001/user/postAddress/${idUser}`, payload);
            window.location.href =  `/panelUser/allInfoUser/${idUser}`;
            return dispatch({ type: 'POST_ADDRESS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Actualiza la dirección de un usuario
export function putAddress (idUser, idAddress, payload){
    try {
        return async function (dispatch) {
            const { data } = await axios.put(`http://localhost:3001/user/putAddress/${idUser}/${idAddress}`, payload);
            window.location.href =  `/panelUser/allInfoUser/${idUser}`;
            dispatch({ type: 'PUT_ADDRESS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todas las direcciones del Usuario
export function getAddress (idUser) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getAddress/${idUser}`);
            return dispatch({ type: 'GET_ADDRESS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Obtiene una dirección en específico por ID
export function getIdAddress (idAddress) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getIdAddress/${idAddress}`);
            return dispatch({ type: 'GET_ID_ADDRESS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Elimina permanetemente una dirección
export function deleteAddress (idAddress){
    try {
        return async function (dispatch) {
            const { data } = await axios.delete(`http://localhost:3001/user/deleteAddress/${idAddress}`);
            window.location.reload();
            return dispatch({ type: 'DELETE_ADDRESS', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};



//^ORDERS PANEL USER--------------------------------------------------------------------------------
//!postOrders Y LOCAL STORAGE CON CARRITO

//Trae todas las órdenes activas de un usuario 
export function getIdUserOrders (idUser){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getIdUserOrders/${idUser}`);
            return dispatch({ type: 'GET_ORDERS_HISTORY_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};

//Trae todo el HISTORIAL DE ORDENES de un usuario (Órdenes entregadas) en el Panel del User
export function getUserOrdersDelivered (idUser){
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/user/getUserOrdersDelivered/${idUser}`);
            return dispatch({ type: 'GET_ORDERS_HISTORY_USER', payload: data });
        };
    } catch (error) {
        console.log(error);
    }
};