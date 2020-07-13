import React, {useState, useEffect} from "react"
import {useCurrentWeather} from "./useCurrentWeather"
import {useWikiEntry} from "./useWikiEntry"

export function useTripPlanner(city) {
    // TODO: refactor to useReducer
    const [loading, setLoading] = useState(false)
    const [apiData, setApiData] = useState({
        wikiDescription: null,
        currentWeather: null
    })
    const [error, setError] = useState(null)
    const weatherPromise = useCurrentWeather(city)
    const wikiPromise = useWikiEntry(city)

    // the minimum loading length is configurable, good for testing.
    const {sleepDuration} = useTripPlannerCtx()

    useEffect(() => {
        if (city?.value == null) {
            setLoading(false)
            setError(null)
            setApiData({
                wikiDescription: null,
                weather: null
            })
            return
        }

        if (loading) {
            return
        }

        setLoading(true)

        // by using Promise.all we can wait for all requests to finish and avoid only the data staggering in
        // also it makes a single loading spinner convienient, which can be nicer than two different disjointed spinners.
        Promise.all([
            weatherPromise(),
            wikiPromise(),
            // we do this to avoid flashing a loading screen at the user, eg load time very quick and user sees progress spinner for just a flash
            // always having a consistent loading experience provides feedback to the user (the app is indeed fetching new data)
            sleep(sleepDuration)
        ]).then(([weather, wikiDescription]) => {
            if (weather.success === false) {
                setError(weather.error?.info)
            }
            setApiData({ weather, wikiDescription })
            setLoading(false) 
        }).catch(err => {
            console.error(err)
            setLoading(false)
            setError("oops! unable to find travel plan for: " + city?.display)
            setApiData({ weather: null, wikiDescription: null})
        })
    }, [city])

    return {
        loading,
        apiData,
        error
    }
}

export const TripPlannerCtx = React.createContext({sleepDuration: 1000})
export function TripPlannerProvider({children, value}) {
    return (
        <TripPlannerCtx.Provider value={value}>
            {children}
        </TripPlannerCtx.Provider>
    )
}
export function useTripPlannerCtx() {
    return React.useContext(TripPlannerCtx)
}

function sleep(duration) {
    return new Promise(res => {
        setTimeout(res, duration)
    })
}
