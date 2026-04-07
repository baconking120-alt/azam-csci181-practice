// ======================
// STATE VARIABLES
// ======================
let is_loading = false;
let error_message = "";
let weather_data = null;

// ======================
// SELECT DOM ELEMENT
// ======================
const output_element = document.getElementById("weather-output");

// ======================
// RENDER FUNCTION
// ======================
function renderWeather() {
  // Loading state
  if (is_loading) {
    output_element.className = "loading";
    output_element.innerHTML = "<p>Loading...</p>";
    return;
  }

  // Error state
  if (error_message) {
    output_element.className = "error text-red-500";
    output_element.innerHTML = `<p>${error_message}</p>`;
    return;
  }

  // Success state
  if (weather_data) {
    const current = weather_data.properties.periods[0];

    const temp = current.temperature;
    const forecast = current.shortForecast;

    output_element.className = "success";
    output_element.innerHTML = `
      <div style="font-size: 3rem; font-weight: bold;">
        ${temp}&deg;
      </div>
      <div style="margin-top: 0.5rem; font-size: 1.25rem;">
        ${forecast}
      </div>
    `;
    return;
  }

  // Fallback state
  output_element.innerHTML = "<p>Weather data not available.</p>";
}

// ======================
// FETCH FUNCTION
// ======================
async function getWeatherData() {
  // Start loading
  is_loading = true;
  error_message = "";
  renderWeather();

  try {
    const response = await fetch(
      "https://api.weather.gov/gridpoints/MSO/105,131/forecast",
    );

    // Handle HTTP errors manually
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    weather_data = data;

    console.log("Weather data loaded:", data);
  } catch (error) {
    error_message = "Failed to load weather data.";
    console.error(error);
  } finally {
    // Stop loading
    is_loading = false;

    // Re-render UI
    renderWeather();
  }
}

// ======================
// RUN ON PAGE LOAD
// ======================
getWeatherData();
