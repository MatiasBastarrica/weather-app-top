import "./styles.css";
import { getWeather } from "./weather-data.js";

console.log("Hello, Odinite!!!");

const elements = [
  "conditions",
  "description",
  "datetime",
  "feelslike",
  "icon",
  "precip",
  "precipprob",
  "temp",
  "tempmax",
  "tempmin",
  "uvindex",
  "visibility",
  "winddir",
  "windspeed",
  "moonphase",
  "sunrise",
  "sunset",
  "moonrise",
  "moonset",
];

const moonPhaseNumbers = {
  "new moon": "0",
  "waxing crescent": "0-0.25",
  "first quarter": "0.25",
  "waxing gibbous": "0.25-0.5",
  "full moon": "0.5",
  "waning gibbous": "0.5-0.75",
  "last quarter": "0.75",
  "waning crescent": "0.75-1",
};

// getWeather("san martin buenos aires argentina c1650");
// getWeather("north stradbroke");
// getWeather("san clemente california");
console.log(getWeather("london england"));
