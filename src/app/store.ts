import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const storage = {
    getItem: (key: string) => {
        return Promise.resolve(window.localStorage.getItem(key))
    },
    setItem: (key: string, value: string) => {
        return Promise.resolve(window.localStorage.setItem(key, value))
    },
    removeItem: (key: string) => {
        return Promise.resolve(window.localStorage.removeItem(key))
    },
}

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch