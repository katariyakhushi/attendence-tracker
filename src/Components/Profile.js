import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Profile() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Update user details logic will go here
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* You can display user's initials or profile picture here */}
            U
          </Avatar>
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Display user details fetched from backend */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue="John" // Replace with actual user data
                  fullWidth
                  label="First Name"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue="Doe" // Replace with actual user data
                  fullWidth
                  label="Last Name"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue="john.doe@example.com" // Replace with actual user data
                  fullWidth
                  label="Email Address"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue="1234567890" // Replace with actual user data
                  fullWidth
                  label="Mobile Number"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue="1990-01-01" // Replace with actual user data
                  fullWidth
                  label="Date of Birth"
                  disabled
                />
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
        </Box>
      </Container>
    </ThemeProvider>
  );
}
