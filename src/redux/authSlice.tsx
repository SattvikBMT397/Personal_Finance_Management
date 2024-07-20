import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';

import { UserData } from '../utils/Interface/types';

export interface UserState  {
    currentUser: UserData | null
}

const initialState: UserState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserData>) => {
            state.currentUser = action.payload;
            sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.currentUser = null;
            sessionStorage.removeItem('currentUser'); 
        },
        updateUser: (state, action: PayloadAction<UserData>) => {
            state.currentUser = action.payload;
        },
        addBudget: (state, action: PayloadAction<{ category: string; amount: string }>) => {
            const { category, amount } = action.payload;
            if (state.currentUser && state.currentUser.budget) {

                const newBudget = state.currentUser.budget ? [...state.currentUser.budget] : [];

                const existingIndex = newBudget.findIndex(item => item.category === category);
                if (existingIndex !== -1) {
                    // Category already exists, update the amount
                    newBudget[existingIndex].amount = amount;
                } else {
                    newBudget.push({category, amount});
                }

                state.currentUser = {
                    ...state.currentUser,
                    budget: newBudget,
                };

                sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                // Save updated users to localforage or wherever your users are stored
                updateBudget(state.currentUser);
            }
        },
        editBudget: (state, action: PayloadAction<{ index: number; category: string; amount: string }>) => {
            if (state.currentUser && state.currentUser.budget) {
                const updatedBudget = [...state.currentUser.budget];
                updatedBudget[action.payload.index] = {
                    category: action.payload.category,
                    amount: action.payload.amount,
                };

                state.currentUser = {
                    ...state.currentUser,
                    budget: updatedBudget,
                };

                // Save updated currentUser to localforage
                sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                // Update users in localforage
                updateBudget(state.currentUser);
            }
        },
        deleteBudget: (state, action: PayloadAction<number>) => {
            if (state.currentUser && state.currentUser.budget) {
                const updatedBudget = state.currentUser.budget.filter((_, index) => index !== action.payload);

                state.currentUser = {
                    ...state.currentUser,
                    budget: updatedBudget,
                };

                // Save updated currentUser to localforage
                sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                // Update users in localforage
                updateBudget(state.currentUser);
            }
        },
        addTranscation: (state, action: PayloadAction<{type:string, category: string; cost: number, date:Date }> ) =>{
             
            if (state.currentUser) {

                const newTransaction = state.currentUser.transaction ? [...state.currentUser.transaction] : [];


                newTransaction.push(action.payload);

                state.currentUser = {
                    ...state.currentUser,
                    transaction: newTransaction,
                };

                // Save updated currentUser to localforage
                sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                // Save updated users to localforage or wherever your users are stored
                updateTransaction(state.currentUser);
            }

        },
        deleteTransaction: (state, action: PayloadAction<number>) => {
            if (state.currentUser && state.currentUser.transaction) {
              const updatedTransactions = state.currentUser.transaction.filter((_, index) => index !== action.payload);
              state.currentUser = { ...state.currentUser, transaction: updatedTransactions };
                sessionStorage.setItem('currentUser', JSON.stringify(state.currentUser));
              updateTransaction(state.currentUser);
            }
          },
        
    },
});

// Function to update users in localforage
const updateBudget = (updatedUser: UserData) => {
    console.log("ff", updatedUser)
    localforage.getItem<UserData[]>('users')
        .then((users: UserData[] | null) => {
            if (users) {
                const updatedUsers = users.map(user => {
                    if (user.id === updatedUser.id) {
                        return { ...user, budget: updatedUser.budget };
                    }
                    return user;
                });
                return localforage.setItem('users', updatedUsers); 
            }
            return null; 
        })
        .then(updatedUsers => {
            if (updatedUsers) {
                console.log('Updated users in localforage:', updatedUsers);
            } else {
                console.log('No users found or updated');
            }
        })
        .catch(err => {
            console.error('Error fetching or updating users from localforage:', err);
            if (err.name === 'DataError') {
                console.error('DataError occurred: Likely an issue with data integrity or format');
            }
            
        });
};


const updateTransaction = (updatedUser: UserData) => {
    console.log("ff", updatedUser)
    localforage.getItem<UserData[]>('users')
        .then((users: UserData[] | null) => {
            if (users) {
                const updatedUsers = users.map(user => {
                    if (user.id === updatedUser.id) {
                        return { ...user, transaction: updatedUser.transaction };
                    }
                    return user;
                });
                return localforage.setItem('users', updatedUsers);
            }
            return null;
        })
        .then(updatedUsers => {
            if (updatedUsers) {
                console.log('Updated users in localforage:', updatedUsers);
            } else {
                console.log('No users found or updated');
            }
        })
        .catch(err => {
            console.error('Error fetching or updating users from localforage:', err);
            if (err.name === 'DataError') {
                console.error('DataError occurred: Likely an issue with data integrity or format');
            }

        });
};

export const { login, logout, addBudget, updateUser, addTranscation,deleteTransaction, editBudget,deleteBudget } = userSlice.actions;


export default userSlice.reducer;
