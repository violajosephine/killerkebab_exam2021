const urlInfo = new URLSearchParams(window.location.search);

const timeTime = urlInfo.get("pickuptime");
const dateTime = urlInfo.get("pickupdate");

if (dateTime) {
  document.querySelectorAll(".dateP").forEach((e) => {
    e.textContent = dateTime;
  });

  document.querySelectorAll(".time").forEach((e) => {
    e.textContent = timeTime;
  });
}

if (window.innerWidth < 1540) {
  document.querySelector(".basketInfo").addEventListener("click", cartToggle);
  document
    .querySelector("#filterOptions")
    .addEventListener("click", filterToggle);
}

document.querySelectorAll(".takeawayOptions").forEach((iconBtn) => {
  iconBtn.addEventListener("click", optionsModal);
});

document.querySelectorAll(".dateTimeOptions").forEach((e) => {
  e.addEventListener("click", dateModal);
});

document.querySelector(".exitDate").addEventListener("click", exitWindowDate);

function optionsModal() {
  console.log("function optionsModal()");
  // document.querySelectorAll(".optionsDate").forEach((e) => {
  //   e.classList.add("hidden");
  // });
  document.querySelectorAll(".optionsModalWrapper").forEach((e) => {
    e.classList.remove("hidden");
  });
  document.querySelectorAll(".exit").forEach((e) => {
    e.addEventListener("click", exitWindow);
  });
}

function dateModal() {
  console.log("function dateModal()");
  document.querySelectorAll(".optionsTakeaway").forEach((e) => {
    e.classList.add("hidden");
  });
  document.querySelectorAll(".dateModalWrapper").forEach((e) => {
    e.classList.remove("hidden");
  });
  document.querySelectorAll(".exitDate").forEach((e) => {
    e.addEventListener("click", exitWindowDate);
  });
  calcToday();
}

function exitWindow() {
  console.log("function exitWindow");
  document.querySelectorAll(".optionsModalWrapper").forEach((e) => {
    e.classList.add("hidden");
  });
  // document.querySelectorAll(".dateModalWrapper").forEach((e) => {
  //   e.classList.add("hidden");
  // });
}

function exitWindowDate() {
  console.log("function exitWindowDate");
  document.querySelectorAll(".dateModalWrapper").forEach((e) => {
    e.classList.add("hidden");
  });
  document.querySelectorAll(".optionsTakeaway").forEach((e) => {
    e.classList.add("hidden");
  });
}

function cartToggle() {
  document.querySelector("#cart").classList.toggle("appearCart");
  document
    .querySelector("#cart .btn-close")
    .addEventListener("click", cartToggle);
  document.querySelector("#keepAdding").addEventListener("click", cartToggle);
}
function filterToggle() {
  document.querySelector("#filter").classList.toggle("appearFilter");
  document
    .querySelector("#filter .btn-close")
    .addEventListener("click", filterToggle);
}
