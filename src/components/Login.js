import { useState } from "react";

function Login() {

    // define our state for managing the token that we're going to get from our user in our form
    // userToken is the actual token
    // we can only set userToken with the func setUserToken
    const [userToken, setUserToken] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem("token", userToken)
    }

    return(
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
                                }}
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

export default Login;