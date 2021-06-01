const urlInfo = new URLSearchParams(window.location.search);

const dateTime = urlInfo.get("pickuptime");
const timeTime = urlInfo.get("pickupdate");

if (dateTime) {
  document.querySelectorAll(".dateP").forEach((e) => {
    e.textContent = dateTime;
  });

  document.querySelectorAll(".time").forEach((e) => {
    e.textContent = timeTime;
  });
}

document.querySelectorAll(".takeawayOptions").forEach((iconBtn) => {
  iconBtn.addEventListener("click", optionsModal);
});

document.querySelectorAll(".dateTimeOptions").forEach((e) => {
  e.addEventListener("click", dateModal);
});

function optionsModal() {
  console.log("function optionsModal()");
  document.querySelectorAll(".optionsDate").forEach((e) => {
    e.classList.add("hidden");
  });
  document.querySelectorAll(".optionsTakeaway").forEach((e) => {
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
  document.querySelectorAll(".optionsDate").forEach((e) => {
    e.classList.remove("hidden");
  });
  document.querySelectorAll(".exitDate").forEach((e) => {
    e.addEventListener("click", exitWindowDate);
  });
}

function exitWindow() {
  console.log("function exitWindow");
  document.querySelectorAll(".optionsTakeaway").forEach((e) => {
    e.classList.add("hidden");
  });
  document.querySelectorAll(".optionsDate").forEach((e) => {
    e.classList.add("hidden");
  });
}

function exitWindowDate() {
  console.log("function exitWindowDate");
  document.querySelectorAll(".optionsDate").forEach((e) => {
    e.classList.add("hidden");
  });
  document.querySelectorAll(".optionsTakeaway").forEach((e) => {
    e.classList.add("hidden");
  });
}
