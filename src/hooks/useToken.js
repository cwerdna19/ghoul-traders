import { useEffect, useState } from "react"

export function useToken() {
    const [token, setToken] = useState();
    
    useEffect( () => {
        const userToken = localStorage.getItem("token");
        setToken(userToken);
    },
        []
    );

    //const response = isTokenValid(token);
    //console.log(response)
    console.log(token)

    return token;
}