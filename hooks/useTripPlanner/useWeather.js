import {useState, useEffect, useCallback} from "react"

export function useWeather(city) {
    return useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }
        
        return fetch(buildEndpoint(city.value))
            .then(res => res.json())
            .then(weatherData => weatherData.current)
    }, [city])
}

function buildEndpoint(city) {
    const prefix = `http://api.weatherstack.com/current?`
    const suffix = [
        `access_key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
        `query=${city}`
    ].join("&")
    
    return encodeURI(prefix + suffix)
}