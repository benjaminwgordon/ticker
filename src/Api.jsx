import React, {useState, useEffect} from 'react'
import {getIntraday} from './AlphaVantage'

const Api = () => {

    const [query, setQuery] = useState(null)
    useEffect(()=>{
        getIntraday().then(result => {
            setQuery(JSON.stringify(result))
        })
    },[])

    return (
        <div>
            {query || "loading"}
        </div>
    )
}

export default Api
