const initialState = {
    products: [],
    allProducts: [],
    productDetails: {},
    categories: {},
    categoriesId: [],
            
    productsLogical: [],
    allProductsLogical: [],
    categoriesLogical: {},

    accompanyings: [],
    accompanyingsDetails: {},

    drinks: [],
    drinksDetails: {},
    
    extras: [],
    extrasDetails: {},
    
    sauces: [],
    saucesDetails: {},
    
    user: [],
    adminDetails: {},
    userSession: null,
    userInfoLogin: {},

    ordersPendings: [],
    ordersInPreparation: [],
    ordersOnTheWay: [],
    ordersDelivered: [],
    ordersHistoryDelivered: [],
    ordersHistory: [],
    changeStatusOrder: {},

    getAllUser: [],
    allInfoUser: {},

    addressUser: [],
    idAddressUser: {},
    
    orderHistoryUser: [],

    userOrderActivesPending: [],
    userOrderActivesInPreparation: [],
    userOrderActivesOnTheWay: [],

};


export default function rootReducer (state= initialState, action) {
    switch (action.type) {
        //PRODUCTOS
        case 'GET_PRODUCTS':
            const categories = action.payload.reduce((accumulator, current) => {
                const { category } = current;
                if (!accumulator[category]) {
                    accumulator[category] = [];
                }
                accumulator[category].push(current);
                return accumulator;
            }, {});
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload,
                categories,
            };
        case 'GET_PRODUCTS_LOGICAL':
            const categoriesLogical = action.payload.reduce((accumulator, current) => {
                const { category } = current;
                if (!accumulator[category]) {
                    accumulator[category] = [];
                }
                accumulator[category].push(current);
                return accumulator;
            }, {});
            return {
                ...state,
                productsLogical: action.payload,
                allProductsLogical: action.payload,
                categoriesLogical,
            };
        case 'GET_PRODUCT_DETAIL':
            return{
                ...state,
                productDetails: action.payload
            };
        case 'GET_NAME_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            };
                // allProducts: action.payload
        case 'POST_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
                allProducts: [...state.allProducts, action.payload]
            };
        case 'PUT_PRODUCT': {
                return {
                    ...state,
                };
            }
        case 'DELETE_PRODUCT': 
            return {
                ...state,
            };
        case 'TRUE_LOGICAL_DELETION_PRODUCT': 
            return {
                ...state,
            };
        case 'FALSE_LOGICAL_DELETION_PRODUCT': 
            return {
                ...state,
            };


            
        //USERADMIN
        case 'POST_USERADMIN':
            return {
                ...state,
                user: action.payload
            };  
        case 'GET_ADMIN_DETAIL':
            
            return{
                ...state,
                adminDetails: action.payload
            };         
        case 'GET_USERADMIN':
            return {
                ...state,
                user: action.payload
            }
        case 'PUT_USERADMIN': {
            return {
                ...state,
            };
        }
        case 'DELETE_USERADMIN': 
            return {
                ...state,
            };



        //CATEGORIAS
        case 'GET_CATEGORIES':
            // console.log('Action ', action.payload)
            return {
                ...state,
                categoriesId: action.payload
            }
        case 'POST_CATEGORY':
            return {
                ...state,
                categories: action.payload
            };
        case 'PUT_CATEGORY': 
            return {
                ...state,
            };
        case 'DELETE_CATEGORY': 
            return {
                ...state,
            };



        //BEBIDAS
        case 'GET_DRINKS':
            return {
                ...state,
                drinks: action.payload
            }
        case 'GET_DRINK_DETAIL':
            return{
                ...state,
                drinksDetails: action.payload
            };
        case 'POST_DRINKS':
            return {
                ...state,
                drinks: action.payload
            }
        case 'PUT_DRINKS':
            return {
                ...state
            }
        case 'DELETE_DRINKS':
            return {
                ...state
            }



        //ACCOMPANYINGS
        case 'GET_ACCOMPANYINGS':
            return {
                ...state,
                accompanyings: action.payload
            }
        case 'GET_ACCOMPANYING_DETAIL':
            return{
                ...state,
                accompanyingsDetails: action.payload
            };
        case 'POST_ACCOMPANYINGS':
            return {
                ...state,
                accompanyings: action.payload
            }
        case 'PUT_ACCOMPANYINGS':
            return {
                ...state
            }
        case 'DELETE_ACCOMPANYINGS':
            return {
                ...state
            }



        //EXTRAS
        case 'GET_EXTRAS':
            return {
                ...state,
                extras: action.payload
            }
        case 'GET_EXTRA_DETAIL':
            return{
                ...state,
                extrasDetails: action.payload
            };
        case 'POST_EXTRAS':
            return {
                ...state,
                extras: action.payload
            }
        case 'PUT_EXTRAS':
            return {
                ...state
            }
        case 'DELETE_EXTRAS':
            return {
                ...state
            }



        //SAUCES
        case 'GET_SAUCES':
            return {
                ...state,
                sauces: action.payload
            }
        case 'GET_SAUCE_DETAIL':
            return{
                ...state,
                saucesDetails: action.payload
            };
        case 'POST_SAUCES':
            return {
                ...state,
                sauces: action.payload
            }
        case 'PUT_SAUCES':
            return {
                ...state
            }
        case 'DELETE_SAUCES':
            return {
                ...state
            }



        //LOGIN
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                userSession: action.payload
            }
            
        case 'REGISTER_USER': {
            return {
                ...state,
                user: action.payload,
                userSession: action.payload
            }
        }


        
        //GET INFO USER
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfoLogin: action.payload
            }


    
        //GET INFO USER
        case 'GET_ALL_INFO_USER':
            return {
                ...state,
                allInfoUser: action.payload
            }
        //GET INFO USER
        case 'PUT_INFO_USER':
            return {
                ...state,
            }










        //ORDERS
        case 'GET_ORDERS_PENDINGS':
            return {
                ...state,
                ordersPendings: action.payload
            }

        case 'GET_ORDERS_INPREPARATION':
            return {
                ...state,
                ordersInPreparation: action.payload
            }
        case 'GET_ORDERS_ON_THE_WAY':
            return {
                ...state,
                ordersOnTheWay: action.payload
            }
        case 'GET_ORDERS_DELIVERED':    //^PARA EL PANEL DEL USUARIO
            return {
                ...state,
                ordersDelivered: action.payload
            }
        case 'GET_ORDERS_HISTORY_DELIVERED':
            return {
                ...state,
                ordersHistoryDelivered: action.payload
            }
        case 'GET_ORDERS_HISTORY':
            return {
                ...state,
                ordersHistory: action.payload
            }




        case 'CHANGE_STATUS_ORDER':
            return {
                ...state,
                changeStatusOrder: action.payload
            }

        case 'CHANGE_STATUS_ORDER_PREVIUS':
            return {
                ...state,
                changeStatusOrder: action.payload
            }



        case 'GET_ADDRESS':
            return {
                ...state,
                addressUser: action.payload
            }
        case 'POST_ADDRESS':
            return {
                ...state,
                addressUser: action.payload
            }

        case 'GET_ID_ADDRESS':
            return {
                ...state,
                idAddressUser: action.payload
            }
            case 'PUT_ADDRESS': 
            return {
                ...state,
            };
            
            
            
            
            
            
            case 'GET_ORDERS_HISTORY_USER':
                return {
                    ...state,
                    orderHistoryUser: action.payload
                }
            case 'GET_USER_ORDER_ACTIVES_PENDING':
                return {
                    ...state,
                    userOrderActivesPending: action.payload
                }
            case 'GET_USER_ORDER_ACTIVES_IN_PREPARATION':
                return {
                    ...state,
                    userOrderActivesInPreparation: action.payload
                }
            case 'GET_USER_ORDER_ACTIVES_ON_THE_WAY':
                return {
                    ...state,
                    userOrderActivesOnTheWay: action.payload
                }
     

        default:
            return state;
    };
};