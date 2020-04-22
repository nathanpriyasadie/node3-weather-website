request = require("request");

const forecast = (latitute, longitude, callback) => {
  const URL =
    "http://api.weatherstack.com/current?access_key=0c8b399d58b23a085eece3dbafbc298f&query=" +
    longitude +
    "," +
    latitute +
    "&units=f";

  request(URL, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} it is currently ${body.current.temperature} out there but it actual ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
