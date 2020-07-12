import Head from 'next/head'
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
    <div className={classes.container}>
      <Head>
        <title>Silvacom Exercise</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
  
      <AppBar />

      <Loading isLoading={loading} />
      
      <CitySelector
        className={classes.citySelector}
        disabled={loading}
        onChange={e => setSelectedCity(cities[e.currentTarget.value])}
        cities={cities}
      />

      {error ? (
        <Error error={error} />
      ) : (
        <div className={classes.results}>
          {selectedCity != null ? (
            <>
              <WikiEntry 
                wikiDescription={apiData?.wikiDescription}
              />
              <WeatherForecast
                currentWeather={apiData?.currentWeather}
              />
            </>
          ) : (
            <EmptySelection />
          )}
        </div>
      )}  
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
  
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}


var useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    padding: "0 0.5rem",
    maxWidth: 750,
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100vw"
    },
    display: "flex",
    flexDirection: "column"
  },
  results: {
    height: "100%",
    width: "100%",
    marginTop: "2em",
    "& *:not(:first-child)": {
      marginTop: "2em"
    }
  },
  citySelector: {
    marginTop: "1em"
  }
}))

export default Home
