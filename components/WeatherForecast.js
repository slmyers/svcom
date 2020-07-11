import * as React from "react"

export function WeatherForecast({currentWeather}) {
    if (!currentWeather) return null

    return (
        <div>
          FORCAST FOR {JSON.stringify(currentWeather, null, 4)}
        </div>
    )
}