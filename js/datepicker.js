document
  .querySelector("#takeawayOptions")
  .addEventListener("click", optionsModal);

function optionsModal() {
  console.log("function optionsModal()");
  document.querySelector("#optionsTakeaway").classList.remove("hidden");
  document.querySelector(".exit").addEventListener("click", exitWindow);
}

function exitWindow() {
  console.log("function exitWindow");
  document.querySelector("#optionsTakeaway").classList.add("hidden");
}
