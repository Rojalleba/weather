
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cities, setCities] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    fetchCitiesOptions();
  }, [])

  const fetchCitiesOptions = () => {
    fetch(`http://dataservice.accuweather.com/locations/v1/topcities/100?apikey=${import.meta.env.VITE_API_KEY}`)
      .then((data) => data.json())
      .then((response) => {
        setCities(response);
      })
  }

  const fetchcurrentWeather = (locationKey) => {
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${import.meta.env.VITE_API_KEY}`)
      .then((data) => data.json())
      .then((response) => {
        console.log(response)
        setCurrentWeather(response[0])
        SetIsLoading(false);

      })
  }

  const handleLocationChange = (event) => {
    if (event.target.value != "") {
      SetIsLoading(true);
      fetchcurrentWeather(event.target.value)
    }
  }

  return (
    <>
      <div className='container'>
        <h1> Weather App</h1>
        <div>
          <select name="city" id="city" onChange={handleLocationChange}>
            <option value=""> Select a city</option>

            {
              cities.map((city) => {
                return <option value={city.Key}>
                  {city.LocalizedName}
                </option>

              })
            }
          </select> <br />

          {
            currentWeather ?
              isLoading ?
                <>Loading...</>
                :

                <div className='card mt-5'>
                  <div className="Row">
                    <div className="Col">
                      <div className='Row'>
                        {
                          currentWeather?.Temperature?.Metric?.Value + " ° " + currentWeather?.Temperature?.Metric?.Unit
                        }
                      </div>

                      <div className='Row'>
                        {
                          currentWeather?.Temperature.Imperial.Value + " ° " + currentWeather?.Temperature?.Imperial?.Unit
                        }
                      </div>
                      <div className='Col'>
                        {
                          currentWeather?.WeatherText
                        }
                      </div>
                    </div>
                  </div>
               
               </div>
               :
               <></>
          }
        </div>
      </div>
    </>
  )
}

export default App
