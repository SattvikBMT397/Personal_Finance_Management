import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';

interface AuthState {
    isLoggedIn: boolean;
    userData: any | null; 
}

const initialState: AuthState = {
    isLoggedIn: localforage.getItem('userStatus') === 'loggedIn',
    userData: localforage.getItem('userData') ?  localStorage.getItem('userData')! : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any>) {
            state.isLoggedIn = true;
            state.userData = action.payload;
            localforage.setItem('userStatus', 'loggedIn');
            localforage.setItem('userData', (action.payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userData = null;
            localforage.removeItem('userStatus');
            localforage.removeItem('userData');
        },
        updateUser: (state, action) => {
            state.userData = action.payload;
        },
    },
});


export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
