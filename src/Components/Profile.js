import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const defaultTheme = createTheme();

export default function Profile({phone}) {

    const [formData, setFormData] = useState({
        dob: "",
        email: "",
        firstName: "",
        lastName: "",
        number: "",
        password: "",
    });

    const location = useLocation();
    const phoneFromState = location.state?.phone || phone || {};

    useEffect(() => {
        // Set form data from phone or phoneFromState
        setFormData({
            dob: phoneFromState.dob || null,
            email: phoneFromState.email || "",
            firstName: phoneFromState.firstName || "",
            lastName: phoneFromState.lastName || "",
            number: phoneFromState.number || null,
            password: phoneFromState.password || "",
        });
        console.log("phoneFromState", phoneFromState)
    }, [phoneFromState]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("formData", formData)
        //Set data on localstorage
        localStorage.setItem(formData.number, JSON.stringify(formData))
        //Update state
        setFormData({
            dob: formData.dob,
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            number: formData.number,
            password: formData.password
        })

        toast.success("Profile Updated Successfully")
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
                        {/*Getting first letter from firstName*/}
                        {formData && formData.firstName && formData.firstName.charAt(0).toUpperCase() || '@'}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        My Profile
                    </Typography>
                    {
                        formData &&
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={formData.firstName}
                                        fullWidth
                                        label="First Name"
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        name={"firstName"}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={formData.lastName}
                                        fullWidth
                                        label="Last Name"
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        name={"lastName"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.email}
                                        fullWidth
                                        label="Email Address"
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        name={"email"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.number}
                                        fullWidth
                                        label="Mobile Number"
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        name={"number"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.dob}
                                        fullWidth
                                        label="Date of Birth"
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        name={"dob"}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Save Changes
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2" style={{textDecoration: 'none'}}>
                                        Back to Home
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Container>
        </ThemeProvider>
    );
}
