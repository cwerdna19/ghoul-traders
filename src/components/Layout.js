import { Outlet } from "react-router-dom";

import Nav from "./Nav";

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
    const title = "Ghoul Traders"

    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default Layout;