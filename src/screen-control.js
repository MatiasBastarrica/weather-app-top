import { getWeather, getMoonPhase, toggleUnit } from "./weather-data.js";
import { iconDescriptions } from "./icon-descriptions.js";
import { getGif } from "./gif-search.js";

export const Form = (function Form() {
  const btn = document.querySelector(".search-btn");
  const searchInput = document.querySelector("#location");
  const unitBtn = document.querySelector(".toggle-degrees-unit");

  function setListeners() {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (searchInput.validity.valueMissing) {
        searchInput.setCustomValidity("You should enter a location!");
        searchInput.reportValidity();
      } else {
        // getWeather(searchInput.value);
        getWeather(searchInput.value).then((locationWeather) => {
          Output.addData(locationWeather);
        });
      }
    });

    unitBtn.addEventListener("click", function (e) {
      // toggleUnit(Output.degreeUnit,num)

      let unit;

      if (Output.degreeUnit === "celsius") {
        unit = "°F";
      } else {
        unit = "°C";
      }

      let tempUnitChanged = toggleUnit(
        Output.degreeUnit,
        Output.tempNumbers.temperature,
      );
      Output.tempNumbers.temperature = tempUnitChanged;
      let feelsLikeUnitChanged = toggleUnit(
        Output.degreeUnit,
        Output.tempNumbers.feelsLike,
      );
      Output.tempNumbers.feelsLike = feelsLikeUnitChanged;
      let tempMaxUnitChanged = toggleUnit(
        Output.degreeUnit,
        Output.tempNumbers.tempMax,
      );
      Output.tempNumbers.tempMax = tempMaxUnitChanged;
      let tempMinUnitChanged = toggleUnit(
        Output.degreeUnit,
        Output.tempNumbers.tempMin,
      );
      Output.tempNumbers.tempMin = tempMinUnitChanged;

      Output.tempElements.temperature.textContent = `Temperature: ${tempUnitChanged} ${unit}`;
      Output.tempElements.feelsLike.textContent = `Feels like: ${feelsLikeUnitChanged} ${unit}`;
      Output.tempElements.tempMax.textContent = `Maximun temperature: ${tempMaxUnitChanged} ${unit}`;
      Output.tempElements.tempMin.textContent = `Minimun temperature: ${tempMinUnitChanged} ${unit}`;

      if (Output.degreeUnit === "celsius") {
        Output.degreeUnit = "fahrenheit";
      } else {
        Output.degreeUnit = "celsius";
      }
    });
  }

  return {
    setListeners,
  };
})();

const Output = (function output() {
  const output = document.querySelector("output");
  let tempElements = {};
  let tempNumbers = {};
  let degreeUnit = "celsius";

  function addData(data) {
    const location = document.createElement("h2");
    location.classList.add("location");
    location.textContent = `Location: ${data.address}`;

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = `Date: ${data.datetime}`;

    const temperature = document.createElement("div");
    temperature.classList.add("temperature");
    temperature.textContent = `Temperature: ${data.temp} °C`;
    tempElements.temperature = temperature;
    tempNumbers.temperature = data.temp;

    const feelsLike = document.createElement("div");
    feelsLike.classList.add("feels-like");
    feelsLike.textContent = `Feels like: ${data.feelslike} °C`;
    tempElements.feelsLike = feelsLike;
    tempNumbers.feelsLike = data.feelslike;

    const tempMax = document.createElement("div");
    tempMax.classList.add("temp-max");
    tempMax.textContent = `Maximum temperature: ${data.tempmax} °C`;
    tempElements.tempMax = tempMax;
    tempNumbers.tempMax = data.tempmax;

    const tempMin = document.createElement("div");
    tempMin.classList.add("temp-min");
    tempMin.textContent = `Minimum temperature: ${data.tempmin} °C`;
    tempElements.tempMin = tempMin;
    tempNumbers.tempMin = data.tempmin;

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = `Description: ${data.description}`;

    const moonPhase = document.createElement("div");
    moonPhase.classList.add("moon-phase");
    moonPhase.textContent = `Moon phase: ${getMoonPhase(data.moonphase)}`;

    const moonRise = document.createElement("div");
    moonRise.classList.add("moon-rise");
    moonRise.textContent = `Moon rise: ${data.moonrise}`;

    const moonSet = document.createElement("div");
    moonSet.classList.add("moon-set");
    moonSet.textContent = `Moon set: ${data.moonset}`;

    const precipitation = document.createElement("div");
    precipitation.classList.add("precipitation");
    precipitation.textContent = `Precipitation: ${data.precip} mm`;

    const precipitationProb = document.createElement("div");
    precipitationProb.classList.add("precipitation-prob");
    precipitationProb.textContent = `Precipitation probability: ${data.precip} mm`;

    const sunrise = document.createElement("div");
    sunrise.classList.add("sunrise");
    sunrise.textContent = `Sunrise: ${data.sunrise}`;

    const sunset = document.createElement("div");
    sunset.classList.add("sunset");
    sunset.textContent = `Sunset: ${data.sunset}`;

    const uVIndex = document.createElement("div");
    uVIndex.classList.add("uv-index");
    uVIndex.textContent = `UV index: ${data.uvindex} 	W/m²`;

    const windSpeed = document.createElement("div");
    windSpeed.classList.add("wind-speed");
    windSpeed.textContent = `Wind speed: ${data.winddir} km/h`;

    const windDir = document.createElement("div");
    windDir.classList.add("wind-dir");
    windDir.textContent = `Wind direction: ${data.winddir}°`;

    const img = document.createElement("img");
    img.classList.add("gif-img");
    getGif(iconDescriptions[data.icon]).then((response) => {
      img.src = response;
    });

    output.appendChild(location);
    output.appendChild(date);
    output.appendChild(temperature);
    output.appendChild(feelsLike);
    output.appendChild(tempMax);
    output.appendChild(tempMin);
    output.appendChild(description);
    output.appendChild(precipitation);
    output.appendChild(precipitationProb);
    output.appendChild(windSpeed);
    output.appendChild(windDir);
    output.appendChild(uVIndex);
    output.appendChild(moonPhase);
    output.appendChild(moonRise);
    output.appendChild(moonSet);
    output.appendChild(sunrise);
    output.appendChild(sunset);
    output.appendChild(img);
  }

  return {
    element: output,
    addData,
    tempElements,
    tempNumbers,
    degreeUnit,
  };
})();

// the app chrashes if the user clicks the change unit btn with an empy search input
