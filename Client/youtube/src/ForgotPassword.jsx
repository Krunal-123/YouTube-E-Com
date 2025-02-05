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
import { Link, useNavigate } from 'react-router-dom';
import { ErrorToast } from '../components/ErrorToast';
import { Toast } from '../components/SuccessToast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Purple
    },
    secondary: {
      main: '#ff5722', // Deep orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCheck, setOTPCHECK] = useState();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://youtube-e-com-backend.onrender.com/send-otp', { email });
      if (res.data === 'User not found') {
        ErrorToast('User not found', 2000)
      } else {
        Toast('OTP sent to your email.', 2000)
        setOTPCHECK(res.data);
        setOtpSent(true);
      }
    } catch (error) {
      ErrorToast('An error occurred. Please try again later.', 1000)
      console.error('An error occurred:', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp == otpCheck) {
      navigate(`/reset-password/${email}`);
      Toast('OTP Match Correctly', 1000)
    } else {
      ErrorToast('Invalid OTP. Please try again.', 2000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', background: 'linear-gradient(to right, #673ab7, #512da8)' }}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 3, padding: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
              Forgot Password
            </Typography>
            <form sx={{ mt: 1 }} onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="w-[350px]">
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} sx={{ backgroundColor: '#f0f0f0', borderRadius: 1 }} />
              {otpSent && (
                <TextField margin="normal" required fullWidth id="otp" label="Enter OTP" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ backgroundColor: '#f0f0f0', borderRadius: 1 }} />
              )}
              <Button type="submit" fullWidth variant="contained" color={'primary'} sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold', boxShadow: '0 3px 5px rgba(0,0,0,0.2)' }}>
                {otpSent ? 'Verify OTP' : 'Send OTP'}
              </Button>
              <div className="text-center text-xl text-blue-700 hover:underline">
                <Link to="/login">
                  Go Back
                </Link>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
