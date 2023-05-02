 import { auth, googleProvider } from '../config/firebase-config';
 import React, { useState } from "react";
 import {createUserWithEmailAndPassword, signInWithPopup, signOut   } from 'firebase/auth'
 
 export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async  () =>{
        try{
            await createUserWithEmailAndPassword(auth, email, password )
        } catch (err){
            console.error(err)
        }
    };

    const signInWithGoogle = async  () =>{
        try{
            await signInWithPopup(auth, googleProvider)
        } catch (err){
            console.error(err)
        }    
    };

    const logout  = async  () =>{
        try{
            await signOut(auth)
        } catch (err){
            console.error(err)
        }    
    };
    return (
        <div>
            <input 
                placeholder = "Email..." 
                onChange = {(e) => setEmail(e.target.value)}
                 />
            <input 
                placeholder = "Password..."
                type = "password"
                onChange = {(e) => setPassword(e.target.value)}
                />
            <button onClick={signIn}>Sign in</button>

            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick = {logout }>Logout</button>
        </div>
    );
 };