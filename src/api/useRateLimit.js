import { createContext, useContext, useEffect, useRef} from "react";

const RateLimitContext = createContext({
    queue: []
});

export const RateLimitProvider = ({children}) => {
    const queue = useRef({queue: []});

    useEffect(() => {
        setInterval(() => {
            const thisFunc = queue.current.queue.shift();
            if (thisFunc) {                
                thisFunc();
            }
        }, 1000)
    }, [])

    return <RateLimitContext.Provider value={queue.current}>
        {children}
    </RateLimitContext.Provider>
}

export function useRateLimit(apiCall, onSuccess, onError) {
    const {queue} = useContext(RateLimitContext);

    return (...args) => {
        queue.push(() => {
            apiCall(...args)
                .then(onSuccess)
                .catch(onError);
        });

        console.log(queue);
    };
}