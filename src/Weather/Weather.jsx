import React, { useState } from 'react'
import '../Weather/Weather.css';

const Weather = () => {
    let [search, setSearch] = useState()
    let [weather, setWeather] = useState({
        celsius:20,
        name:'delhi',
        humidity:20,
        speed:2,
        country:'IN',
        image:'/Images/weather.png'
    })
    let[error,setError]=useState("")
    let api = {
        key: "690152af3680ae392c4f91e847172aa5",
        url: "https://api.openweathermap.org/data/2.5/weather"
    }
    //https://openweathermap.org/find?q=banglore
    function handleSearch() {
        fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`).then(res => res.json()).then(data => {
            console.log(data);
            let imagePath='';
            if (data.weather && data.weather.length > 0) {
                // Assuming the weather array is present in the response
                const weatherMain = data.weather[0].main;
            if(weatherMain==="Clouds")
            {
                imagePath="/Images/clouds1.png"
            }
            else if(weatherMain==="Clear")
            {
                imagePath="/Images/sunny.jpg"
            }
            else if(weatherMain==="Rain")
            {
                imagePath="/Images/rain1.jpg"
            }
            else if(weatherMain==="Drizzle")
            {
                imagePath="/Images/rain.jpg"
            }
            else if(weatherMain==="Mist")
            {
                imagePath="/Images/mist.avif"
            }
            
            else{
                imagePath="/Images/weather.png"
            }
            setWeather({...weather, celsius:data.main.temp,name:data.name,humidity:data.main.humidity,speed:data.wind.speed,country:data.sys.country,image:imagePath});
            setError("");
        }else{
            setError("Invalid City Name");
        }
        })
        .catch(err => {
            setError("Invalid City Name");
            console.log(err);
        });
    }
    return (
        <div className='container'>
            <i id='h'>Check Weather in Your City</i>
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='Enter City Name' onChange={(e) => setSearch(e.target.value)} />
                <button onClick={handleSearch}><img src="/Images/magnifying-glass.png" alt="" /></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
                <div className="info">
                    <img src={weather.image} alt="" />
                    <h1>{Math.round(weather.celsius)}°C</h1>
                    <ruby><h2>{weather.country}</h2>  <strong><h2>{weather.name}</h2></strong></ruby>
                    <div className="details">
                        <div className="col">
                            <img src="/Images/HumidityWater.webp" alt="" />
                            <div className='humidity'>
                                <p>{weather.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                            <div className="col">
                                <img src="/Images/wind.png" alt="" />
                                <div className='wind'>
                                    <p>{weather.speed} km/h</p>
                                    <p>Wind</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>


    </div>

    )
}

export default Weather
