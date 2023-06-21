import axios from "axios";

export default async function getSystems(token, limit=1, page=1) {
    let response, error;
    try {
        response = await axios.get(
            "https://api.spacetraders.io/v2/systems",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    limit: `${limit}`,
                    page: `${page}`
                }
            }
        );

        if (response.status === 200) {
            //console.log(response);
            console.log(response.data.data)
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