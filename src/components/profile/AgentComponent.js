import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { useRateLimit } from "../../api/useRateLimit";
import { getAgent } from "../../api/endpoints";

import Loader from "../Loader";

// Can probably use useMemo to save shit between reloads?????

function AgentComponent() {
    const [agent, setAgent] = useState();
    
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    const rateLimitedGetAgent = useRateLimit(getAgent, setAgent, console.log);
    //const rateLimitedGetUserShips = useRateLimit(getUserShips, setUserShips, console.log);

    useEffect( () => {
        if (localStorageUserToken) {
            rateLimitedGetAgent(localStorageUserToken);
        }

    }, [localStorageUserToken]);

    return (
        <>
        {agent ? (
            <div className="card min-vw-30 min-vh-30">
                <div className="card-header">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-6">
                                <span>
                                    <p className="h2">{agent.symbol}</p>
                                    <code>{agent.accountId}</code>
                                </span>
                            </div>
                            <div className="col-6">    
                                <span>
                                    <p className="h2">C{agent.credits}</p>
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="card-body ">
                    {/* <div className="card-title">
                        {agent.symbol}
                    </div> */}
                    <div className="card-text">
                        <span className="h6">HQ: <code>{agent.headquarters}</code></span>
                    </div>
                </div>
               
            </div>
        ) : <Loader/> }
        </>
    )
}

export default AgentComponent;