const fetch = require("node-fetch")

export default (req, res) => {
    if (!req.query.city) {
        res.status(400).json({ error: "expected city as a query param."})
    } else {
        const prefix = `http://api.weatherstack.com/current?`
        const suffix = [
            `access_key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            `query=${req.query.city}`
        ].join("&")
        const endpoint = encodeURI(prefix + suffix)
    
        return fetch(endpoint)
            .then(res => res.json())
            .then(weatherData => {
                res.json(weatherData.current)
            })
            .catch(e => {
                console.log(e.message)
                res.status(500).json({ error: e.message})
            })
    }
}