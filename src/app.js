const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Nathan Priyasadie",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nathan Priyasadie",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Nathan Priyasadie",
    text:
      "HAdipisicing voluptate ut aliquip eiusmod exercitation eu est incididunt proident adipisicing ipsum. Amet cillum cillum aute consectetur eiusmod ut. Dolor enim dolor cillum aliquip aliqua minim do nostrud esse amet do. Do non incididunt ut eiusmod voluptate excepteur culpa. Eu aliqua ut veniam qui velit minim ullamco veniam veniam. Voluptate dolore in exercitation exercitation proident.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address must be provided" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
  console.log(req.query.search);
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page not found",
    name: "Nathan Priyasadie",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Nathan Priyasadie",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
