import React, {useState, useEffect} from "react";
import axios from 'axios';
import './App.css'


function App() {
const [weatherData, setWeatherData] = useState({});
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const [location, setLocation] = useState('');
const handleKeyDown = (e) => {if(e.key === 'Enter'){setLocation(e.target.value);}}

useEffect(() => {
  const fetchWeather = async () =>{
    const apiUrl =`http://api.weatherstack.com/forecast?
access_key=${apiKey}&query=${location}`;
try{
  const response = await axios.get(apiUrl);
setWeatherData(response.data);
console.log(response.data);
} catch (error) {console.error('fetch error:', error)};
  }; fetchWeather()}, [location]
  
);
class Welcome extends React.Component {
  render() {
    return (
      <>
      <h1>Welcome to Wethermon!</h1><br />
      <h2>The most reliable weather app ;)</h2>
      </>
    )
  }
};


  return (
    <>
    <Welcome/>
    <input type="text" placeholder="Enter a city name"  onKeyDown={handleKeyDown}/>
    {weatherData.current ? (
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Weather Description: {weatherData.current.weather_descriptions[0]}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
export default App;
