import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
import { errorToast } from '../components/ErrorToast';
import { Toast } from '../components/SuccessToast';

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
    mode: 'dark',
  },
});

export default function SignUp() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, number, password, confirm, gender, check } = event.target
    // console.log(firstName.value, lastName.value, number.value, email.value, gender.value, password.value, confirm.value, check.value);
    if (number.value.length !== 10) {
      errorToast('Invalid phone number! Please Enter the 10-digit!', 4000);
      return;
    }
    if (password.value == confirm.value) {
      let data = { firstName: firstName.value, lastName: lastName.value, number: number.value, email: email.value, gender: gender.value, password: password.value, confirm: confirm.value }
      axios.post('http://localhost:3000/signup', data)
        .then((res) => {
          console.log(res);
          if (res.data == 'user_already_exist') {
            errorToast('Email Already Exist', 2000)
          } else {
            navigate('/login')
            Toast('Account Created Successfully🎉', 2000)
          }
        })
    }
    else {
      errorToast('Check Password Again', 1200)
    }
  };

  return (
    <div className="bg-dark h-[100vh] text-light pt-2 bg-cover bg-no-repeat bg-center bg-[url('https://cdn.dribbble.com/users/4815823/screenshots/18023140/youtube-shot.gif')]">
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
            <form onSubmit={handleSubmit} className='my-5'>
              <Grid container spacing={2} className='text-light'>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
            <Grid container className='flex justify-center'>
              <Grid item>
                <Link href="/login" variant="body1">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}