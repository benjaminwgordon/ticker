import React, {useState, useEffect} from 'react'
import StockPlot from './StockPlot'
import StockPlotControls from './StockPlotControls'
import {get5d, getIntraday} from '../API'

const StockPlotContainer = () => {

    const [ticker, setTicker] = useState("gme")
    const [timeScale, setTimescale] = useState("5d")
    const [queryResult, setQueryResult] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect( async () => {
        const func = () => {
            switch (timeScale){
                case "1d": return getIntraday
                case "5d": return get5d
                default: return getIntraday
            }
        }
        const timeSeriesData = await func()(ticker, timeScale)
        if (!timeSeriesData){
            setErrorMessage("request failed, check request parameters")
        }
        else{
            setErrorMessage("")
            setQueryResult(timeSeriesData)
        }        
    },[ticker, timeScale])

    return (
        <div className="stockplot-container">
            {
                queryResult && <StockPlot data={queryResult.data} minimum={queryResult.minimum} maximum={queryResult.maximum} />
            }
            <StockPlotControls ticker={ticker} setTicker={setTicker} timeScale={timeScale} setTimescale={setTimescale} />
            {
                errorMessage && <h5>{errorMessage}</h5>
            }
        </div>
    )
}

export default StockPlotContainer
