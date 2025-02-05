import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ErrorToast } from '../components/ErrorToast';
import { Toast } from '../components/SuccessToast';
import LoadingButtonsTransition from '../components/LoadingBtn';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Youtube E-com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function SignUp() {

  const [age, setAge] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  let navigate = useNavigate()

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      setLoading(previousState => !previousState)
      const { firstName, lastName, email, number, password, confirm, gender } = event.target
      if (number.value.length < 10) {
        ErrorToast('Invalid phone number! Please Enter the 10-digit!', 3000);
        setLoading(previousState => !previousState)
        return;
      }
      if (number.value.length > 10) {
        ErrorToast('Please Enter the 10-digit Number Only!', 3000);
        setLoading(previousState => !previousState)
        return;
      }
      if (password.value == confirm.value) {
        let data = { firstName: (firstName.value).trim(), lastName: (lastName.value).trim(), number: (number.value).trim(), email: (email.value).trim(), gender: (gender.value).trim(), password: (password.value).trim(), confirm: (confirm.value).trim() }
        axios.post('https://youtube-e-com-backend.onrender.com/signup', data).then((res) => {
          if (res.data == 'user_already_exist') {
            setLoading(previousState => !previousState)
            ErrorToast('Email Already Exist', 2000)
            return;
          } else {
            navigate('/login')
            Toast('🥳New Account Created🎉', 2000)
          }
        })
        return;
      }
      else {
        ErrorToast('Check Password Again', 2000)
        setLoading(previousState => !previousState)
      }
    } catch (error) {
      setLoading(previousState => !previousState)
      console.log("Error Occured", error);
    }
  };

  return (
    <div className="text-dark pt-2 bg-[length:100%_60%] md:bg-[length:100%_100%] bg-no-repeat bg-center bg-[url('https://cdn.dribbble.com/users/6750733/screenshots/18300442/gif1.gif')]">
      <ThemeProvider theme={darkTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://media.tenor.com/q3NBbq09nuYAAAAC/youtube-logo.gif"
              sx={{ width: 56, height: 56 }}
              className='mt-2'
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={handleSubmit} className='max-md:my-3 md:my-5'>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    required
                    autoComplete=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone No"
                    name="number"
                    required
                    autoComplete="phone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    required
                    autoComplete="email"
                  />
                </Grid>

                <Grid item xs={12}>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='gender'
                      value={age}
                      label="Gender"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="Confirm"
                    label="Confirm password"
                    type="password"
                    id="confirm"
                    autoComplete="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    required
                    control={<Checkbox value="allowExtraEmails" name="check" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <LoadingButtonsTransition loading={loading} text={'Sign Up'} loadingText={'Uploading...'} />
            </form>
            <Grid container className='flex justify-center'>
              <Grid item>
                <Link href="/login" variant="body1">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ my: 2 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}