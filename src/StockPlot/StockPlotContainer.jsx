import React, {useState, useEffect} from 'react'
import StockPlot from './StockPlot'
import StockPlotControls from './StockPlotControls'
import {get5d, getIntraday, get1m, get6m} from '../API'

const StockPlotContainer = () => {

    const [ticker, setTicker] = useState("gme")
    const [timeScale, setTimescale] = useState("5d")
    const [queryResult, setQueryResult] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showOpen, setShowOpen] = useState(false)
    const [showClose, setShowClose] = useState(true)
    const [showHigh, setShowHigh] = useState(false)
    const [showLow, setShowLow] = useState(false)
    const [showBars, setShowBars] = useState(true)
    

    useEffect( async () => {
        const func = () => {
            switch (timeScale){
                case "1d": return getIntraday
                case "5d": return get5d
                case "1m": return get1m
                case "6m": return get6m
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
            <StockPlotControls 
                ticker={ticker} 
                setTicker={setTicker} 
                timeScale={timeScale} 
                setTimescale={setTimescale}
                setShowOpen={setShowOpen}
                setShowClose={setShowClose}
                setShowHigh={setShowHigh}
                setShowLow={setShowLow}
                setShowBars={setShowBars} 
                showOpen={showOpen}
                showClose={showClose}
                showHigh={showHigh}
                showLow={showLow}
                showBars={showBars} 
            />
            {
                queryResult && 
                <StockPlot 
                    data={queryResult.data} 
                    minimum={queryResult.minimum} 
                    maximum={queryResult.maximum} 
                    showOpen={showOpen}
                    showClose={showClose}
                    showHigh={showHigh}
                    showLow={showLow}
                    showBars={showBars}    
                />
            }

            {
                errorMessage && <h5>{errorMessage}</h5>
            }
        </div>
    )
}

export default StockPlotContainer
