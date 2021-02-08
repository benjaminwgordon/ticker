import axios from 'axios'
const key = "984T7K591IF9HT73"

export const getIntraday = async (ticker="gme") => {
    let result = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${key}`)
    const rawData = result.data["Time Series (15min)"]
    if (!rawData){
        return undefined
    }

    class Observation{
        constructor(date, time, open, high, low, close, volume, openCloseSplit, lowHighSplit){
            this.date = date
            this.time = time
            this.open = open
            this.high = high
            this.low = low
            this.close = close
            this.volume = volume
            this.openCloseSplit = openCloseSplit
            this.lowHighSplit = lowHighSplit
        }
    }

    let minimum = Infinity
    let maximum = -Infinity  

    const data = []
    for (let key of Object.keys(rawData).slice(0,64)){
        const date = key.split(" ")[0].split("-").slice(1).join("/")
        const time = key.split(" ")[1].split(":").slice(0,2).join(":")
        const open = parseFloat(rawData[key]['1. open'])
        const high = parseFloat(rawData[key]['2. high'])
        const low = parseFloat(rawData[key]['3. low'])
        const close = parseFloat(rawData[key]['4. close'])
        const volume = parseFloat(rawData[key]['5. volume'])
        const openCloseSplit = [open, close]
        const lowHighSplit = [low, high]
        const observation = new Observation(date, time, open, high, low, close, volume, openCloseSplit, lowHighSplit)
        data.push(observation)

        // track min and max seen values for graph y axis scaling
        
        maximum = Math.max(maximum, high)
        minimum = Math.min(minimum, low)
    }
    
    return {
        data: data.reverse(),
        maximum,
        minimum
    }
}