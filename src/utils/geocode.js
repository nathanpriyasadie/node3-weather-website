const request = require("request");

const geocode = (address, callback) => {
  const URL =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(address) +
    `.json?access_token=pk.eyJ1IjoibjdncmVlbiIsImEiOiJjazk4cWw4dWgxazJkM2dtc2pqMWZrOW5pIn0.hOKnqmxvKJe7THt5YFLgHA&limit=1`;

  request(URL, { json: true }, (error, res) => {
    const { body } = res;
    if (error) {
      callback("Unable to connect to geoparser");
    } else if (body.features[0] == undefined) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
