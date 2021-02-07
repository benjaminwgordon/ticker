import React, {useState, useEffect} from 'react'

const StockPlotControls = (props) => {
    
    const {setQuery} = props

    const [ticker, setTicker] = useState("gme")
    const [numObservations, setNumObservations] = useState(50)
    
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
            <form onSubmit={(e)=>{e.preventDefault(); setQuery({ticker, numObservations});}}>
                <label htmlFor="tickerSymbolInput">
                    Ticker Symbol
                </label>
                <input 
                    type="text" 
                    id="tickerSymbolInput" 
                    value={ticker} 
                    onChange={(e)=>{setTicker(e.target.value)}}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default StockPlotControls
