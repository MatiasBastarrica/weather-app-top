import { getWeather } from "./weather-data.js";

export const Form = (function Form() {
  const btn = document.querySelector(".search-btn");
  const searchInput = document.querySelector("#location");

  function setListeners() {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (searchInput.validity.valueMissing) {
        searchInput.setCustomValidity("You should enter a location!");
        searchInput.reportValidity();
      } else {
        // getWeather(searchInput.value);
        getWeather(searchInput.value).then((locationWeather) => {
          for (const dataName in locationWeather) {
            if (!Object.hasOwn(locationWeather, dataName)) continue;

            const dataValue = locationWeather[dataName];

            Output.addData(dataName, dataValue);
          }
        });
      }
    });
  }

  return {
    setListeners,
  };
})();

const Output = (function output() {
  const output = document.querySelector("output");

  function addData(name, value) {
    const title = document.createElement("h2");
    title.textContent = name;

    const description = document.createElement("p");
    description.textContent = value;

    output.appendChild(title);
    output.appendChild(description);
  }

  return {
    element: output,
    addData,
  };
})();
