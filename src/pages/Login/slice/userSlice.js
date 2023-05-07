import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setuser: (state, action) => {
            console.log('setUser');
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { setuser } = userSlice.actions;
export default userSlice.reducer;
