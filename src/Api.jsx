import React, {useState, useEffect} from 'react'
import {getIntraday} from './AlphaVantage'
import StockPlot from './StockPlot'

const Api = () => {

    const [query, setQuery] = useState("")
    useEffect( async () => {
        const timeSeriesData = await getIntraday()
        setQuery(timeSeriesData)
    },[])

    return (
        <div>
            {
                query ? <StockPlot data={query} /> : "Loading"
            }
        </div>
    )
}

export default Api
