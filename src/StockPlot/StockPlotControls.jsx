import React, {useState, useEffect} from 'react'

const StockPlotControls = (props) => {
    
    const {setQuery} = props

    const [ticker, setTicker] = useState("gme")
    const [numObservations, setNumObservations] = useState(50)
    const [timescale, setTimescale] = useState("1d")

    return (
        <div>
            <label htmlFor="numObservationsInput">
                Number of Observations
            </label>
            <input 
                type="number" 
                id="numObservationsInput"
                value={numObservations} 
                onChange={(e)=>{setNumObservations(e.target.value)}}
            />
            <form onSubmit={(e)=>{e.preventDefault(); setQuery({ticker, numObservations, timescale});}}>
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
            </form>
        </div>
    )
}

export default StockPlotControls
