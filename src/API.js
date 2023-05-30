import axios from "axios";

// curl --request POST \
//  --url 'https://api.spacetraders.io/v2/register' \
//  --header 'Content-Type: application/json' \
//  --data '{
//     "symbol": "INSERT_CALLSIGN_HERE",
//     "faction": "COSMIC"
//    }'

const baseURL = "https://api.spacetraders.io/v2/";

const getRequestExample = async () => {
	try {
		const res = await axios.get(baseURL, {
			headers: {},
			params: {}
		});
	} catch (err) {
		console.log(err);
	}
};



