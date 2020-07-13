import * as React from 'react'
import {useCurrentWeather} from './useCurrentWeather'
import {useWikiEntry} from './useWikiEntry'
import { Error } from '../../components'

export function useTripPlanner(city) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const weatherPromise = useCurrentWeather(city)
    const wikiPromise = useWikiEntry(city)

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

        // by using Promise.all we can wait for all requests to finish and avoid the UI "staggering in"
        Promise.all([
            weatherPromise(),
            wikiPromise(),
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
                type: "ERROR_HANDLING_NETWORK_REQUEST", 
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

        case "ERROR_HANDLING_NETWORK_REQUEST": {
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