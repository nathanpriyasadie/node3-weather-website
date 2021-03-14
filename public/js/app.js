console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const getLocationWeatherButton = document.querySelector(
  "#get-location-weather-button"
);

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading";
  fetch("/weather?address=" + location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastData;
      }
    });
  });
});

getLocationWeatherButton.addEventListener("click", (e) => {
  e.preventDefault;
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { longitude, latitude } = position.coords;
    fetch(`/myweather?latitude=${longitude}&longitude=${latitude}`)
      .then((res) => {
        res.json().then((data) => {
          if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = "";
          } else {
            messageOne.textContent = "Your current location :";
            messageTwo.textContent = data.forecastData;
          }
        });
      })
      .catch((e) => console.log(e));
  });
});
