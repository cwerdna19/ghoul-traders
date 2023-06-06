import { useEffect, useState } from "react";

import { redirect, useNavigate, useOutletContext } from "react-router-dom";

import { useToken } from "../hooks/useToken";

import axios from "axios";

function Login() {
    const [userToken, setUserToken] = useOutletContext();
    const [isTokenValid, setIsTokenValid] = useState("");

    const token = useToken();

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem("token", userToken)
    }

    useEffect( () => {
        console.log(token)
        if (token) {
            //let res = checkToken();
            let res = 199;
            if (res < 200) {
                setIsTokenValid(true);
                navigate("/");
            } 
            else {
                setIsTokenValid(false);
            }
        }
    },
        [userToken, isTokenValid]
    );

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
    )
}

function checkToken(token) {
    const data = {
        Authorization: 'Bearer ' + {token}
    };

    let res;

    axios.get('https://api.spacetraders.io/v2/my/agent', data)
    .then(function (response) {
        res = response;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        res = error.response.headers;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    return res
}

export default Login;