import * as React from "react"
import { 
  Error, 
  WeatherForecast, 
  WikiEntry, 
  CitySelector,
  AppBar,
  EmptySelection,
  Loading
} from "../components"
import { useTripPlanner, useCities } from "../hooks"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Paper from "@material-ui/core/Paper"

const Home = () => {
  const classes = useStyles()
  const cities = useCities()
  const [selectedCity, setSelectedCity] = React.useState(null)
  const {
    loading,
    apiData,
    error
  } = useTripPlanner(selectedCity)

  return (
    <>
        <AppBar className={classes.appBar}/>
        <Paper className={classes.container}>

        <Loading isLoading={loading} />

        <CitySelector
            className={classes.citySelector}
            disabled={loading}
            onChange={e => setSelectedCity(cities[e.currentTarget.value])}
            cities={cities}
            showHelperText={selectedCity == null && !loading}
        />

        {/* TODO: clean up messy rendering logic */}
        {error ? (
            <Error error={error} />
        ) : (
            <div className={classes.results}>
                {(selectedCity != null && !loading) ? (
                    <>
                        <WikiEntry 
                            wikiDescription={apiData?.wikiDescription}
                            selectedCity={selectedCity}
                        />
                        <WeatherForecast
                            style={{marginTop: "2em"}}
                            currentWeather={apiData?.weather?.current}
                            location={apiData?.weather?.location}
                        />
                    </>
                ) : (
                    <EmptySelection show={selectedCity == null}/>
            )}
            </div>
        )}  
        </Paper>
        <style jsx global>{`
            html,
            body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                background-color: #efeeee;
            }

            * {
                box-sizing: border-box;
            }
        `}</style>
    </>
  )
}


const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            maxWidth: 750,
            margin: "0 auto"
        } 
    },  
    container: {
        maxWidth: 750,
        margin: "0 auto",
        // subtract toolbar height to avoid unecessary overflow
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            minHeight: "calc(100vh - 56px)",
        },
        [theme.breakpoints.up("sm")]: {
            padding: "0 1.5rem",
            minHeight: "calc(100vh - 64px)",
        },
        display: "flex",
        flexDirection: "column",
    },
    results: {
        height: "100%",
        width: "100%",
        margin: "2em 0",
        [theme.breakpoints.down("sm")]: {
            padding: "0 1rem"
        },
    },
    citySelector: {
        marginTop: "1em",
        [theme.breakpoints.down("sm")]: {
            padding: "0 1rem"
        },
    }
}))

export default Home
