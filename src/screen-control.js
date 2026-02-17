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
        getWeather(searchInput.value);
      }
    });
  }

  return {
    elements: {
      btn,
      searchInput,
    },
    setListeners,
  };
})();
