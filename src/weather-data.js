// const moonPhaseNumbers = {
//   "new moon": "0",
//   "waxing crescent": "0-0.25",
//   "first quarter": "0.25",
//   "waxing gibbous": "0.25-0.5",
//   "full moon": "0.5",
//   "waning gibbous": "0.5-0.75",
//   "last quarter": "0.75",
//   "waning crescent": "0.75-1",
// };

export function getMoonPhase(id) {
  const moonNum = Number(id);
  if (moonNum === 0) {
    return "new moon";
  } else if (0 < moonNum < 0.25) {
    return "waxing crescent";
  } else if (moonNum === 0.25) {
    return "first quarter";
  } else if (0.25 < moonNum > 0.5) {
    return "waxing gibbous";
  } else if (moonNum === 0.5) {
    return "full moon";
  } else if (0.5 < moonNum > 0.75) {
    return "waning gibbous";
  } else if (moonNum === 0.75) {
    return "last quarter";
  } else if (0.75 < moonNum > 1) {
    return "waning crescent";
  }
}

export function toggleUnit(currentUnit, num) {
  let result;

  if (currentUnit === "celsius") {
    result = num * (9 / 5) + 32;
    return result.toFixed(1);
  } else {
    result = (num - 32) * (5 / 9);
    return result.toFixed(1);
  }
}

// let weatherData;

export async function getWeather(location) {
  let arr;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today/?key=HTN87XAAB62SUSSVJXS8JVM33&unitGroup=metric&lang=en&include=days&iconSet=icons2&options=nonulls&elements=conditions,description,datetime,feelslike,icon,precip,precipprob,temp,tempmax,tempmin,uvindex,visibility,winddir,windspeed,moonphase,sunrise,sunset,moonrise,moonset`;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      const address = data.resolvedAddress;
      const currentData = data.days[0];
      arr = {
        address,
        ...currentData,
      };
      //   weatherData = data.days[0];
    });

  console.log(arr);
  //   console.log(weatherData);
  return arr;
}
