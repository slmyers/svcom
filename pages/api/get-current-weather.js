import fetch from 'node-fetch'

// the free tier of weatherstack only provides an http endpoint, if we attempt to fetch on the client
// we get a Mixed-Content error. So instead we fetch from the server.
export default (req, res) => {
    if (!req.query.city) {
        res.status(400).json({ error: "expected city as a query param."})
    } else {
        const prefix = `http://api.weatherstack.com/current?`
        const query = [
            `access_key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
            `query=${req.query.city}`
        ].join("&")
        const endpoint = encodeURI(prefix + query)
    
        return fetch(endpoint)
            .then(res => res.json())
            .then(weatherData => {
                res.json(weatherData)
            })
            .catch(e => {
                console.log(e.message)
                res.status(500).json({ error: e.message})
            })
    }
}