import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

//import 'react-toastify/dist/ReactToastify.css';

import Nav from "./Nav";

import { useToken } from "../hooks/useToken";

import { RateLimitProvider } from "../api/useRateLimit";

// Contexts will allow the site to know that we have defined a token, and thus the Nav should no longer display the login component
// Contexts will allow all of our components within this "Context" to get the state of our user token
// Can be done with the Hook useContext()

// Other hooks:
// useState(), useEffect()

// Next steps:
// Learn about useContext(), so that we can get the state of userToken so we can determine the behavior of our app after signing up or logging in
// Figure out API calls to create the actual functionality of the App. This might involve using Promises
// Can reference the website javascript.info

function Layout() {
    const [localStorageUserToken, setLocalStorageUserToken] = useToken();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [node, setNode] = useState(null);

    const notify = () => toast.success("Nice login, bro!");

    useEffect( () => {
        if (isLoggedIn) {
            notify();
        }
    }, [isLoggedIn]);

    return (
        <>
            <RateLimitProvider>
                <Nav context={isLoggedIn} />
                <ToastContainer />
                {/* Use react-router outlet context to pass state*/}
                <Outlet context={[localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn, node, setNode]} />
            </RateLimitProvider>
        </>
    )
}

export default Layout;