import {useState, useEffect} from "react"
import {useWeather} from "./useWeather"
import {useWikiEntry} from "./useWikiEntry"

export function useTripPlanner(city) {
    // TODO: refactor to useReducer
    const [loading, setLoading] = useState(false)
    const [apiData, setApiData] = useState({
        wikiDescription: null,
        currentWeather: null
    })
    const [error, setError] = useState(null)
    const weatherPromise = useWeather(city)
    const wikiPromise = useWikiEntry(city)


    /* TODO:
        there could be an issue where a user selects a city (selection A),
        then quickly selects another (selection B),
        possibilities: 
            A resolves (flashes unwanted content) then B resolves,
            B resolves (displays desired content) then A resolves (setting undesired content)

        initial solution:
            disable the selection control when the loading boolean is true
    */
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

        Promise.all([
            weatherPromise(),
            wikiPromise(),
            // we do this to avoid flashing a loading screen at the user, eg load time very quick and user sees progress spinner for just a flash
            // always having a consistent loading experience provides feedback to the user (the app is indeed fetching new data)
            sleep("1000ms")
        ]).then(([weather, wikiDescription]) => {
            setLoading(false)
            setApiData({ weather, wikiDescription })
        }).catch(err => {
            console.error(err)
            setLoading(false)
            setError("oops! unable to find travel plan for: " + city?.display)
            setApiDate({ weather: null, wikiDescription: null})
        })
    }, [city])

    return {
        loading,
        apiData,
        error
    }
}


function sleep(stringTime) {
    return new Promise(res => {
        setTimeout(res, Number.parseInt(stringTime))
    })
}
