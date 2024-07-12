import { Controller, Control } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';


interface CommonControllerProps extends Omit<TextFieldProps, 'name' | 'control'> {
    name: string;
    control: Control<any>;
}

const CommonController: React.FC<CommonControllerProps> = ({ name, control, ...rest }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    {...rest}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
            )}
        />
    );
};


export default CommonController;
