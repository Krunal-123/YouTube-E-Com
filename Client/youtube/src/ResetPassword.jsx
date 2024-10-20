import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { errorToast } from '../components/ErrorToast';
import { Toast } from '../components/SuccessToast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: '#e0f7fa', // Light cyan background
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
});

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { email } = useParams();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorToast("Password Not Match",2000)
      return;
    }

    try {
      const res = await axios.patch('http://localhost:3000/reset-password', { email, password });
      if (res.data == 'password_reset') {
        Toast('Password Reset Successfully.',2000)
        navigate('/login');
        return;
      } else {
        errorToast('Failed to reset password. Please try again.',2000)
        return;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      errorToast('An error occurred. Please try again later.',2000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', background: 'linear-gradient(to right, #1976d2, #004ba0)' }}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              backgroundColor: '#ffffff',
              maxWidth: 400,
              mt: 5,
              p: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <i className="fas fa-lock" style={{ color: 'white' }}></i>
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
              Reset Password
            </Typography>
            <form sx={{ mt: 1 }} onSubmit={handlePasswordReset} className="w-[350px]">
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ backgroundColor: '#f0f0f0', borderRadius: 1, mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ backgroundColor: '#f0f0f0', borderRadius: 1, mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                }}
              >
                Reset Password
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
