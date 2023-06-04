import { useState } from 'react';

import Nav from "./components/Nav";
import IDCard from "./components/IDCard";
import SignUp from "./components/SignUp";

//422 USER ALREADY EXISTS
//201 SIGNED UP GOODLY

// COULD ALSO USE A SERVICE TO MANAGE TOKENS (CUSTOM HOOK IN REACT)
// INJECT THE SERVICE IN TO THE COMPONENT
// THIS WOULD USE OBSERVABLES

// "use"Function() are hooks
// look at useEffects()

// Should use routes to just have "login/signup" pages, instead of a conditions for the signup component


const App = () => {
    const [token, setToken] = useState(null)

    function handleUpdateToken(user_token) {
        setToken(user_token);
    }

    return (
        <>
            <Nav />
            <SignUp token={null} updateToken={() => setToken()}>
                {token}
            </SignUp>

        </>
    );
};

export default App;
