import { configureStore } from '@reduxjs/toolkit';

import foodieReducer from './slice/foodiesSlice'

import userReducer from './slice/UserSlice'

export const store = configureStore({
    // no reducers hence empty
    reducer:{
        foodies : foodieReducer,
        users : userReducer
    },
})
