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
                <input type="radio" name="timescale" value="1d" id="1d-radio" />
                <label htmlFor="5d-radio">5d</label>
                <input type="radio" name="timescale" value="5d" id="5d-radio" />
                <label htmlFor="1m-radio">1m</label>
                <input type="radio" name="timescale" value="1m" id="1m-radio" />
                <label htmlFor="6m-radio">6m</label>
                <input type="radio" name="timescale" value="6m" id="6m-radio" />
            </div>
        </div>
    )
}

export default StockPlotControls
