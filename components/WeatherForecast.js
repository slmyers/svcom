import * as React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import moment from 'moment-timezone'
import PropTypes from 'prop-types'

export function WeatherForecast({currentWeather, style, location}) {
    if (!(currentWeather && location)) {
        return null
    }
    const { contentRoot, details, day, night } = useStyles()
    const showIconImage = Array.isArray(currentWeather.weather_icons) && currentWeather.weather_icons[0] != null
    const dayPeriod = currentWeather.is_day?.toLowerCase() === "yes" ? day : night

    return (
        <Card style={style} className={dayPeriod} data-testid="weather-forecast">
            <CardContent className={contentRoot}>
                {showIconImage && <img src={currentWeather.weather_icons[0]} height={73} width={64} data-testid="forecast-icon-image"/>}
                <Box display="flex" flexDirection="column" className={details}>

                    <Typography>
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

WeatherForecast.propTypes = {
    currentWeather: PropTypes.shape({
        weather_icons: PropTypes.arrayOf(PropTypes.string).isRequired,
        temperature: PropTypes.number.isRequired,
        weather_descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
        humidity: PropTypes.number.isRequired
    }),
    location: PropTypes.shape({
        localtime: PropTypes.string.isRequired,
        timezone_id: PropTypes.string.isRequired
    })
}

const useStyles = makeStyles(theme => ({
    contentRoot: {
        display: "flex",
        alignItems: "center"
    },

    details: {
      marginLeft: "2em"
    },

    night: {
        background: "linear-gradient(90deg, rgba(60,74,144,1) 76%, rgba(255,255,255,1) 100%)",
        color: "white"
    },

    day: {
        background: "linear-gradient(90deg, rgba(150,180,228,1) 62%, rgba(255,255,255,1) 100%)",
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