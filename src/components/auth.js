export const Auth = () => {

    const [email, setEmail] = useState("");

const signIn () => {

};

    return (
     <div>
        <input placehold="Email.." />
        <input placehold="Password.." />
        <button onClick={signIn}>Sign In</button>
    </div>
    );
};

