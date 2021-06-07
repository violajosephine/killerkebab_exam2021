// window.addEventListener("load", function () {
//   const loader = document.querySelector(".loader");
//   console.log(loader);
//   loader.className += " hidden";
// });
let Y;
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const sec1 = document.querySelector(".vibe");
const sec2 = document.querySelector("#beer");

sections.forEach((e) => {
  console.log(e.offsetTop);
});

window.addEventListener("scroll", checkSection);

function checkSection() {
  Y = window.scrollY;
}

while (Y < sec1.offsetTop) {
  console.log(sec1.offsetTop);
}

// if (
//   (window.scrollY > sec1.offsetTop - 137) &
//   (window.scrollY < sec1.offsetTop + 20)
// ) {
//   document.querySelector(`a[href="#${sec1.id}"]`).classList.add("activeBold");
//   console.log(sec1.id);
// }

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
