const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const windSpeed1 = document.querySelector('#windspeed');
const windChill = document.querySelector("#windchill");

const url = 'https://api.openweathermap.org/data/2.5/weather?q=rio de janeiro&units=imperial&appid=da3f1563c6fac50272c4dd230f193a30';


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;


    weather = weatherData.weather[0].description;
    captionDesc.innerHTML = `<p>${weather}</p>`;


    windSpeed1.textContent = `${weatherData.wind.speed.toFixed(0)}`;


    const windSpeed = parseFloat(weatherData.wind.speed.toFixed(0));
    const temp = parseFloat(weatherData.main.temp.toFixed(0));
    let windChillAmount = 35.74 + (0.6215 * temp) - (35.75 * (windSpeed ** 0.16)) +(0.4275 * temp * (windSpeed ** 0.16));

    if(temp<=50 && windSpeed > 3.0){
        windChill.innerText = `${windChillAmount.toFixed(0)} ºF`;
    }else{
        windChill.innerText = "N/A";
    }
}