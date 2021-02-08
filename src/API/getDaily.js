import axios from 'axios'
const key = "984T7K591IF9HT73"

export const get5d = async (ticker="gme") => {
    let data = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=compact&datatype=json&apikey=${key}`)
    return data.data["Time Series (Daily)"]
}