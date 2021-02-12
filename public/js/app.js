// import axios from "axios";
console.log("javascript is Running");

const weatherForm = document.querySelector("form");
const searchData = document.querySelector("input");
const button = document.querySelector("button");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    message2.textContent = "Loading..";
    button.disabled = true;
    const { data } = await axios.get(
      `http://localhost:3000/weather?address=${searchData.value}`
    );
    message1.textContent = data.location;
    message2.textContent = data.forecast;
    searchData.value = "";
    button.disabled = false;
  } catch (err) {
    message2.textContent = err;
    button.disabled = false;
  }
});
