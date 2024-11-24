import "./style.css";
//You have to create your own apiKey file and export a valid apiKey.
//This is done this way so i can upload the project to github without getting my apiKey scraped by a bot.
import { apiKey } from "./apiKey.js";

document
  .querySelector(".search-wrapper")
  .addEventListener("submit", (e) => callApi(e));

function callApi(e) {
  e.preventDefault();
  if (!apiKey) {
    throw new Error("ApiKey not found.");
  }
  const location = document.querySelector(".search-bar").value;
  if (!location) {
    return;
  }
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

  fetch(url, { mode: "cors" })
    .then((reponse) => {
      if (reponse.ok) {
        return reponse.json();
      } else {
        throw new Error("Network response error.");
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then((data) => {
      console.log(data);
      render(data);
    });
}

function render(data) {
  for (let i = 0; i < 7; i++) {
    const day = data.days[i];
    const element = document.createElement("div");
    element.classList.add("weather-card");
    element.innerHTML = `<p class="weather-card-title">${getDayName(
      day.datetime
    )}</p><p class="weather-card-icon">${getIcon(
      day.icon
    )}</p><p class="weather-card-temp">${Math.round(
      (day.temp - 32) * (5 / 9)
    )}°C</p><p class="weather-card-desc">${day.conditions}</p>`;
    document.getElementById("content").appendChild(element);
  }
}
function getIcon(data) {
  const weather = data;
  if (weather == "snow") {
    return "🌨️";
  } else if (weather == "rain") {
    return "🌧️";
  } else if (weather == "fog") {
    return "🌫️";
  } else if (weather == "wind") {
    return "🍃";
  } else if (weather == "cloudy") {
    return "☁️";
  } else if (weather == "partly-cloudy-day") {
    return "⛅";
  } else if (weather == "partly-cloudy-night") {
    return "☁️";
  } else if (weather == "clear-day") {
    return "☀️";
  } else if (weather == "clear-night") {
    return "🌙";
  }
}

function getDayName(date) {
  const theday = new Date(date).getDay();
  if (theday == 0) {
    return "Sunday";
  } else if (theday == 1) {
    return "Monday";
  } else if (theday == 2) {
    return "Tuesday";
  } else if (theday == 3) {
    return "Wednesday";
  } else if (theday == 4) {
    return "Thursday";
  } else if (theday == 5) {
    return "Friday";
  } else if (theday == 6) {
    return "Saturday";
  } else {
    return "Error";
  }
}
