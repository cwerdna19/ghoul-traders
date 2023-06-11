import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import axios from "axios";

import { rateLimitCall } from "../../api/rateLimitCall";

// Can probably use useMemo to save shit between reloads?????

function Agent() {
    const [agent, setAgent] = useState();
    const [serverStatus, setServerStatus] = useState();
    const [userShips, setUserShips] = useState();

    //const [lastRequestTime, setLastReqestTime] = useState();

    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    //let lastRequestTime = useRef(Date.now());

    useEffect( () => {
        if (localStorageUserToken) {
            rateLimitCall('https://api.spacetraders.io/v2/my/agent', localStorageUserToken, setAgent);
            rateLimitCall('https://api.spacetraders.io/v2', localStorageUserToken, setServerStatus);
            rateLimitCall('https://api.spacetraders.io/v2/my/ships', localStorageUserToken, setUserShips);
        }

    }, [localStorageUserToken]);

    return(
        <>
            <div className="container text-bg-dark p-2 m-2 rounded" id="agent" >
                {agent ? (
                    <ul>
                        <li>
                            {agent.symbol}
                        </li>
                        <li>
                            {agent.headquarters}
                        </li>
                        <li>
                            {agent.startingFaction}
                        </li>
                    </ul>
                ) : <p>Loading...</p>}
            </div>
            <div className="container text-bg-dark p-2 m-2 rounded" id="serverStatus">
                {serverStatus ? (
                    <p>
                    {serverStatus.status}
                    </p>
                ) : <p>Loading...</p> }
            </div>
            <div className="container text-bg-dark p-2 m-2 rounded" id="userShip">
                {userShips ? (
                        <ul>
                            <li>
                                {userShips[0].symbol}
                            </li>
                            <li>
                                {userShips[1].symbol}
                            </li>                            
                        </ul>
                ) : <p>Loading...</p> }
            </div>
        </>
    )
}

export default Agent;