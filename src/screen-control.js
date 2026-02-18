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

      if (!Output.element.childElementCount) {
        return;
      }

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

      Output.tempElements.temperature.textContent = `${tempUnitChanged} ${unit}`;
      Output.tempElements.feelsLike.textContent = `Feels like ${feelsLikeUnitChanged} ${unit}`;
      Output.tempElements.tempMax.textContent = `H: ${tempMaxUnitChanged} ${unit}`;
      Output.tempElements.tempMin.textContent = `L: ${tempMinUnitChanged} ${unit}`;

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
    if (output.childElementCount) {
      clearDisplay();
    }
    const header = document.createElement("div");
    header.classList.add("output-header");
    output.appendChild(header);

    const mainContentSection = document.createElement("div");
    mainContentSection.classList.add("output-main-section");
    output.appendChild(mainContentSection);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    mainContentSection.appendChild(imgContainer);

    const mainContentContainer = document.createElement("div");
    mainContentContainer.classList.add("main-content-container");
    mainContentSection.appendChild(mainContentContainer);

    const extraSection = document.createElement("div");
    extraSection.classList.add("extra-section");
    output.appendChild(extraSection);

    const location = document.createElement("h2");
    location.classList.add("location");
    location.textContent = `Location: ${data.address}`;
    header.appendChild(location);

    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = `Date: ${data.datetime}`;
    header.appendChild(date);

    const tempSection = document.createElement("div");
    tempSection.classList.add("temp-section");
    mainContentContainer.appendChild(tempSection);

    const temperature = document.createElement("div");
    temperature.classList.add("temperature");
    temperature.textContent = `${data.temp} °C`;
    tempElements.temperature = temperature;
    tempNumbers.temperature = data.temp;
    tempSection.appendChild(temperature);

    const feelsLike = document.createElement("div");
    feelsLike.classList.add("feels-like");
    feelsLike.textContent = `Feels like ${data.feelslike} °C`;
    tempElements.feelsLike = feelsLike;
    tempNumbers.feelsLike = data.feelslike;
    tempSection.appendChild(feelsLike);

    const tempExtremes = document.createElement("div");
    tempExtremes.classList.add("temp-extremes");
    tempSection.appendChild(tempExtremes);

    const tempMax = document.createElement("div");
    tempMax.classList.add("temp-max");
    tempMax.textContent = `H: ${data.tempmax} °C`;
    tempElements.tempMax = tempMax;
    tempNumbers.tempMax = data.tempmax;
    tempExtremes.appendChild(tempMax);

    const tempMin = document.createElement("div");
    tempMin.classList.add("temp-min");
    tempMin.textContent = `L: ${data.tempmin} °C`;
    tempElements.tempMin = tempMin;
    tempNumbers.tempMin = data.tempmin;
    tempExtremes.appendChild(tempMin);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = `${data.description}`;
    mainContentContainer.appendChild(description);

    const precpSection = document.createElement("div");
    precpSection.classList.add("precip-section");
    extraSection.appendChild(precpSection);

    const precpTitle = document.createElement("h3");
    precpTitle.textContent = "Precipitation";
    precpSection.appendChild(precpTitle);

    const precipitation = document.createElement("div");
    precipitation.classList.add("precipitation");
    precipitation.textContent = `Amount: ${data.precip} mm`;
    precpSection.appendChild(precipitation);

    const precipitationProb = document.createElement("div");
    precipitationProb.classList.add("precipitation-prob");
    precipitationProb.textContent = `Probability: ${data.precipprob} mm`;
    precpSection.appendChild(precipitationProb);

    const windSection = document.createElement("div");
    windSection.classList.add("wind-section");
    extraSection.appendChild(windSection);

    const windTitle = document.createElement("h3");
    windTitle.textContent = "Wind";
    windSection.appendChild(windTitle);

    const windSpeed = document.createElement("div");
    windSpeed.classList.add("wind-speed");
    windSpeed.textContent = `Speed: ${data.windspeed} km/h`;
    windSection.appendChild(windSpeed);

    const windDir = document.createElement("div");
    windDir.classList.add("wind-dir");
    windDir.textContent = `Direction: ${data.winddir}°`;
    windSection.appendChild(windDir);

    const sunSection = document.createElement("div");
    sunSection.classList.add("sun-section");
    extraSection.appendChild(sunSection);

    const sunTitle = document.createElement("h3");
    sunTitle.textContent = "Sun";
    sunSection.appendChild(sunTitle);

    const uVIndex = document.createElement("div");
    uVIndex.classList.add("uv-index");
    uVIndex.textContent = `UV index: ${data.uvindex} 	W/m²`;
    sunSection.appendChild(uVIndex);

    const sunrise = document.createElement("div");
    sunrise.classList.add("sunrise");
    sunrise.textContent = `Sunrise: ${data.sunrise}`;
    sunSection.appendChild(sunrise);

    const sunset = document.createElement("div");
    sunset.classList.add("sunset");
    sunset.textContent = `Sunset: ${data.sunset}`;
    sunSection.appendChild(sunset);

    const moonSection = document.createElement("div");
    moonSection.classList.add("moon-section");
    extraSection.appendChild(moonSection);

    const moonTitle = document.createElement("h3");
    moonTitle.textContent = "Moon";
    moonSection.appendChild(moonTitle);

    const moonPhase = document.createElement("div");
    moonPhase.classList.add("moon-phase");
    moonPhase.textContent = `Moon phase: ${getMoonPhase(data.moonphase)}`;
    moonSection.appendChild(moonPhase);

    const moonRise = document.createElement("div");
    moonRise.classList.add("moon-rise");
    moonRise.textContent = `Moon rise: ${data.moonrise}`;
    moonSection.appendChild(moonRise);

    const moonSet = document.createElement("div");
    moonSet.classList.add("moon-set");
    moonSet.textContent = `Moon set: ${data.moonset}`;
    moonSection.appendChild(moonSet);

    const img = document.createElement("img");
    img.classList.add("gif-img");
    getGif(iconDescriptions[data.icon]).then((response) => {
      img.src = response;
    });
    imgContainer.appendChild(img);
  }

  function clearDisplay() {
    let childElements = Array.from(output.children);

    childElements.forEach((child) => {
      child.remove();
    });
  }

  return {
    element: output,
    addData,
    tempElements,
    tempNumbers,
    degreeUnit,
  };
})();
