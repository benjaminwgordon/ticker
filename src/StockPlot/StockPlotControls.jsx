import React, {useState} from 'react'

const StockPlotControls = (props) => {
    
    const {ticker, setTicker, timeScale, setTimescale, showHigh, setShowHigh, showLow, setShowLow, showOpen, setShowOpen, showClose, setShowClose, showBars, setShowBars} = props

    const [localTicker, setLocalTicker] = useState(ticker)

    return (
        <div className="stockplot-controls">
            <form className="stockplot-control-group ticker" onSubmit={(e)=>{e.preventDefault(); setTicker(localTicker)}}>
                <label htmlFor="tickerSymbolInput">
                    Ticker
                </label>
                <input 
                    className="left-cap"
                    type="text" 
                    id="tickerSymbolInput" 
                    value={localTicker} 
                    onChange={(e)=>{setLocalTicker(e.target.value)}}
                />
                <input className="button right-cap" type="submit" value="Go"/>
            </form>
            <div className="stockplot-control-group timescale-radio-group">
                <button className={timeScale === "1d" ? "button-toggle active left-cap" : "button-toggle left-cap"} type="radio" name="timescale" value="1d" id="1d-radio" checked={timeScale === "1d"} onClick={() => setTimescale("1d")}>1d</button>
                <button className={timeScale === "5d" ? "button-toggle active" : "button-toggle"} type="radio" name="timescale" value="5d" id="5d-radio" checked={timeScale === "5d"} onClick={() => setTimescale("5d")}>5d</button>
                <button className={timeScale === "1m" ? "button-toggle active" : "button-toggle"} type="radio" name="timescale" value="1m" id="1m-radio" checked={timeScale === "1m"} onClick={() => setTimescale("1m")}>1m</button>
                <button className={timeScale === "6m" ? "button-toggle active right-cap" : "button-toggle right-cap"} type="radio" name="timescale" value="6m" id="6m-radio" checked={timeScale === "6m"} onClick={() => setTimescale("6m")}>6m</button>
            </div>
            <div className="stockplot-control-group plot-toggles">
                <button className={showOpen ? "button-toggle active left-cap" : "button-toggle left-cap"} type="radio" name="showOpen" id="showOpenToggleControl" onClick={()=>setShowOpen(!showOpen)}>Open</button>
                <button className={showClose ? "button-toggle active" : "button-toggle"} type="radio" name="showClose" id="showCloseToggleControl" onClick={()=>setShowClose(!showClose)}>Close</button>
                <button className={showHigh ? "button-toggle active" : "button-toggle"} type="radio" name="showHigh" id="showHighToggleControl" onClick={()=>setShowHigh(!showHigh)}>High</button>
                <button className={showLow ? "button-toggle active" : "button-toggle"} type="radio" name="showLow" id="showLowToggleControl" onClick={()=>setShowLow(!showLow)}>Low</button>
                <button className={showBars ? "button-toggle active right-cap" : "button-toggle right-cap"} type="radio" name="showBars" id="showBarsToggleControl" onClick={()=>setShowBars(!showBars)}>Bars</button>
            </div>
        </div>
    )
}

export default StockPlotControls
