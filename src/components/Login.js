import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import { useDebounce } from "../hooks/useDebounce";

function Login() {
    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();
    const [userToken, setUserToken] = useState();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const debouncedLocalStorageUserToken = useDebounce(localStorageUserToken, 500);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setLocalStorageUserToken(userToken);
        localStorage.setItem("token", userToken);
    }

    useEffect(() => {
        const checkToken = async (token) => {
            try {
                const response = await axios.get(
                    'https://api.spacetraders.io/v2/my/agent',
                    { headers: { Authorization: `Bearer ${token}` } }
                );
    
                if (response.status === 200) {
                    setIsTokenValid(true);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsTokenValid(false);
                if (error.response) {
                    console.log(error.response.data);
                } else {
                    console.log('Error', error.message);
                }
            }
        };
    
        if (debouncedLocalStorageUserToken) {
          checkToken(debouncedLocalStorageUserToken);
        }
    }, [debouncedLocalStorageUserToken, localStorageUserToken]);
    
    useEffect(() => {
        if (isTokenValid) {
            navigate('/');
        }
    }, [isTokenValid, navigate]);
      
    return (
        <>
            <div className="text-bg-dark p-5 m-5 rounded" id="content" >
                <div className="agent-line-one clearfix">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="token">
                            Token
                            <input
                                name="token"
                                value={userToken}
                                onChange={(event) => {
                                        setUserToken(event.target.value)
                                    }
                                }
                                className="ms-2"
                            />
                        </label>
                        <button className="btn btn-light ms-4" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;