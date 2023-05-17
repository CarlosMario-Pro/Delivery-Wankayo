import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import App from './App'
import './index.css'

import store from "./redux/store/index";
import { Provider } from "react-redux";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ToastContainer position="bottom-right" /> 
        <Provider store={ store }>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
