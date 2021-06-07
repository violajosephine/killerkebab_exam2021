// window.addEventListener("load", function () {
//   const loader = document.querySelector(".loader");
//   console.log(loader);
//   loader.className += " hidden";
// });
const loader = document.querySelector(".loader");
function removeLoader() {
  loader.addEventListener("animationend", () => {
    loader.remove();
  });
  loader.classList.add("banish");
}

setTimeout(removeLoader, 2000);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

document.querySelector(".modalWrapper .exit").addEventListener("click", hidden);
document.querySelectorAll(".takeaway").forEach((e) => {
  e.addEventListener("click", hidden);
});

function hidden() {
  document.querySelector(".optionsTakeaway").classList.toggle("hidden");
}

hamburger.addEventListener("click", mobileMenu);
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
