import React, {useState} from 'react'

const StockPlotControls = (props) => {
    
    const {ticker, setTicker, timeScale, setTimescale} = props

    return (
        <div>
            <form onSubmit={(e)=>{e.preventDefault(); setTicker(ticker)}}>
                <label htmlFor="tickerSymbolInput">
                    Ticker Symbol
                </label>
                <input 
                    type="text" 
                    id="tickerSymbolInput" 
                    value={ticker} 
                    onChange={(e)=>{setTicker(e.target.value)}}
                />
                <br/>
            </form>
            <div>
                <button type="submit">Submit</button>
                <label htmlFor="1d-radio">1d</label>
                <input type="radio" name="timescale" value="1d" id="1d-radio" checked={timeScale === "1d"} onChange={() => setTimescale("1d")}/>
                <label htmlFor="5d-radio">5d</label>
                <input type="radio" name="timescale" value="5d" id="5d-radio" checked={timeScale === "5d"} onChange={() => setTimescale("5d")}/>
                <label htmlFor="1m-radio">1m</label>
                <input type="radio" name="timescale" value="1m" id="1m-radio" checked={timeScale === "1m"} onChange={() => setTimescale("1m")}/>
                <label htmlFor="6m-radio">6m</label>
                <input type="radio" name="timescale" value="6m" id="6m-radio" checked={timeScale === "6m"} onChange={() => setTimescale("6m")}/>
            </div>
        </div>
    )
}

export default StockPlotControls
