const cityName = document.querySelector('p.city-name')
const input = document.querySelector('input')
const date = document.querySelector('p.date')
const temp = document.querySelector('p.temp')
const description = document.querySelector('p.description')
const feelsLike = document.querySelector('p.feels-like')
const windSpeed = document.querySelector('p.wind-speed')
const preasure = document.querySelector('p.preasure')
const humidity = document.querySelector('p.humidity')
const visibility = document.querySelector('p.visibility')
const clouds = document.querySelector('p.clouds')
const rain = document.querySelector('p.rain')
const errorMsg = document.querySelector('p.error-message');

const apiInfo = {
    link : "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "&appid=5fd8cbda29f168557e4c12a52c2784f9",
    units: "&units=metric",
    lang: "&lang=pl"
}

function getWeather(){
    const apiCity = input.value.toLocaleLowerCase().trim();
    const URL = `${apiInfo.link}${apiCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response.data);
        cityName.textContent = `${response.data.name} ${response.data.sys.country}`;
        // input.textContent = `${response.data.name}`;
        date.textContent = `${new Date().toLocaleString()}`;
        temp.textContent = `${Math.round(response.data.main.temp)} C`;
        description.textContent = `${response.data.weather[0].description}`;
        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} C`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed)} km/h`;
        preasure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        visibility.textContent = `${response.data.visibility} m`;
        clouds.textContent = `${response.data.clouds.all} %`;
        rain.textContent = `${response.data.name}`;
        errorMsg.textContent = '';
    }).catch((error)=>{
        console.log(error.response);
        errorMsg.textContent=`${error.response.data.message}`;
        [cityName, date, description, temp, feelsLike, windSpeed, preasure, humidity, visibility, clouds].forEach((el) => {el.textContent = ''});
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherByEnter(e){
    if(e.key==='Enter')
    {
        getWeather();
    }
}

input.addEventListener('keypress', getWeatherByEnter);