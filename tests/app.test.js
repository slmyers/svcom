import * as React from "react"
import App from "../pages"
import { render, cleanup } from '@testing-library/react'

describe("App", () => {

    afterEach(cleanup)

    it("starts with an empty state", () => {
        const { getByText } = render(<App />)

        expect(getByText("No location selected")).toBeTruthy()
        expect(getByText("Select a city to make a travel plan.")).toBeTruthy()
    })

})