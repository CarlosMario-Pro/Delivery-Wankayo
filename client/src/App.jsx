import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from "../src/redux/actions/index";
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import WhatsApp from "./components/WhatsApp/WhatsApp";
import Scroll from "./components/Scroll/Scroll";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DeleteAccount from './pages/DeleteAccount/DeleteAccount';
import Detail from './pages/Detail/Detail';
import SearchResults from './pages/SearchResults/SearchResults';
import RecoverPassword from './pages/PanelUser/InfoUser/RecoverPassword/RecoverPassword';
import ChangePassword from './pages/PanelUser/InfoUser/ChangePassword/ChangePassword';
import ShoppingCart from './pages/Detail/ShoppingCart/ShoppingCart';
import Error404 from './pages/Error404/Error404';

import Footer from './components/Footer/Footer';
import WorkWithUs from './pages/WorkWithUs/WorkWithUs';
import OurHistory from './pages/Home/OurHistory/OurHistory';
import TermsConditions from './pages/Home/TermsConditions/TermsConditions';
import DataTreatment from './pages/Home/DataTreatment/DataTreatment';
import Contact from './pages/Home/Contact/Contact';

//PANEL ADMIN
import Products from './pages/PanelAdmin/Products/Products';
import PostProducts from './pages/PanelAdmin/Products/AllProducts/PostProducts/PostProducts';
import PutProduct from './pages/PanelAdmin/Products/AllProducts/PutProduct/PutProduct';
import CloudinaryAll from './pages/PanelAdmin/Products/AllProducts/PostProducts/CloudinaryAll/CloudinaryAll';
import Categories from './pages/PanelAdmin/Products/Categories/Categories';
import PostCategories from './pages/PanelAdmin/Products/Categories/PostCategories/PostCategories';
import PutCategory from './pages/PanelAdmin/Products/Categories/PutCategory/PutCategory';
import UserAdmin from './pages/PanelAdmin/UserAdmin/UserAdmin';
import GetUserAdmin from './pages/PanelAdmin/UserAdmin/GetUser/GetUser';
import PostUserAdmin from './pages/PanelAdmin/UserAdmin/PostUser/PostUser';
import PutUserAdmin from './pages/PanelAdmin/UserAdmin/PutUser/PutUser';
import Accompanyings from './pages/PanelAdmin/Products/Accompanyings/Accompanyings';
import PostAccompanyings from './pages/PanelAdmin/Products/Accompanyings/PostAccompanyings/PostAccompanyings';
import PutAccompanyings from './pages/PanelAdmin/Products/Accompanyings/PutAccompanyings/PutAccompanyings';
import Drinks from './pages/PanelAdmin/Products/Drinks/Drinks';
import PostDrinks from './pages/PanelAdmin/Products/Drinks/PostDrinks/PostDrinks';
import PutDrinks from './pages/PanelAdmin/Products/Drinks/PutDrinks/PutDrinks';
import Extras from './pages/PanelAdmin/Products/Extras/Extras';
import PostExtras from './pages/PanelAdmin/Products/Extras/PostExtras/PostExtras';
import PutExtras from './pages/PanelAdmin/Products/Extras/PutExtras/PutExtras';
import Sauces from './pages/PanelAdmin/Products/Sauces/Sauces';
import PostSauces from './pages/PanelAdmin/Products/Sauces/PostSauces/PostSauces';
import PutSauces from './pages/PanelAdmin/Products/Sauces/PutSauces/PutSauces';
import Orders from './pages/PanelAdmin/Orders/Orders';
import OrdersPreparation from './pages/PanelAdmin/Orders/OrdersPreparation/OrdersPreparation';
import OrdersOnTheWay from './pages/PanelAdmin/Orders/OrdersOnTheWay/OrdersOnTheWay';
import OrdersDelivered from './pages/PanelAdmin/Orders/OrdersDelivered/OrdersDelivered';
import OrdersHistory from './pages/PanelAdmin/OrdersHistory/OrdersHistory';

//PANEL USER
import InfolUser from './pages/PanelUser/InfoUser/InfoUser';
import UpdateInfoUser from './pages/PanelUser/InfoUser/UpdateInfoUser/UpdateInfoUser';
import UpdateAddressUser from './pages/PanelUser/InfoUser/UpdateAddressUser/UpdateAddressUser';
import PostAddress from './pages/PanelUser/InfoUser/PostAddress/PostAddress';
import OrdersUser from './pages/PanelUser/OrdersUser/OrdersUser';
import OrdersHistoryUser from './pages/PanelUser/OrdersHistoryUser/OrdersHistoryUser';




