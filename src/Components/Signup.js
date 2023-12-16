import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme();

function checkPassword(password) {
    const specialCharacters = "!@#$%^&*()-=_+[]{}|;:'\",.<>/?";
    if (password.length < 8 || password.length > 20) {
        return false;
    }
    for (let i = 0; i < password.length; i++) {
        if (specialCharacters.includes(password[i])) {
            return true;
        }
    }
    return false;
}

function checkMobileNumber(number) {
    if (number.length !== 10) {
        return false;
    }
    return true;
}

export default function SignUp() {

    const [passwordError, setPasswordError] = React.useState(false);
    const [mobileError, setMobileError] = React.useState(false);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        //Check if mobile number is 10 digits
        const number = data.get('Number');
        if (!checkMobileNumber(number)) {
            setMobileError(true);
            return;
        } else {
            setMobileError(false);
        }

        //Check if password is 8-20 digits including special characters
        const password = data.get('password');
        if (!checkPassword(password)) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        //Check if Number is already present in local storage with data.get('Number')
        if (localStorage.getItem(Number)) {
            toast.error('Oops! Already registered, please login');
            return;
        }

        //Store data in local storage
        localStorage.setItem(data.get('Number'), JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
            Number: data.get('Number'),
            DOB: data.get('DOB'),
        }));

        //Redirect to login page
        toast.success('Singup Successful! Please login...');

        setTimeout(() => {
            navigate('/signin')
        }, 3000);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="Mobile Number"
                                    label="Mobile Number"
                                    name="Number"
                                    autoComplete="Number"
                                    type={"number"}
                                    error={mobileError}
                                    helperText="* Mobile Number must be 10 digits"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="DOB"
                                    label="Date of Birth"
                                    name="DOB"
                                    autoComplete="DOB"
                                    type="date"  // Set type to "date" for date input
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={passwordError}
                                    helperText="*Password must be 8-20 digits including special characters"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/Signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
