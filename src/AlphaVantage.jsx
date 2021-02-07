import axios from 'axios'

const key = "984T7K591IF9HT73"

export const getIntraday = async (ticker="aal") => {
    let data = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${key}`)
    return data.data["Time Series (15min)"]
}