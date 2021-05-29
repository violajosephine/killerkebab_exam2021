const urlParams = new URLSearchParams(window.location.search);
const categories = ["killer kombo", "killers", "sides", "drinks", "dips"];
const extraForBeer = 10;
let KKcategory = urlParams.get("category");
let urlFetch;
let comboPrice;
let comboBeer;

//eventListeners
window.addEventListener("load", fetchProductList);
document
  .querySelector("#categoryFilter")
  .addEventListener("change", fetchProductFilter);

// document.querySelector("#cartForm").addEventListener("change", calculateTotal);

/*------------------------------------------------*/

categories.forEach(creatSec);

function creatSec(category) {
  //creating parent div for diferents categories of food
  const parent = document.querySelector(".productListContainer");
  var categoryDIV = document.createElement("div");
  categoryDIV.id = category.split(" ").join("-");
  parent.appendChild(categoryDIV);
  //creating head lines for the categories
  const parentH2 = document.querySelector(`#${category.split(" ").join("-")}`);
  var categoryH2 = document.createElement("h2");
  categoryH2.textContent = category;
  parentH2.appendChild(categoryH2);
}
/*-------------------------------------------------*/

/*-------------choosing url to fetch---------*/
if ((KKcategory == "all") | !KKcategory) {
  KKcategory = "all";
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={}&h={"$orderby": {"importance": 1, "product": 1}}`;
  document.querySelector(".filterName").textContent = "ALL PRODUCTS";
} else {
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={"category": "${KKcategory}"}`;
  let headLine = KKcategory + "s";
  document.querySelector(".filterName").textContent = headLine.toUpperCase();
}
/*--------------------------------*/

//marking check the proper radio input "filter"
document.querySelector(`input[value=${KKcategory}]`).checked = true;

// seting the hand customize cursor
let cursorMain = document.querySelector(".cursorMain");

// fetch functions

function fetchProductList() {
  fetch(urlFetch, {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      showProductList(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

/*-----------------------------------*/
function fetchProductFilter(e) {
  const categoryValue = e.target.value;
  location.href = `products.html?category=${categoryValue}`;
}

/*-----------------------------------------*/
function showProductList(products) {
  //header

  //grab the template
  const template = document.querySelector("template.productSmallCard").content;
  products.forEach((product) => {
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff

    copy.querySelector("h2").textContent = product.product;
    copy.querySelector(".price").textContent = product.price;
    copy.querySelector("img").src = product.image;
    copy.querySelector("img").alt = product.product;
    copy.querySelector(".input-image").value = product.image;
    copy.querySelector(".category").value = product.category;

    if (product.description) {
      copy.querySelector(".infoProduct").innerHTML += product.description;
    }
    if (product.category == "combo") {
      copy.querySelector(".btn-add").addEventListener("click", popUp);
      copy.querySelector(".infoProduct").classList.add(product.category);
      comboPrice = Number(product.price);
      console.log(comboPrice);
    }
    if (product.product == "soft drink") {
      copy.querySelector(".infoProduct").classList.add(product.category);
      const template2 = document.querySelector(".soft-drinks").content;
      template2.cloneNode(true);
      copy.querySelector(".infoProduct").appendChild(template2);
      copy.querySelector("#softDrinkList").addEventListener("change", soda);
    }
    btnEl = copy.querySelector(".btn-add");
    btnEl.dataset.id += product._id;
    btnEl.addEventListener("click", () => {
      // alert("hey");
      console.log(product);
      CART.add(product);
    });

    btnEl.addEventListener("click", checkOrder);
    btnEl.addEventListener("click", calculateTotal);

    if (product.product == "soft drink") {
      btnEl.style.pointerEvents = "none";
      btnEl.style.opacity = "0.5";
    }

    //grab the proper parent for category
    let productCategory = product.category;
    let parentCategory;
    if (productCategory == "combo") {
      console.log(productCategory);
      parentCategory = "#killer-kombo";
    } else {
      console.log(productCategory);
      parentCategory = `#${productCategory}s`;
    }
    const parent = document.querySelector(parentCategory);

    //append
    parent.appendChild(copy);
  });

  cursorHand();
}

/*--------------------------------------------------------*/

//activate the plus button for soft dirnks after chossing one
function soda() {
  let btnSoda =
    this.parentElement.parentElement.parentElement.querySelector(".btn-add");
  console.log(btnSoda.dataset.id);
  btnSoda.style.pointerEvents = "auto";
  btnSoda.style.opacity = "1";
}

//calculate cart total
function calculateTotal() {
  let orderTotal = 0;
  console.log("hola dede la formA");
  document.querySelectorAll(".price-each span").forEach((span) => {
    orderTotal += Number(span.textContent);
    document.querySelector(".totalPrice").textContent = orderTotal;
  });
  //eventlisteners to the rest of the buttons
  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", calculateTotal);
  });

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", calculateTotal);
  });
}

//check Order animation
function checkOrder() {
  let ordered = this.parentElement.querySelector(".checkmark");
  ordered.classList.add("orderGood");
  ordered.addEventListener("animationend", cleanAnimation);
}

function cleanAnimation() {
  this.classList.remove("orderGood");
}

/*----------------------------------------*/

function popUp(e) {
  comboBeer = comboPrice + extraForBeer;
  const template = document.querySelector("template.modalCombo").content;
  //clone
  const copy = template.cloneNode(true);
  //adjust stuff

  copy.querySelector(".price").textContent =
    this.parentElement.querySelector(".price").textContent;
  copy
    .querySelector(".bg-modal .btn-close")
    .addEventListener("click", closeModal);
  //append
  document.querySelector("main").appendChild(copy);

  document.querySelector("#formCombo").addEventListener("change", (e) => {
    const radioBtn = document.querySelector("#beer");
    const price = document.querySelector("#formCombo .price");
    if (radioBtn.checked) {
      price.textContent = comboBeer;
    } else {
      price.textContent = comboPrice;
    }
  });

  //cursor
  let cursor = document.querySelector(".bg-modal .cursor");
  document
    .querySelector(".modal-content")
    .addEventListener("mousemove", (e) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY - window.scrollY + "px";
    });
}

function closeModal() {
  document.querySelector(".bg-modal").remove();
}

function cursorHand() {
  document.addEventListener("mousemove", (e) => {
    cursorMain.style.left = e.pageX + "px";
    cursorMain.style.top = e.pageY - window.scrollY + "px";
  });

  document.querySelectorAll(".btn-add").forEach((card) => {
    card.addEventListener("mouseover", (e) => {
      cursorMain.style.display = "block";
    });
  });

  document.querySelectorAll(".btn-add").forEach((card) => {
    card.addEventListener("mouseout", (e) => {
      cursorMain.style.display = "none";
    });
  });
}
