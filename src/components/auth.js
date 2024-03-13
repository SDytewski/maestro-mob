import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {useState} from "react";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);


};

    return (
     <div>
        <input 
        placehold="Email.."
        onChange={(e) => setEmail(e.target.value)}
        
        />
        <input placehold="Password.."
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
    </div>
    );
};

