import React from 'react'
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

const StockPlot = (props) => {

    

    class Observation{
        constructor(date, time, open, high, low, close, volume){
            this.date = date
            this.time = time
            this.open = open
            this.high = high
            this.low = low
            this.close = close
            this.volume = volume
        }
    }

    const parseData = (rawData) => {
        const data = []
        for (let key of Object.keys(rawData)){
            const date = key.split(" ")[0]
            const time = key.split(" ")[1]
            const open = rawData[key]['1. open']
            const high = rawData[key]['2. high']
            const low = rawData[key]['3. low']
            const close = rawData[key]['4. close']
            const volume = rawData[key]['5. volume']
            const observation = new Observation(date, time, open, high, low, close, volume)
            data.push(observation)
        }
        return data
    }
    
    const rawData = props.data.data["Time Series (15min)"]
    const data = parseData(rawData)
    console.log(data)

    return (
        <div>
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="high" stroke="#8884d8" />
                <Line type="monotone" dataKey="low" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}

export default StockPlot
