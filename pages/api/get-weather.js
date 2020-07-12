const fetch = require("node-fetch")

// to avoid a Mixed-Content error, we send our weather request from this serverless function.
export default (req, res) => {
    if (!req.query.city) {
        res.status(400).json({ error: "expected city as a query param."})
    } else {
        // TODO: we might have to specify the day because if we use the current value then 
        // we might get the value for the previous day etc.
        // we need to account for timezones
        const prefix = `http://api.weatherstack.com/current?`
        const suffix = [
            `access_key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            `query=${req.query.city}`
        ].join("&")
        const endpoint = encodeURI(prefix + suffix)
    
        return fetch(endpoint)
            .then(res => res.json())
            .then(weatherData => {
                console.log(weatherData)
                res.json(weatherData)
            })
            .catch(e => {
                console.log(e.message)
                res.status(500).json({ error: e.message})
            })
    }
}