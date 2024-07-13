import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/authSlice';
import { TextField, Button } from '@mui/material';


const ProfilePage = () => {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        password: user.password,
    });

    const handleInputChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.password]: e.target.value,
        });
    };

    const handleUpdate = () => {
        dispatch(updateUser(formData));
        setEditing(false); 
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {editing ? (
                <div>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleUpdate}>Update</Button>
                </div>
            ) : (
                <div>
                    <p>Password: {user.password}</p>
                    <p>Email: {user.email}</p>
                    <Button onClick={() => setEditing(true)}>Edit</Button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
