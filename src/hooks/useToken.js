import { useEffect, useState } from "react"

export function useToken() {
    const [token, setToken] = useState();
    
    useEffect( () => {
        let userToken = localStorage.getItem("token");
        setToken(userToken);
    }, []);

    return [token, setToken];
}