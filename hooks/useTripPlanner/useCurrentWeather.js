import {useCallback} from "react"
import { useCachedFetch } from "./useCachedFetch"

export function useCurrentWeather(city) {
    const cachedFetch = useCachedFetch()
    return useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }
        
        return cachedFetch(buildEndpoint(city.value))
    }, [city, cachedFetch])
}

function buildEndpoint(city) {    
    return encodeURI(`/api/get-current-weather?city=${city}`)
}