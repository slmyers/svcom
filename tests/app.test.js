import * as React from "react"
import App from "../pages"
import '@testing-library/jest-dom'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import {enableFetchMocks, disableFetchMocks} from "jest-fetch-mock"
import { cities } from "../hooks"

describe("App", () => {

    beforeAll(enableFetchMocks)

    afterAll(disableFetchMocks)

    afterEach(cleanup)

    it("starts with an empty state", () => {
        const { getByText } = render(<App />)

        expect(getByText("No location selected")).toBeTruthy()
        expect(getByText("Select a city to make a travel plan.")).toBeTruthy()
    })

    it("fetches and display data", async () => {
        // mock the fetch responses
        fetchMock.mockResponse(req => {
            expect(req.url.includes(cities[1].value)).toBe(true)

            if (req.url.includes("/api/get-weather")) {
                return Promise.resolve(JSON.stringify({
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
                }))
            } else if (req.url.includes("en.wikipedia.org")) {
                return Promise.resolve(JSON.stringify({
                    extract: "WIKI DESCRIPTION"
                }))
            } else {
                expect(false).toBe("Unrecognized url.")
            }
        })

        const { getByTestId, getByText, queryByText } = render(<App />)

        const input = getByTestId("city-selector-input")

        expect(input).toBeTruthy()

        await act(async () => {
            fireEvent.change(input, { target: { value: 1 }})
            // min loading time of 1s
            await new Promise(res => setTimeout(res, 500))
        })

        expect(getByText("loading...")).toBeTruthy()

        await act(async () => {
            await new Promise(res => setTimeout(res, 750))
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
})