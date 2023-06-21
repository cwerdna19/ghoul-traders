import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { useRateLimit } from "../../api/useRateLimit";
import { getAgent, getServerStatus, getUserShips } from "../../api/endpoints";


function Status() {
    const [serverStatus, setServerStatus] = useState();

    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    const rateLimitedGetServerStatus = useRateLimit(getServerStatus, setServerStatus, console.log);

    useEffect( () => {
        if (localStorageUserToken) {
            rateLimitedGetServerStatus(localStorageUserToken);
        }
    }, [localStorageUserToken]);

    return (
        <div className="container text-bg-dark p-2 m-2 rounded" id="serverStatus">
            {serverStatus ? (
                <p>
                {serverStatus.status}
                </p>
            ) : <p>Loading...</p> }
        </div>
    )
}

export default Status;