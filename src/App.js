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
					<Col xl={4} lg={5} sm={6}>
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
						<p>I have used <strong>openweathermap</strong> API to fetch the weather condition of the user entered city.</p>
						<p>I have used these details from API response in my App:</p>
						<ul>
							<li>City Name</li>
                            <li>Weather Condition</li>
                            <li>Temperature</li>
                            <li>Humidity</li>
                            <li>Wind Speed</li>
							<li>A image showing the condition of weather</li>
						</ul>
					</Col>
				</Row>
				<Row>
					<Col>
					    <p><a href="https://github.com/mzeeshanh/weather-app" target="_blank">Click Here</a> for GitHub Repository</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default App;