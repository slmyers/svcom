import Head from 'next/head'
import { useTripPlanner, useCities } from "../hooks"
import { Error, WeatherForecast, WikiEntry } from "../components"

const Home = () => {
  const cities = useCities()
  const [selectedCity, setSelectedCity] = React.useState(null)
  const {
    loading,
    apiData,
    error
  } = useTripPlanner(selectedCity)

  return (
    <div className="container">
      <Head>
        <title>Silvacom Exercise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <h3 className="title">
          Trip Planner
      </h3>
  
      {/* TODO: should be same width as above text */}
      <select disabled={loading} onChange={e => setSelectedCity(cities[e.currentTarget.value])}>
        <option value={null}></option>
        {cities.map(({display}, i) => (
          <option key={i} value={i}>{display}</option>
        ))}
      </select>

      {error ? (
        <Error error={error} />
      ) : (
        <div className="results">
          <div className="card">
            <WikiEntry 
              wikiDescription={apiData?.wikiDescription}
            />
          </div>
          <div className="card">
            <WeatherForecast
              currentWeather={apiData?.currentWeather}
            />
          </div>
        </div>
      )}
  
      <style jsx>{`
        .container {
          height: 100vh;
          padding: 0 0.5rem;
          max-width: 500px;
        }

        .results {
          height: 100%;
          width: 100%;
        }

        .results > .card {
          margin-top: 2rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
  
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
  
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
  
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
  
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
  
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

export default Home
