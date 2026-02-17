let weatherData;

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
