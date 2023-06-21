import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router";

import getSystems from "../../api/getSystems.js"
import { useRateLimit } from "../../api/useRateLimit";

function Starmap() {
    const systemsMeta = useRef();
    const allSystems = useRef([]);
    const [systems, setSystems] = useState();

    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();

    const rateLimitedGetAllSystems = useRateLimit(getSystems, (arg) => { allSystems.current.push(arg.data.data) }, console.log)
    const rateLimitedGetSystems = useRateLimit(getSystems, setSystems, console.log);

    useEffect( () => {
        if (localStorageUserToken) {
            rateLimitedGetSystems(localStorageUserToken);
        }

    }, [localStorageUserToken]);

    useEffect( () => {
        if (systems) {
            const limit = 20
            const pages = systems.meta.total / limit
            systemsMeta.current = systems.data.meta;
            for (let i = 1; i <= pages; i++) {
                console.log(i)
                rateLimitedGetAllSystems(localStorageUserToken, limit, pages)
            }
        }
    }, [systems])

    return (
        <>
            <p>hi</p>
        </>
    )

}

export default Starmap;