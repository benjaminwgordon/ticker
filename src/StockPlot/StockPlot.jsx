import React from 'react'
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar, Cell, ComposedChart, Legend} from 'recharts'

const StockPlot = (props) => {    
    const {data, minimum, maximum, showBars, showOpen, showClose, showHigh, showLow} = props
    const yAxisDomain = [(minimum - (maximum - minimum) * 0.2), (maximum + (maximum - minimum) * 0.2)]

    return (
        <ResponsiveContainer width="90%" height={350}>
            <ComposedChart barGap={-8} data={data}>
                <CartesianGrid strokeDasharray="8 8" />
                <XAxis dataKey={(data[0].time ? "time" : "date")}/>
                <YAxis domain={yAxisDomain} tickFormatter={tick => parseFloat(tick).toPrecision(4)}/>
                <Tooltip />     
                <Legend />  
                {showBars && 
                    <Bar name="Low - High" dataKey="lowHighSplit" fill="green" barSize={4}>
                        {
                            data.map((entry, index) => {
                                const fillColor = entry.openCloseSplit[0] < entry.openCloseSplit[1] ? "green" : "red"
                                return <Cell fill={fillColor} key={entry.date + entry.time}/>
                            })
                        }
                    </Bar>
                }
                {showBars && 
                    <Bar name="Open - Close" dataKey="openCloseSplit" fill="green" barSize={12}>
                        {
                            data.map((entry, index) => {
                                const fillColor = entry.openCloseSplit[0] < entry.openCloseSplit[1] ? "green" : "red"
                                return <Cell fill={fillColor} key={entry.date + entry.time}/>
                            })
                        }
                    </Bar>
                }
                {showClose && <Line type="monotone" name="close" dataKey="close" stroke="black" dot={false} />}
                {showOpen && <Line type="monotone" name="open" dataKey="open" stroke="#2243B6" dot={false} />}
                {showHigh && <Line type="monotone" name="high" dataKey="high" stroke="#FF00CC" dot={false} />}
                {showLow && <Line type="monotone" name="low" dataKey="low" stroke="#FF6037" dot={false} />}
            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default StockPlot
