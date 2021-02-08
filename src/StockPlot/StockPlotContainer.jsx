import React, {useState, useEffect} from 'react'
import StockPlot from './StockPlot'
import StockPlotControls from './StockPlotControls'
import {getDaily, getIntraday} from '../API'

const StockPlotContainer = () => {

    const [query, setQuery] = useState({ticker:"gme", numObservations: 50, timeScale:"intraday"})
    const [queryResult, setQueryResult] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect( async () => {
        const func = () => {
            switch (query.timeScale){
                case "intraday": return getIntraday
                case "daily": return getDaily
                default: return getIntraday
            }
        }
        const timeSeriesData = await func()(query.ticker, query.numObservations)
        if (!timeSeriesData){
            setErrorMessage("request failed, check request parameters")
        }
        else{
            setErrorMessage("")
            setQueryResult(timeSeriesData)
        }        
    },[query])

    return (
        <div className="stockplot-container">
            {
                queryResult && <StockPlot data={queryResult.data} minimum={queryResult.minimum} maximum={queryResult.maximum} numObservations={query.numObservations}/>
            }
            <StockPlotControls setQuery={setQuery}/>
            {
                errorMessage && <h5>{errorMessage}</h5>
            }
        </div>
    )
}

export default StockPlotContainer
