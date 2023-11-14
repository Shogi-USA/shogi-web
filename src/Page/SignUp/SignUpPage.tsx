import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserCreationRequest } from '../../types'; // Assuming UserCreationRequest is defined in your types
import {
  Box,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import FormInput from './FormInput';
import styles from './sign-up-page.module.scss';

// Define the schema for the registration form
const registerSchema = object({
  firstName: string(),
  lastName: string(),
  displayName: string(),
  username: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password')
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

/**
 * The registration page component.
 */
const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const { registerNewUser } = useAuth();
  const navigate = useNavigate();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  // Reset the form if it was successfully submitted
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  // Handle form submission
  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    setLoading(true);
    console.log('onSubmitHandler', values);
    try {
      const userCreationRequest = {
        firstName: values['firstName'],
        lastName: values['lastName'],
        displayName: values['displayName'],
        username: values['username'],
        email: values['email'],
        password: values['password'],
        categoryId: 1,
        branchId: 1,
        levelId: 1,
        isNewUser: true,
      }
      await registerNewUser(userCreationRequest as UserCreationRequest);
      // Handle successful registration, such as redirecting to a login page
      navigate('/mypage'); // Redirect to MyPage on successful registration
    } catch (error) {
      if (error instanceof Error) {
        // Handle registration error, like showing an error message to the user
        console.error('Registration failed:', error.message);
      }
    } finally {
      setLoading(false);
    }
    console.log(values);
  };

  return (
    <Box sx={{ maxWidth: '30rem' }} className={styles.root}>
      <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>
        Register
      </Typography>
      <FormProvider {...methods}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <FormInput
            name='firstName'
            required
            fullWidth
            label='First Name'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='lastName'
            required
            fullWidth
            label='Last Name'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='displayName'
            fullWidth
            label='Display Name'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='username'
            required
            fullWidth
            label='Username'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='email'
            required
            fullWidth
            label='Email Address'
            type='email'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='password'
            required
            fullWidth
            label='Password'
            type='password'
            sx={{ mb: 2 }}
          />
          <FormInput
            name='passwordConfirm'
            required
            fullWidth
            label='Confirm Password'
            type='password'
            sx={{ mb: 2 }}
          />
          <LoadingButton
            variant='contained'
            fullWidth
            type='submit'
            loading={loading}
            sx={{ py: '0.8rem', mt: '1rem' }}
          >
            Register
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default SignUpPage;
