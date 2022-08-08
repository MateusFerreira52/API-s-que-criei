const cityNameDisplay = document.querySelector('#name-city')
const cityTempDisplay = document.querySelector('#temp-city')
const countryNameDisplay = document.querySelector('#name-country')
const stateName = document.querySelector('#name-state')
const weatherTypeDisplay = document.querySelector('#weather-type')
const button = document.querySelector('#btn')
const input = document.querySelector('#input')
const img = document.querySelector('#image-icon')


async function updateApp(app){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${app.lat}&lon=${app.lon}&lang=${app.lang}&units=${app.units}&appid=${app.key}`
 
    const city = await fetch(url).then(response => response.json())

        const country = city.sys.country
        const name = city.name
        const temp = city.main.temp
        const weather = city.weather[0].description
        const icon = city.weather[0].icon

        const tam = weather.length 
        const firstLetterUpperCase = weather.substring(0, 1).toUpperCase()
        const restOfWeather = weather.substring(1, tam)

        countryNameDisplay.textContent = app.countryName || country
        cityNameDisplay.textContent = app.cityName || name 
        stateName.textContent = app.stateName
        cityTempDisplay.textContent = `${temp}°`
        weatherTypeDisplay.textContent = `${firstLetterUpperCase}${restOfWeather}`
        img.src = `https://openweathermap.org/img/w/${icon}.png`
}


 const init = () => {
    navigator.geolocation.getCurrentPosition(position => {
        const app = {
            key:'35c457f455c6824f70134563f2517534',
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            units: 'metric',
            lang: 'pt',
            }

            button.addEventListener('click', () => {
                if(input.value.trim() !== ''){
                insertAddress(input.value, app)
                }
                return;
                
            })

            updateApp(app)

    })
}


init()


async function fecthAddress(address, app){
    
    const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${address.city}&apiKey=${address.mykey}`
    const addresses = await fetch(geocodingUrl).then(response => response.json())
    
       const lat = addresses.features[0].geometry.coordinates[1]
       const lon = addresses.features[0].geometry.coordinates[0]
       const cityName = addresses.features[0].properties.city
       const countryName = addresses.features[0].properties.country
       const stateName = addresses.features[0].properties.state

        app.lat = lat
        app.lon = lon
        app.cityName = cityName
        app.countryName = countryName
        app.stateName = stateName

        updateApp(app)
}


function insertAddress(info, app){

    const address = {
        city: info,
        mykey:'8d31fa5922264cb0a0694f14dfe934fc'
    }

    fecthAddress(address, app)

}