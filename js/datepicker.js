const urlInfo = new URLSearchParams(window.location.search);

const dateTime = urlInfo.get("pickuptime");
const timeTime = urlInfo.get("pickupdate");

if (dateTime) {
  document.querySelector("#dateTimeOptions p").textContent = dateTime;

  document.querySelector(".time").textContent = timeTime;
}

document
  .querySelector("#takeawayOptions")
  .addEventListener("click", optionsModal);

document.querySelector("#dateTimeOptions").addEventListener("click", dateModal);

function optionsModal() {
  console.log("function optionsModal()");
  document.querySelector("#optionsDate").classList.add("hidden");
  document.querySelector("#optionsTakeaway").classList.remove("hidden");
  document.querySelector(".exit").addEventListener("click", exitWindow);
}

function dateModal() {
  console.log("function dateModal()");
  document.querySelector("#optionsTakeaway").classList.add("hidden");
  document.querySelector("#optionsDate").classList.remove("hidden");
  document.querySelector(".exitDate").addEventListener("click", exitWindowDate);
}

function exitWindow() {
  console.log("function exitWindow");
  document.querySelector("#optionsTakeaway").classList.add("hidden");
  document.querySelector("#optionsDate").classList.add("hidden");
}

function exitWindowDate() {
  console.log("function exitWindowDate");
  document.querySelector("#optionsDate").classList.add("hidden");
  document.querySelector("#optionsTakeaway").classList.add("hidden");
}
