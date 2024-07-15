import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import localforage from 'localforage';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Container,
  Link,
  Grid,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../../utils/schema/LoginSignupSchema';
import { UserData } from '../../utils/Interface/types';
import CommonController from '../../components/commonComponent/commonController';
import CommonButton from '../../components/commonComponent/commonButton';

const SignupForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: UserData) => {
    setSubmitting(true);
    setLoading(true);
    setTimeout(async () => {
      try {
        // Fetch existing user data array from localforage or initialize an empty array
        let users: UserData[] = await localforage.getItem('users') || [];

        // Generate ID based on array length
        const id = (users.length + 1).toString(); // You can use a UUID library for more robust IDs

        // Add ID to user data
        const userDataWithId: UserData = {
          ...data,
          id,
          budget: [],
          transaction: [],
          expenses: []
        };

        // Add new user data to the array
        users.push(userDataWithId);

        // Store the updated array back in localforage
        await localforage.setItem('users', users);

        alert('Signup Successful!');
        navigate("/login");
      } catch (error) {
        console.error('Error storing data:', error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },1000)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: '#1C8E85' }}>
          <LockOutlinedIcon />
        </Avatar>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              Create an account
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CommonController
                  name="name"
                  control={control}
                  label="Full Name"
                  type="text"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <CommonController
                  name="email"
                  control={control}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <CommonController
                  name="password"
                  control={control}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
            </Grid>
            <CardActions style={{ marginTop: '16px' }}>
              <CommonButton
                type="submit"
                disabled={submitting}
                loading={loading}
              >
                {submitting ? 'Submitting...' : 'Sign up'}
              </CommonButton>
            </CardActions>
          </form>
        </CardContent>
        <CardContent>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" sx={{ color: "#1C8E85" }}>
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupForm;
