import { useState } from 'react';

import Nav from "./components/Nav";
import IDCard from "./components/IDCard";
import SignUp from "./components/SignUp";

//422 USER ALREADY EXISTS
//201 SIGNED UP GOODLY

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
