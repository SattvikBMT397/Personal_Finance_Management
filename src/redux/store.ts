// store.ts
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import authReducer, { UserState } from './authSlice';

const store: EnhancedStore<{ auth: UserState }> = configureStore({
    reducer: {
        auth: authReducer,
        // Add other reducers if needed
    },
});

// Define RootState as the type of the combined state from all reducers
export type RootState = ReturnType<typeof store.getState>;

export default store;
