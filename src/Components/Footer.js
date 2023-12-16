import React from 'react';
import { Container, Typography, Grid, Link, Paper, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AdbIcon from '@mui/icons-material/Adb';

const Footer = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      style={{
        padding: theme.spacing(4),
        border: '1px solid #333',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="lg" marginBottom="30px">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" style={{ fontWeight: 'bold', color: '#fff' }}>
              <AdbIcon sx={{ display: { mr: 1 } }} />
              Attendance Tracker
            </Typography>
            <Typography mt="10px" style={{ color: '#fff' }}>
            "Efficient React-based Candidate Attendance System with Secure Sign-up, User-friendly Interface, and Real-time Attendance Tracking."
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>
              Contact Us
            </Typography>
            <Typography mt="20px" style={{ color: '#fff' }}>
              Email: example@example.com
            </Typography>
            <Typography mt="10px" style={{ color: '#fff' }}>
              Phone: +1 123-456-7890
            </Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' ,marginBottom: '10px'}}>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" target="_blank" rel="noopener" style={{ marginRight: '10px' }}>
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit" target="_blank" rel="noopener" style={{ marginRight: '10px' }}>
              <TwitterIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit" target="_blank" rel="noopener" style={{ marginRight: '10px' }}>
              <InstagramIcon fontSize="large" />
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: theme.spacing(6), color: '#fff' }}
        >
          &copy; {new Date().getFullYear()} Attendance Tracker. All rights reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
