import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Images } from './assets/assets'
import './App.css';

function App() {

	const [weather, setWeather] = useState()
	const [city, setCity] = useState('')
	const [image, setImage] = useState('')
	const [serverMessage, setServerMessage] = useState()
	const fetchWeather = async (city) =>{
		const weatherData = {}
		try{
			const fetchedWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2957152a652f860da4df339f0506b29f&units=metric`);
			console.log('------')
			console.log(fetchedWeather)
			if(fetchedWeather.status==200){
				weatherData.status = true
				weatherData.data = await fetchedWeather.json()
			}
			else{
				weatherData.status = false
				weatherData.message = weatherData.data.message
			}
			return weatherData;
		}catch(error){
			console.log(error)
		}
	}
	const handleInput = (event)=> {
		const enteredValue = event.target.value
		setCity(enteredValue)
	}
	const handleSave= async () => {
		const response = await fetchWeather(city);
		const weatherImage = response.data.weather[0].main
		setWeatherImage(weatherImage)
		if(response.status == true){
			setWeather(response.data)
			console.log(response)
			setCity('')
		}
		else{
			setServerMessage(response.message)
		}
	}
	const setWeatherImage = (image) => {
		if(image=='Clear'){
			setImage(Images.Clear)
			return
		}
		else if(image=='Rain'){
			setImage(Images.Rain)
			return
		}
		else if(image=='Clouds'){
			setImage(Images.Cloud)
			return
		}
		else if(image=='Haze'){
			setImage(Images.Haze)
			return
		}
	}

	return (
		<div className="pt-5">
			<Container>
				<Row className="justify-content-center mb-4">
					<Col xl={4} lg={5} sm={10}>
						<div className="app-holder p-3 mb-1">
							<strong className="d-block mb-3">Enter City Name</strong>
							<form className="search-form mb-3">
								<div className="input-holder position-relative">
									<input className="form-control" placeholder='e.g Daska' value={city} onChange={handleInput} />
									<button type="button" className="btn btn-primary" onClick={handleSave}>Search</button>
								</div>
							</form>
							{weather?
								<>
									<strong className="d-block mb-3">{weather?.name}</strong>
									<div className="weather-image-holder mb-3 d-flex justify-content-center align-items-center">
										<img className="w-100 h-100" src={image} alt='weather snap' />
									</div>
									<div className="d-flex justify-content-center">
										<div className="temp-unit">
											<strong>{weather?.main.temp}</strong>
											<span><sup>0</sup>C</span>
										</div>
									</div>
									<strong className="weather-condition d-block text-center">{weather?.weather[0].main}</strong>
									<div className="d-flex justify-content-between">
										<div className="d-flex">
											<span className="icon-holder">
												<i></i>
											</span>
											<div className="d-flex flex-column">
												<span className="stat-value">{weather?.main.humidity}%</span>
												<span className="stat-name">Humidity</span>
											</div>
										</div>
										<div className="d-flex">
											<span className="icon-holder">
												<i></i>
											</span>
											<div className="d-flex flex-column">
												<span className="stat-value">{weather?.wind.speed}Km/H</span>
												<span className="stat-name">Wind Speed</span>
											</div>
										</div>
									</div>
								</>
								:
								<div className="no-record-cound d-flex justify-content-center align-items-center">{serverMessage}</div>
							}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<h2>Project Description</h2>
						<p>This weather app provides real-time weather updates by fetching weather data using the <strong>OpenWeatherMap API</strong>. Users can input the name of any city, and the app will display the current weather information for that city, ensuring they stay informed about their local climate. The application is designed to be user-friendly and provides key weather details in an easy-to-read format.</p>

						<p>The app retrieves the following details from the API response and displays them in a clear, structured way:</p>
						<ul>
							<li><strong>City Name</strong> – Displays the name of the city entered by the user.</li>
							<li><strong>Weather Condition</strong> – Provides a description of the current weather (e.g., sunny, cloudy, rainy).</li>
							<li><strong>Temperature</strong> – Shows the current temperature in the selected city, in Celsius or Fahrenheit (based on user preference).</li>
							<li><strong>Humidity</strong> – Displays the percentage of humidity in the air.</li>
							<li><strong>Wind Speed</strong> – Provides the current wind speed, which helps users understand how breezy or windy it is outside.</li>
							<li><strong>Weather Icon</strong> – A weather-specific image representing the condition (e.g., sun for clear weather, cloud for overcast, etc.) sourced from the API to visually communicate the weather condition.</li>
						</ul>

						<h2>Technology Stack</h2>
						<p>This app has been developed using the following technologies:</p>
						<ul>
							<li><strong>React</strong> – Used for building the user interface and managing the state of the application. React's component-based architecture makes it easy to fetch and display data from the OpenWeatherMap API, as well as handle user input and dynamically render weather details.</li>
							<li><strong>Bootstrap</strong> – Employed to structure and style the app's UI, ensuring that the application is responsive and looks good on both mobile and desktop devices. Bootstrap's grid system and pre-built components helped speed up the design process.</li>
							<li><strong>OpenWeatherMap API</strong> – The key source of weather data. This API provides accurate, real-time weather information for any city, including weather conditions, temperature, wind speed, and more.</li>
						</ul>

						<h2>Features</h2>
						<p>Some of the key features of the weather app include:</p>
						<ul>
							<li><strong>User-Friendly Interface</strong> – The app features an intuitive and clean design that allows users to easily search for weather data by simply entering the name of the city.</li>
							<li><strong>Dynamic Data Updates</strong> – The weather information updates dynamically based on the user’s input, providing an instant preview of the weather conditions without needing to reload the page.</li>
							<li><strong>Responsive Design</strong> – The app is fully responsive and optimized for both desktop and mobile devices, making it convenient to use anytime, anywhere.</li>
						</ul>

						<h2>Future Enhancements</h2>
						<p>Some potential improvements for the app could include:</p>
						<ul>
							<li>Adding a forecast feature to show upcoming weather conditions for the next few days.</li>
							<li>Implementing geolocation to automatically fetch weather data based on the user's location.</li>
							<li>Allowing users to toggle between different units for temperature (Celsius/Fahrenheit) and wind speed (km/h, mph).</li>
						</ul>
						<h2>Project Repository</h2>
						<p>You can view the source code and contribute to the project by visiting the <a href="https://github.com/mzeeshanh/weather-app" target="_blank" rel="noopener noreferrer">GitHub repository</a>:</p>

					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;