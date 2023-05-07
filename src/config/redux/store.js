import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../pages/Login/slice/userSlice';

export default configureStore({
    reducer: {
        user: userReducer,
    },
});
