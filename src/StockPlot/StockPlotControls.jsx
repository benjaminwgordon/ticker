import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'

const StockPlotControls = (props) => {
    
    const {ticker, setTicker, timeScale, setTimescale, showHigh, setShowHigh, showLow, setShowLow, showOpen, setShowOpen, showClose, setShowClose, showBars, setShowBars} = props

    const [localTicker, setLocalTicker] = useState(ticker)

    return (
        <div>
            <form onSubmit={(e)=>{e.preventDefault(); setTicker(localTicker)}}>
                <label htmlFor="tickerSymbolInput">
                    Ticker Symbol
                </label>
                <input 
                    type="text" 
                    id="tickerSymbolInput" 
                    value={localTicker} 
                    onChange={(e)=>{setLocalTicker(e.target.value)}}
                />
            </form>
            <div className="timescale-radio-group">
                <label htmlFor="1d-radio">1d</label>
                <input className="timescale-radio-button" type="radio" name="timescale" value="1d" id="1d-radio" checked={timeScale === "1d"} onChange={() => setTimescale("1d")}/>
                <label htmlFor="5d-radio">5d</label>
                <input className="timescale-radio-button" type="radio" name="timescale" value="5d" id="5d-radio" checked={timeScale === "5d"} onChange={() => setTimescale("5d")}/>
                <label htmlFor="1m-radio">1m</label>
                <input className="timescale-radio-button" type="radio" name="timescale" value="1m" id="1m-radio" checked={timeScale === "1m"} onChange={() => setTimescale("1m")}/>
                <label htmlFor="6m-radio">6m</label>
                <input className="timescale-radio-button" type="radio" name="timescale" value="6m" id="6m-radio" checked={timeScale === "6m"} onChange={() => setTimescale("6m")}/>
            </div>
            <div className="bar-toggles">
                <div>
                    <label htmlFor="showOpenToggleControl">Open</label>
                    <input type="radio" name="showOpen" id="showOpenToggleControl" checked={showOpen} onClick={()=>setShowOpen(!showOpen)}/>
                </div>
                <div>
                    <label htmlFor="showCloseToggleControl">Close</label>
                    <input type="radio" name="showClose" id="showCloseToggleControl" checked={showClose} onClick={()=>setShowClose(!showClose)}/>
                </div>
                <div>
                    <label htmlFor="showHighToggleControl">High</label>
                    <input type="radio" name="showHigh" id="showHighToggleControl" checked={showHigh} onClick={()=>setShowHigh(!showHigh)}/>
                </div>
                <div>
                    <label htmlFor="showLowToggleControl">Low</label>
                    <input type="radio" name="showLow" id="showLowToggleControl" checked={showLow} onClick={()=>setShowLow(!showLow)}/>
                </div>
                <div>
                    <label htmlFor="showBarsToggleControl">Bars</label>
                    <input type="radio" name="showBars" id="showBarsToggleControl" checked={showBars} onClick={()=>setShowBars(!showBars)}/>
                </div>
            </div>
        </div>
    )
}

export default StockPlotControls
