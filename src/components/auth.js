import { useEffect } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { purple, red } from '@mui/material/colors';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Stack from '@mui/material/Stack';




export const Auth = ({ token, setToken, handleClear, setEmail, email, setPassword, password, setBanner, banner }) => {

  const [failure, setFailure] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  // useEffect(() => {
  // token && setFailure(false) || setFailure(false);

  // })



  console.log(auth?.currentUser?.email);
  if (auth?.currentUser?.email === undefined) {
    setBanner("Logged Out")


  } else { setBanner("Logged In") }


  //  console.log(auth?.currentUser.email);   
  const signIn = async () => {


    try {
      const cookie = await createUserWithEmailAndPassword(auth, email, password);
      //Token from firebase
      setToken(cookie.user.accessToken)
      setFailure(false)
    } catch (err) {
      console.error(err);
      setFailure(true)

    }

  };

  const LogIn = async () => {

    setEmail(" ");
    setFailure(false)

    try {
      const cookie = await signInWithEmailAndPassword(auth, email, password);
      setToken(cookie.user.accessToken)

    } catch (err) {
      console.error(err);
      setFailure(true)
    }




  }


  const signInWithGoogle = async () => {

    try {
      const cookie = await signInWithPopup(auth, googleProvider);
      setToken(cookie.user.accessToken);
      console.log(token)
    } catch (err) {
      console.error(err);
      setFailure(true)

    }


  };


  const logout = async () => {

    try {
      await signOut(auth);
      setBanner("Logged Out")
    } catch (err) {
      console.error(err);

    }

  };


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        {/* <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '} */}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const defaultTheme = createTheme();




  return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Typography variant="h2" color="white" style={{
          backgroundColor: "#c41E3A", // Background color
          // Optional padding
        }}>MUSIC MOB</Typography>
        <Typography variant="h5" color="white" p={3} style={{
          backgroundColor: "black", // Background color
          // Optional padding
        }}

        >Find a Local Musician or Login to Create one</Typography>

        {failure && <div> <Typography variant="h5" color="white" style={{
          backgroundColor: "red", // Background color
          display: "inline-block",      // Keeps the background tight around text
          padding: "4px 8px",

          margin: "10px"          // Optional padding
        }}> Error with Login, Try Again!</Typography></div>}
        <Grid 
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '100vh' }}
        
        
        >

        <Card sx={{ minWidth: 275, maxWidth: 500 }}>
          <CardContent>

            <Box
              variant="outlined" mt={5}
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" >
                Sign up
              </Typography>
              <Typography
                variant="h6"
              >

                {auth?.currentUser?.email === undefined ? <Typography sx={{ p: 3, m: 2, bgcolor: 'black', color: "#FFFFFF", border: 1 }}>YOU ARE NOT LOGGED IN</Typography> :
                  <Typography sx={{ p: 3, m: 2, bgcolor: 'text.secondary', color: "#FFFFFF", border: 3 }}>YOU ARE LOGGED IN</Typography>}

              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6}>
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
                </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>


                </Grid>
                {auth?.currentUser?.email === undefined &&
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { signIn(); setEmail(' '); handleClear() }}
                  >
                    Sign Up
                  </Button>

                }

                {auth?.currentUser?.email === undefined &&
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { LogIn(); setEmail(' '); handleClear() }}
                  >
                    Log In
                  </Button>

                }

                {auth?.currentUser?.email === undefined &&
                  <Button variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                    onClick={signInWithGoogle}
                  >
                    Sign In with Google
                  </Button>
                }

                {auth?.currentUser?.email &&
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => { logout(); setToken(null) }}

                  >
                    Log Out
                  </Button>

                }


                <Grid container justifyContent="flex-end">
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>

        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>





      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <h1>Music Mob</h1>
          </Grid> */}
          {/* <Grid item xs={6}>
                    <div>
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                    </div> */}
          {/* <Item> */}
          {/* <input
                            placehold="Email.."
                            onChange={(e) => setEmail(e.target.value)}

                        /> */}
          {/* { </Item> */}
          {/* </Grid>
                <Grid item xs={6}>
                    <div>
                    <TextField id="outlined-basic" label="Password" variant="outlined"  />
                    </div> */}
          {/* { <Item>} */}
          {/* <input placehold="Password.."
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}
          {/* {</Item> */}
          {/* </Grid> */}

          {/* <Grid item xs={4}>
                    
                        <Button variant="contained" >Sign In</Button>

                    
                </Grid> */}

          {/* <Grid item xs={4}>
            
                        <Button variant="contained" onClick={signInWithGoogle}>Sign In with Google</Button>
                 
                </Grid> */}
          {/* <Grid item xs={4}>
                    
                        <Button variant="contained" onClick={logout}>LogOut</Button>
                 
                </Grid> */}


        </Grid>
      </Box>
    </ThemeProvider>
  );

};

