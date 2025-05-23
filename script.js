async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const saveMessage = document.getElementById("saveMessage");
  
    if (!city) {
      weatherResult.innerHTML = "Please enter a city name.";
      saveMessage.innerHTML = "";
      return;
    }
  
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;
  
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '1d525b34e0msh1af520beb66fc31p143a52jsn9c204cf69967',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        weatherResult.innerHTML = "City or Country not found!";
        saveMessage.innerHTML = "";
        return;
      }
      const data = await response.json();
      const tempFahrenheit = data.main.temp;
      const tempCelsius = (tempFahrenheit - 32) * 5/9;
       

  
      weatherResult.innerHTML = `
        <p><strong>📍 ${data.name}, ${data.sys.country}</strong></p>
        <p>🌡️ Temperature: ${tempCelsius.toFixed(2)} °C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
      
    } catch (err) {
      console.error(err);
      weatherResult.innerHTML = "Error fetching weather data.";
      saveMessage.innerHTML = "";

    }
  }
  
async function saveSearch() {
    const city = document.getElementById("cityInput").value.trim();
    const saveMessage = document.getElementById("saveMessage");
  
    if (!city) {
      saveMessage.innerHTML = "Please enter a city before saving.";
      return;
    }
  
    const postUrl = "https://jsonplaceholder.typicode.com/posts";
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ city })
    };
  
    try {
      const response = await fetch(postUrl, options);
      const result = await response.json();
      console.log("Saved search:", result);
      saveMessage.innerHTML = `✅ Saved search for "${city}"`;
    } catch (err) {
      console.error("Save failed:", err);
      saveMessage.innerHTML = "❌ Failed to save search.";
    }
  }
  function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clock.textContent = `🕒Time:  ${timeString}`;
  }
  
  setInterval(updateClock, 1000);

  updateClock(); 
  function showDate() {
    const now = new Date();
  
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
  
    const fullDate = `${day}, ${date} ${month} ${year}`;
  
    document.getElementById("dateDisplay").innerText = fullDate;
  }
  
 
  showDate();