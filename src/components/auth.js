import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);


    //  console.log(auth?.currentUser.email);   
    const signIn = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }

    };


    const signInWithGoogle = async () => {

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }

    };


    const logout = async () => {

        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }

    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <input
                        placehold="Email.."
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </Grid>
                <Grid item xs={3}>
                    <input placehold="Password.."
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={signIn}>Sign In</Button>
                </Grid>

                <Grid item xs={2}>
                    <Button variant="contained" onClick={signInWithGoogle}>Sign In with Google</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={logout}>LogOut</Button>
                </Grid>

            </Grid>
        </Box>
    );

};

