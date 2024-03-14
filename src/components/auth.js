import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {useState} from "react";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
    await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }

};


    return (
     <div>
        <input 
        placehold="Email.."
        onChange={(e) => setEmail(e.target.value)}
        
        />
        <input placehold="Password.."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
   
        <button onClick={signInWithGoogle}>Sign In with Google</button>
   
    </div>
    );
};

