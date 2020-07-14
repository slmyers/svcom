import * as React from 'react'
import {useCurrentWeather} from './useCurrentWeather'
import {useWikiEntry} from './useWikiEntry'
import { Error } from '../../components'

export function useTripPlanner(city) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const weatherPromise = useCurrentWeather(city)
    const wikiPromise = useWikiEntry(city)

    // the minimum loading length is configurable, good for testing.
    const {sleepDuration} = useTripPlannerCtx()

    React.useEffect(() => {
        if (city?.value == null) {
            dispatch({type: "UNKNOWN_CITY"})
            return
        }

        if (state.loading) {
            console.warn("useTripPlanner: returning from effect early due to ongoing loading state.")
            return
        }

        dispatch({type: "LOADING"})

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
                dispatch({type: "LOADED_WITH_ERROR", payload: weather.error?.info})
            } else {
                dispatch({
                    type: "LOADED_WITHOUT_ERROR", 
                    payload: { weather, wikiDescription }
                })
            }
        }).catch(err => {
            console.error(err)
            dispatch({
                type: "ERROR_RUNNING_NETWORK_REQUEST", 
                payload: "oops! unable to find travel plan for: " + city?.display
            })
        })
    }, [city])

    return state
}

function reducer(state, action) {
    switch (action.type) {

        case "UNKNOWN_CITY": {
            return initialState()
        }

        case "LOADING": {
            return {
                ...state,
                loading: true
            }
        }

        case "LOADED_WITHOUT_ERROR": {
            return {
                error: null,
                loading: false,
                apiData: action.payload,
            }
        }

        case "LOADED_WITH_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case "ERROR_RUNNING_REQUEST": {
            return {
                ...initialState(),
                error: action.payload
            }
        }

        default: {
            console.dir(action)
            throw new Error("useTripPlanner: unrecognized action in reducer")
        }
    }
}

function initialState() {
    return {
        loading: false,
        apiData: {
            wikiDescription: null,
            weather: null
        },
        error: null
    }
}

export const TripPlannerCtx = React.createContext({sleepDuration: 500})
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
