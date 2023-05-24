const initialState = {
    products: [],
    allProducts: [],
    productDetails: {},
    categories: {},
    categoriesId: [],
            
    productsLogical: [],
    allProductsLogical: [],//

    categoriesLogical: {},

    accompanyings: [],
    accompanyingsLogical: [],
    accompanyingsDetails: {},

    drinks: [],
    drinksLogical: [],
    drinksDetails: {},
    
    extras: [],
    extrasLogical: [],
    extrasDetails: {},
    
    sauces: [],
    saucesLogical: [],
    saucesDetails: {},
    
    user: [],
    adminDetails: {},

    userInfoLogin: {},

    ordersPendings: [],
    ordersInPreparation: [],
    ordersOnTheWay: [],
    ordersDelivered: [],
    ordersHistoryDelivered: [],
    ordersHistory: [],
    changeStatusOrder: {},

    getAllUser: [],//No tiene 'Case en el Reducer'
    allInfoUser: {},

    addressUser: [],
    idAddressUser: {},
    
    orderHistoryUser: [],

    postOrder: [],

    selectedProducts: [],
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
        case 'GET_DRINKS_LOGICAL':
            return {
                ...state,
                drinksLogical: action.payload
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
        case 'TRUE_LOGICAL_DELETION_DRINK': 
            return {
                ...state,
            };
        case 'FALSE_LOGICAL_DELETION_DRINK': 
            return {
                ...state,
            };






        //ACCOMPANYINGS
        case 'GET_ACCOMPANYINGS':
            return {
                ...state,
                accompanyings: action.payload
            }
        case 'GET_ACCOMPANYING_LOGICAL':
            return {
                ...state,
                accompanyingsLogical: action.payload
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
        case 'TRUE_LOGICAL_DELETION_ACCOMPANYNG': 
            return {
                ...state,
            };
        case 'FALSE_LOGICAL_DELETION_ACCOMPANYNG': 
            return {
                ...state,
            };



        //EXTRAS
        case 'GET_EXTRAS':
            return {
                ...state,
                extras: action.payload
            }
        case 'GET_EXTRAS_LOGICAL':
            return {
                ...state,
                extrasLogical: action.payload
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
        case 'TRUE_LOGICAL_DELETION_EXTRAS': 
            return {
                ...state,
            };
        case 'FALSE_LOGICAL_DELETION_EXTRAS': 
            return {
                ...state,
            };




        //SAUCES
        case 'GET_SAUCES':
            return {
                ...state,
                sauces: action.payload
            }
        case 'GET_SAUCES_LOGICAL':
            return {
                ...state,
                saucesLogical: action.payload
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
        case 'TRUE_LOGICAL_DELETION_SAUCES': 
            return {
                ...state,
            };
        case 'FALSE_LOGICAL_DELETION_SAUCES': 
            return {
                ...state,
            };



            
        //REGISTER
        case 'REGISTER_USER': {
            return {
                ...state
            }
        }



        //GET INFO USER
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfoLogin: action.payload
            }            
        case 'CHANGE_PASSWORD_USER':
            return {
                ...state,
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
            }
        case 'DELETE_ACCOUNT': 
            return {
                ...state,
            }
        


    
        //GET INFO USER
        case 'GET_ALL_INFO_USER':
            return {
                ...state,
                allInfoUser: action.payload
            }
        case 'PUT_INFO_USER':
            return {
                ...state,
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
        case 'GET_ORDERS_DELIVERED':
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
        case 'GET_ORDERS_HISTORY_USER':
            return {
                ...state,
                orderHistoryUser: action.payload
            }




        //ORDER
        case 'POST_ORDER':
            return {
                ...state,
                postOrder: action.payload
            }
        // case 'SELECT_PRODUCTS':
        //     return {
        //         ...state,
        //         selectedProducts: action.payload,
        //     };
        case 'SELECT_PRODUCTS':
            return {
                ...state,
                selectedProducts: [
                    ...state.selectedProducts,
                    ...action.payload
                ],
            };

            
        default:
            return state;
    };
};