export default function App() {
    const dispatch = useDispatch();
    const { userInfoLogin } = useSelector((state) => state);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3001/getUserData", {
                    withCredentials: true,
                });
                if (data && Object.keys(data).length > 0) {
                    dispatch(getUserInfo(dispatch, data));
                }
            } catch (error) {
                console.error("Error al obtener la información del usuario:", error);
            } finally {
                setLoading(false);
            }
        };
        if (Object.keys(userInfoLogin).length === 0) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [dispatch, userInfoLogin]);

    if (loading) {
        return null;
    }

    const protectRoute = (Component, role) => {
        const allowedRoles = ['admin', 'superAdmin'];
        if (allowedRoles.includes(role)) {
            // console.log(userInfoLogin)
            return Component;
        } else {
            return <Error404 />;
        }
    };


    return (
        <div>
            <NavBar />
            <WhatsApp />
            <Scroll />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
                <Route path='/deleteAccount/:idUser' element={ <DeleteAccount /> } />
                <Route path='/productDetail/:idProduct' element={ <Detail /> } />
                <Route path='/searchResults' element={ <SearchResults /> } />
                <Route path='/recoverPassword/:idUser' element={ <RecoverPassword /> } />
                <Route path='/changePassword' element={ <ChangePassword /> } />
                <Route path='/shoppingCart/' element={ <ShoppingCart /> } />


                {/* PANEL ADMIN */}
                <Route path='/panelAdmin/products' element={ <Products /> } />
                <Route path="/panelAdmin/products" element={protectRoute(<Products />, userInfoLogin.role)} />
                
                <Route path='/panelAdmin/products/postProducts' element={protectRoute(<PostProducts />, userInfoLogin.role) } />
                <Route path='/panelAdmin/products/putProduct/:idProduct' element={protectRoute(<PutProduct />, userInfoLogin.role) } />
                <Route path='/panelAdmin/products/postProduct/cloudinaryAll' element={protectRoute(<CloudinaryAll />, userInfoLogin.role) } />

                <Route path='/panelAdmin/products/accompanyings' element={protectRoute(<Accompanyings />, userInfoLogin.role) } /> 
                <Route path='/panelAdmin/products/accompanyings/postAccompanyings' element={protectRoute(<PostAccompanyings />, userInfoLogin.role) } />
                <Route path='/panelAdmin/products/accompanyings/putAccompanyings/:idAccompanyings' element={protectRoute(<PutAccompanyings />, userInfoLogin.role) } />

                <Route path='/panelAdmin/products/drinks' element={protectRoute(<Drinks />, userInfoLogin.role) } />
                <Route path='/panelAdmin/products/drinks/postDrinks' element={protectRoute(<PostDrinks />, userInfoLogin.role) } />
                <Route path='/panelAdmin/products/drinks/putDrinks/:idDrinks' element={protectRoute(<PutDrinks />, userInfoLogin.role) } />

                <Route path='/panelAdmin/products/extras' element={protectRoute(<Extras />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/extras/postExtras' element={protectRoute(<PostExtras />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/extras/putExtras/:idExtras' element={protectRoute(<PutExtras />, userInfoLogin.role)  } />

                <Route path='/panelAdmin/products/sauces' element={protectRoute(<Sauces />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/sauces/postSauces' element={protectRoute(<PostSauces />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/sauces/putSauces/:idSauces' element={protectRoute(<PutSauces />, userInfoLogin.role)  } />

                <Route path='/panelAdmin/products/categories' element={protectRoute(<Categories />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/categories/postCategories' element={protectRoute(<PostCategories />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/products/categories/putCategory/:idCategory' element={protectRoute(<PutCategory />, userInfoLogin.role)  } />

                <Route path='/panelAdmin/userAdmin' element={protectRoute(<UserAdmin />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/userAdmin/getUserAdmin' element={protectRoute(<GetUserAdmin />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/userAdmin/postUserAdmin' element={protectRoute(<PostUserAdmin />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/userAdmin/putUserAdmin/:idUserAdmin' element={protectRoute(<PutUserAdmin />, userInfoLogin.role)  } />

                <Route path='/panelAdmin/orders' element={protectRoute(<Orders />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/orders/OrdersPreparation' element={protectRoute(<OrdersPreparation />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/orders/OrdersOnTheWay' element={protectRoute(<OrdersOnTheWay />, userInfoLogin.role)  } />
                <Route path='/panelAdmin/orders/OrdersDelivered' element={protectRoute(<OrdersDelivered />, userInfoLogin.role)  } />


                {/* PANEL USER */}
                <Route path='/OrdersHistory/history' element={ <OrdersHistory /> } />

                <Route path='/ourHistory' element={ <OurHistory /> } />
                <Route path='/termsConditions' element={ <TermsConditions /> } />
                <Route path='/dataTreatment' element={ <DataTreatment /> } />
                <Route path='/contact' element={ <Contact /> } />

                <Route path='/panelUser/allInfoUser/:idUser' element={ <InfolUser /> } />
                <Route path='/panelUser/allInfoUser/UpdateInfoUser/:idUser' element={ <UpdateInfoUser /> } />
                <Route path='/panelUser/allInfoUser/UpdateAddressUser/:idUser/:idAddress' element={ <UpdateAddressUser /> } />
                <Route path='/panelUser/allInfoUser/postAddress/:idUser' element={ <PostAddress /> } />

                <Route path='/panelUser/ordersUser/:idUser' element={ <OrdersUser /> } />

                <Route path='/panelUser/ordersHistoryUser/:idUser' element={ <OrdersHistoryUser /> } />


                <Route path='/workWithUs' element={ <WorkWithUs /> } />

                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </div>
    );
};