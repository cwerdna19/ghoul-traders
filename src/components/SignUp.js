import React, { useState } from "react";
import axios from "axios";

function SignUp() {
    const [data, setData] = useState({
        username: "",
        faction: ""
    });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            symbol: data.username,
            faction: data.faction
        };
        axios.post("https://api.spacetraders.io/v2/register", userData).then((response) => {
            console.log(response.status, response.data.token, response.data);
        });
    };

    return (
        <div className="text-bg-dark p-5 m-5 rounded" id="content" >
            <div className="agent-line-one clearfix">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username
                        <input
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            className="ms-2"
                        />
                    </label>
                    <label className="ms-4" htmlFor="faction">
                        Faction
                        <input
                            name="faction"
                            value={data.faction}
                            onChange={handleChange}
                            className="ms-2"
                        />
                    </label>
                    <button className="btn btn-light ms-4" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;