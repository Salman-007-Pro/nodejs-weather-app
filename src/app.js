const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getCurrentWeather = require("./utils/geocode");
const getForecastWeather = require("./utils/forecast");
//app start
const app = express();

//define path express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Muhammad Salman Asif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    img: "../img/salman1.png",
    name: "Muhammad Salman Asif",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Muhammad Salman Asif",
    title: "Help",
    help: "You want to improve the problem solver skills",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "Plz Provide the address",
    });
  }
  getCurrentWeather(address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    const { lon, lat, location } = data;
    getForecastWeather(lat, lon, (error, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: data,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Muhammad Salman Asif",
    title: "404",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Muhammad Salman Asif",
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
