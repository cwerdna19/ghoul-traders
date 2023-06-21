// Thanks, ChatGPT! 👍

import { useEffect, useRef } from "react";

import axios from "axios";

// Brain go zoom
// Shouldn't I create a class with all of the endpoints I want to access?

// Wow what if I want to define each endpoint url as a class property?

// Wow what if I want to parameterize some of the endpoint properties but still have a sub property???
// like spacetraders.ep1[someVar1].ep2[someVar2]

export function rateLimitCall(url, token, setter) {

    let requestCount = 0//useRef(0);
    let lastRequestTime = Date.now();

    const rateLimit = async (url, token, setter) => {

        // our rate limiter logic
        const now = Date.now();

        if (now - lastRequestTime < 1000) {
            if (requestCount >= 2) {
                setTimeout(rateLimit, 1000 - (now - lastRequestTime));
                return;
            }
        } else {
            requestCount = 0;
        }
        requestCount++;
        lastRequestTime = now;
        
        // actual endpoint request
        try {
            const response = await axios.get(
                url,
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                setter(response.data.data)
                console.log(response.data.data);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log('Error', error.message);
            }
        }
    };

    rateLimit(url, token, setter);
}