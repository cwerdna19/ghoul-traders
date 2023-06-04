import { useEffect, useState } from "react"

export function useToken() {
    
    const [token, setToken] = useState()
    
    useEffect( () => {
        const userToken = localStorage.getItem("token")
        setToken(userToken)
    },
        []
    );

    return token;
}