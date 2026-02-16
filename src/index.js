import "./styles.css";

console.log("Hello, Odinite!!!");

const elements = [
  conditions,
  description,
  datetime,
  feelslike,
  icon,
  precip,
  precipprob,
  temp,
  tempmax,
  tempmin,
  uvindex,
  visibility,
  winddir,
  windspeed,
  moonphase,
  sunrise,
  sunset,
  moonrise,
  moonset,
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

let queryExample =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/san%20martin%20buenos%20aires%20argentina/today/?key=HTN87XAAB62SUSSVJXS8JVM33&unitGroup=metric&lang=en&include=days&iconSet=icons2&options=nonulls" +
  "&elements=conditions,description,datetime,feelslike,icon,precip,precipprob,temp,tempmax,tempmin,uvindex,visibility,winddir,windspeed,moonphase,sunrise,sunset,moonrise,moonset";
