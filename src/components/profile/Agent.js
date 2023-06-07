import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import axios from "axios";

import { useRateLimit } from "../../api/useRateLimited";

// Can probably use useMemo to save shit between reloads?????

function Agent() {
    const [agent, setAgent] = useState();
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    useRateLimit('https://api.spacetraders.io/v2/my/agent', localStorageUserToken, setAgent);

    return(
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
    )
}

export default Agent;