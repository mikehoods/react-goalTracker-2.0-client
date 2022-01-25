import { useState, useEffect } from 'react'

//Custom hook to fetch data
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if(!res.ok) {
                    throw Error("Could not fetch data for that resource")
                }
                return res.json();
            })
            .then(data => {
                setData(data)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                //Ignore abort errors when fetching data
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    setIsLoading(false)
                    setError(err.message)
                }
            })
        //Abort fetch useEffect when switching page/url
        return () => abortCont.abort()    
    }, [url]);

    return { data, isLoading, error }

}

export default useFetch