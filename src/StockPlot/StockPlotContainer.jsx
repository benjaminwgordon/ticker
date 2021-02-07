import React, {useState, useEffect} from 'react'
import StockPlot from './StockPlot'
import StockPlotControls from './StockPlotControls'
import {getIntraday} from '../AlphaVantage'

const StockPlotContainer = () => {

    const [query, setQuery] = useState({ticker:"gme", numObservations: 50})
    const [queryResult, setQueryResult] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect( async () => {
        const timeSeriesData = await getIntraday(query.ticker)
        if (!timeSeriesData){
            setErrorMessage("request failed, check request parameters")
        }
        else{
            setErrorMessage("")
            setQueryResult(timeSeriesData)
        }        
    },[query])

    return (
        <div>
            {
                queryResult && <StockPlot rawData={queryResult} numObservations={query.numObservations}/>
            }
            <StockPlotControls setQuery={setQuery}/>
            {
                errorMessage && <h5>{errorMessage}</h5>
            }
        </div>
    )
}

export default StockPlotContainer
