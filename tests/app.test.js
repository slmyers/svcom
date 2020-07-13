import * as React from "react"
import App from "../pages"
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import {enableFetchMocks, disableFetchMocks} from "jest-fetch-mock"
import { cities, CachedFetchProvider, TripPlannerProvider } from "../hooks"

describe("App", () => {

    beforeAll(enableFetchMocks)

    afterAll(disableFetchMocks)

    afterEach(cleanup)

    beforeEach(() => {
        fetchMock.resetMocks()
    })

    it("starts with an empty state", () => {
        const { getByText } = render(<App />)

        expect(getByText("No location selected")).toBeTruthy()
        expect(getByText("Select a city to make a travel plan.")).toBeTruthy()
    })

    it("fetches and display data", async () => {
        // mock the fetch responses
        fetchMock.mockResponse(req => {
            expect(req.url.includes(cities[1].value)).toBe(true)

            if (req.url.includes("/api/get-current-weather")) {
                return Promise.resolve(JSON.stringify(WEATHER_API_DATA))
            } else if (req.url.includes("en.wikipedia.org")) {
                return Promise.resolve(JSON.stringify(WIKI_API_DATA))
            } else {
                expect(false).toBe("Unrecognized url.")
            }
        })

        const cache = new Map()
        const { getByTestId, getByText, queryByText } = render(
            <TripPlannerProvider value={{sleepDuration: 50}}>
                <CachedFetchProvider value={{maxAge: 500, cache}}>
                    <App />
                </CachedFetchProvider>
            </TripPlannerProvider>
        )

        const input = getByTestId("city-selector-input")
        await act(async () => {
            fireEvent.change(input, { target: { value: 1 }})
            await Promise.resolve()
        })

        expect(getByText("loading...")).toBeTruthy()

        await act(async () => {
            await new Promise(res => setTimeout(res, 51))
        })

        expect(queryByText("loading...")).toBeNull()

        expect(getByText("WIKI DESCRIPTION")).toBeTruthy()
        expect(getByText("Sunday 12 July")).toBeTruthy()
        expect(getByText("18 C")).toBeTruthy()
        expect(getByText("Sunny")).toBeTruthy()
        expect(getByText("Wind: 15 km/h")).toBeTruthy()
        expect(getByText("Humidity: 65%")).toBeTruthy()
        expect(getByTestId("forecast-icon-image")).toHaveAttribute(
            "src", 
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
        )
    })


    it("will display the info prop of a weatherstack error object", async () => {
        fetchMock.mockResponse(req => {
            if (req.url.includes("/api/get-current-weather")) {
                return Promise.resolve(JSON.stringify(WEATHER_API_ERROR))
            } else if (req.url.includes("en.wikipedia.org")) {
                return Promise.resolve(JSON.stringify(WIKI_API_DATA))
            } else {
                expect(false).toBe("Unrecognized url.")
            }
        })

        const cache = new Map()
        const { getByTestId, getByText, queryByText } = render(
            <TripPlannerProvider value={{sleepDuration: 50}}>
                <CachedFetchProvider value={{maxAge: 500, cache}}>
                    <App />
                </CachedFetchProvider>
            </TripPlannerProvider>
        )

        const input = getByTestId("city-selector-input")
        await act(async () => {
            fireEvent.change(input, { target: { value: 1 }})
            await new Promise(res => setTimeout(res, 51))
        })

        expect(queryByText("WIKI DESCRIPTION")).toBeNull()

        expect(getByTestId("error-icon")).toBeTruthy()

        expect(getByText("Oops, something went wrong!")).toBeTruthy()

        expect(getByText("Your monthly API request volume has been reached. Please upgrade your plan.")).toBeTruthy()
    })

    it("caches fetch requests by url for a configurable maxAge", async () => {
        fetchMock.mockResponse(req => {
            if (req.url.includes("/api/get-current-weather")) {
                return Promise.resolve(JSON.stringify(WEATHER_API_DATA))
            } else if (req.url.includes("en.wikipedia.org")) {
                return Promise.resolve(JSON.stringify(WIKI_API_DATA))
            } else {
                expect(false).toBe("Unrecognized url.")
            }
        })

        // keep a reference to the original function so we can restore at end of the test
        const original = Date.now

        // use this as a mock value
        const now = Date.now()
        const cache = new Map()

        const { getByTestId } = render(
            <TripPlannerProvider value={{sleepDuration: 0}}>
                <CachedFetchProvider value={{maxAge: 500, cache}}>
                    <App />
                </CachedFetchProvider>
            </TripPlannerProvider>
            
        )

        const input = getByTestId("city-selector-input")

        // mock the function
        Date.now = jest.fn(() => now)
        await act(async () => {
            fireEvent.change(input, { target: { value: 1 }})
            await new Promise(res => setTimeout(res, 10))
        })
        expect(fetchMock).toHaveBeenCalledTimes(2)
        await act(async () => {
            fireEvent.change(input, { target: { value: 2 }})
            await new Promise(res => setTimeout(res, 10))
        })
        expect(fetchMock).toHaveBeenCalledTimes(4)

        // the first city is still valid in the cache, do not expect more calls to fetch
        await act(async () => {
            fireEvent.change(input, { target: { value: 1 }})
            await new Promise(res => setTimeout(res, 10))
        })
        expect(fetchMock).toHaveBeenCalledTimes(4)

        // now we will invalidate all the items in the cache, so we should expect two more fetch calls for this city
        Date.now = jest.fn(() => now + 500)
        await act(async () => {
            fireEvent.change(input, { target: { value: 2 }})
            await new Promise(res => setTimeout(res, 10))
        })
        expect(fetchMock).toHaveBeenCalledTimes(6)

        // verify the mock was called in the correct order
        expect(fetchMock.mock.calls).toEqual([
            [ `/api/get-current-weather?city=${cities[1].value}` ],
            [ `https://en.wikipedia.org/api/rest_v1/page/summary/${cities[1].value}` ],
            [ `/api/get-current-weather?city=${cities[2].value}` ],
            [ `https://en.wikipedia.org/api/rest_v1/page/summary/${cities[2].value}` ],
            // we made a call for cities[1].value here, but it was cached

            // the cache was invalidated before this call
            [ `/api/get-current-weather?city=${cities[2].value}` ],
            [ `https://en.wikipedia.org/api/rest_v1/page/summary/${cities[2].value}` ]
        ])

        Date.now = original
    })
})

const WIKI_API_DATA = {
    extract: "WIKI DESCRIPTION"
}

const WEATHER_API_DATA = {
    location: {
        localtime: "2020-07-12 11:21",
        timezone_id: "America/Edmonton"
    },
    current: {
        weather_icons: ["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"],
        temperature: 18,
        weather_descriptions: ["Sunny"],
        humidity: 65,
        wind_speed: 15
    }
}

const WEATHER_API_ERROR = {
    success: false,
    error: {
        code: 104,
        type: "usage_limit_reached",
        info: "Your monthly API request volume has been reached. Please upgrade your plan."
    }
}