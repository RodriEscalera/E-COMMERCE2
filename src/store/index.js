import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./user";
import productsReducer from "./products";

export default configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,       
        
    }
});