import localforage from "localforage";
import { updateUser } from "../redux/authSlice";
import { UserData } from "./Interface/types";

const initializeUserState = async (dispatch: any) => {
    try {
        const storedUser = await localforage.getItem<UserData>('currentUser');
        if (storedUser) {
            dispatch(updateUser(storedUser)); // Update Redux state with stored user
        } 
    } catch (error) {
        console.error('Error initializing user state from localforage:', error);
    }
};
export default initializeUserState
