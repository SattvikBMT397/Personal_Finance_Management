
import { updateUser } from "../redux/authSlice";
import { UserData } from "./Interface/types";

const initializeUserState = async (dispatch: any) => {
    try {
        const storedUser = await sessionStorage.getItem('currentUser');
        if (storedUser) {
            const userData: UserData = JSON.parse(storedUser);
            dispatch(updateUser(userData));
        }
    } catch (error) {
        console.error('Error initializing user state from sessionStorage:', error);
    }
};

export default initializeUserState;
