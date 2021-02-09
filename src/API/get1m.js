import axios from 'axios'
const key = process.env.REACT_APP_ALPHAVANTAGE_API_KEY

class Observation{
    constructor(date, open, high, low, close, volume, openCloseSplit, lowHighSplit){
        this.date = date
        this.open = open
        this.high = high
        this.low = low
        this.close = close
        this.volume = volume
        this.openCloseSplit = openCloseSplit
        this.lowHighSplit = lowHighSplit
    }
}

export const get1m = async (ticker="gme") => {
    const query = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${key}`
    let result = await axios.get(query)
    const rawData = result.data["Time Series (Daily)"]
    if (!rawData){
        return undefined
    }

    let minimum = Infinity
    let maximum = -Infinity  

    const data = []
    for (let key of Object.keys(rawData).slice(0,30)){
        const date = key.split(" ")[0].split("-").slice(1).join("/")
        const open = parseFloat(rawData[key]['1. open'])
        const high = parseFloat(rawData[key]['2. high'])
        const low = parseFloat(rawData[key]['3. low'])
        const close = parseFloat(rawData[key]['4. close'])
        const volume = parseFloat(rawData[key]['5. volume'])
        const openCloseSplit = [open, close]
        const lowHighSplit = [low, high]
        const observation = new Observation(date, open, high, low, close, volume, openCloseSplit, lowHighSplit)
        data.push(observation)

        // track min and max seen values for graph y axis scaling
        
        maximum = Math.max(maximum, high)
        minimum = Math.min(minimum, low)
    }

    const output = {
        data: data.reverse(),
        maximum,
        minimum
    }

    
    return output
}