import React from 'react'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell} from 'recharts'

const StockPlot = (props) => {    
    const {data, minimum, maximum, timeScale} = props
    const yAxisDomain = [(minimum - (maximum - minimum) * 0.2), (maximum + (maximum - minimum) * 0.2)]
    return (
        <div>
            <BarChart width={730} height={250} data={data}  barGap={-8} >
                <CartesianGrid strokeDasharray="8 8" />
                <XAxis dataKey={timeScale === "1d" ? "time" : "date"}/>
                <YAxis domain={yAxisDomain} tickFormatter={tick => parseFloat(tick).toPrecision(4)}/>
                <Tooltip />
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
