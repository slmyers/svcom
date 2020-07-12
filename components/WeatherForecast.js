import * as React from "react"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box"
import Divider from "@material-ui/core/Divider"
import moment from "moment-timezone"

// https://react-open-weather.gitbook.io/project/
export function WeatherForecast({currentWeather, style={}, isToday = true, location}) {
    if (!currentWeather) return null

    const { contentRoot, information, day, night } = useStyles()

    const showIconImage = Array.isArray(currentWeather.weather_icons) && currentWeather.weather_icons[0] != null

    const format = isToday ? "dddd DD MMMM" : "DAYS_OTHER_THAN_TODAY_ARE_NOT_SUPPORTED"
    const dayPeriod = currentWeather.is_day?.toLowerCase() === "yes" ? day : night

    return (
        <Card style={style} className={dayPeriod}>
            <CardContent className={contentRoot}>
                {showIconImage && <img src={currentWeather.weather_icons[0]} height={73} width={64}/>}
                <Box display="flex" flexDirection="column" className={information}>
                    <Typography>
                        {/* TODO: is this accurate? The timezones and the hour differences make me think not */}
                        {moment(location.localtime).tz(location.timezone_id).format("dddd DD MMMM")}
                    </Typography>

                    <StyledDivider />

                    <TempLarge value={currentWeather.temperature} />

                    {currentWeather.weather_descriptions.map((description, i) => (
                        <Typography key={i}>
                            {description}
                        </Typography>
                    ))}

                    <StyledDivider />

                    <Typography>
                        Wind: {currentWeather.wind_speed} km/h
                    </Typography>

                    <Typography>
                        Humidity: {currentWeather.humidity}%
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    contentRoot: {
        display: "flex",
    },

    information: {
      marginLeft: "2em"
    },

    night: {
      backgroundColor: "#3c4a90",
      color: "white"
    },

    day: {
      backgroundColor: "#96b4e4",
      color: "white"
    }
}))

function StyledDivider() {
    return <Divider style={{backgroundColor: "white"}} />
}

function TempLarge({value}) {
    return (
      <Typography variant="h3">
          {value} C
      </Typography>
    )
}