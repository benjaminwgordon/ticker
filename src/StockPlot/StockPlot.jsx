import React from 'react'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell} from 'recharts'

const StockPlot = (props) => {
    const {numObservations, rawData} = props
    let minimum = Infinity
    let maximum = -Infinity    

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

    const parseData = (rawData, numObservations) => {
        const data = []
        for (let key of Object.keys(rawData).slice(0,numObservations)){
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
        return data.reverse()
    }
    
    const data = parseData(rawData, numObservations)
    const yAxisDomain = [(minimum - (maximum - minimum) * 0.2), (maximum + (maximum - minimum) * 0.2)]

    return (
        <div>
            <BarChart width={730} height={250} data={data}  barGap={-8} >
                <CartesianGrid strokeDasharray="8 8" />
                <XAxis dataKey="time"/>
                <YAxis domain={yAxisDomain} tickFormatter={tick => parseFloat(tick).toPrecision(4)}/>
                <Tooltip />
                <Legend />
                <Bar name="Low - High" dataKey="lowHighSplit" fill="green" barSize={4}>
                    {
                        data.map((entry, index) => {
                            const fillColor = entry.openCloseSplit[0] < entry.openCloseSplit[1] ? "green" : "red"
                            return <Cell fill={fillColor} key={entry.date + entry.time}/>
                        })
                    }
                </Bar>
                <Bar name="Open - Close" dataKey="openCloseSplit" fill="green" barSize={12}>
                    {
                        data.map((entry, index) => {
                            const fillColor = entry.openCloseSplit[0] < entry.openCloseSplit[1] ? "green" : "red"
                            return <Cell fill={fillColor} key={entry.date + entry.time}/>
                        })
                    }
                </Bar>
            </BarChart>
        </div>
    )
}

export default StockPlot
