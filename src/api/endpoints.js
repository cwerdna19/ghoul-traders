import axios from "axios";

async function getEndpoint(url, token) {
    let response, error;
    try {
        response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
            console.log(response.data);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log('Error', error.message);
        }
    }

    return (response ? response.data.data : error.response.data )
}

export async function getServerStatus(token) {
    const url = "https://api.spacetraders.io/v2";

    let response, error;
    
    try {
        response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
            console.log(response.data);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response);
        } else {
            console.log('Error', error.message);
        }
    }

    return (response ? response.data : error.response.data )
}

export function getAgent(token) {
    const url = "https://api.spacetraders.io/v2/my/agent";

    return getEndpoint(url, token);
    
    // try {
    //     response = await axios.get(
    //         url,
    //         { headers: { Authorization: `Bearer ${token}` } }
    //     );

    //     if (response.status === 200) {
    //         console.log(response.data.data);
    //     }
    // } catch (error) {
    //     if (error.response) {
    //         console.log(error.response.data);
    //     } else {
    //         console.log('Error', error.message);
    //     }
    // }

    // return (response ? response.data.data : error.response.data )
}

export async function getUserShips(token) {
    const url = "https://api.spacetraders.io/v2/my/ships";

    let response, error;
    try {
        response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
            console.log(response.data);
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log('Error', error.message);
        }
    }

    return (response ? response.data : error.response.data )
}