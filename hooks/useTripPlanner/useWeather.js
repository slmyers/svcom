import {useCallback} from "react"

export function useWeather(city) {
    return useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }
        
        return fetch(buildEndpoint(city.value)).then(res => res.json())
    }, [city])
}

function buildEndpoint(city) {    
    return encodeURI(`/api/get-weather?city=${city}`)
}