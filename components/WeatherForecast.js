import * as React from "react"

// https://react-open-weather.gitbook.io/project/
export function WeatherForecast({currentWeather}) {
    if (!currentWeather) return null

    return (
        <div>
          FORCAST FOR {JSON.stringify(currentWeather, null, 4)}
        </div>
    )
}