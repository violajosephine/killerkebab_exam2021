const urlParams = new URLSearchParams(window.location.search);
const categories = ["killer kombo", "killers", "sides", "drinks", "dips"];
const extraForBeer = 10;
let KKcategory = urlParams.get("category");
let comboSide = urlParams.get("side");
let comboDrink;
let comboDip;
let urlFetch;
let comboPrice;
let comboBeer;
let allProducts;
let comboI;
let newComboId;

//eventListeners
window.addEventListener("load", fetchProductList);
document
  .querySelector("#categoryFilter")
  .addEventListener("change", fetchProductFilter);

//-----------ifs---------

if (cartLenght > 3) {
  console.log("cartLeng>3");
  calculateTotal();
}

/*-------------choosing url to fetch---------*/
if ((KKcategory == "all") | !KKcategory) {
  KKcategory = "all";
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={}&h={"$orderby": {"importance": 1, "product": 1}}`;
  document.querySelector(".filterName").textContent = "PRODUCTS";
  categories.forEach(creatSec);
  allProducts = true;
} else {
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={"category": "${KKcategory}"}`;
  let headLine = KKcategory + "s";
  document.querySelector(".filterName").textContent = headLine.toUpperCase();
  allProducts = false;
}
/*--------------------------------*/

if (comboSide) {
  console.log(comboSide);
  addComboProducts();
}

/*------------------------------------------------*/

function creatSec(category) {
  //creating parent div for diferents categories of food
  const parent = document.querySelector(".productListContainer");
  var categoryDIV = document.createElement("div");
  categoryDIV.id = category.split(" ").join("-");
  parent.appendChild(categoryDIV);
  //creating head lines for the categories
  const parentH2 = document.querySelector(`#${category.split(" ").join("-")}`);
  var categoryH2 = document.createElement("h2");
  categoryH2.classList.add("stickyH2");
  categoryH2.textContent = category;
  parentH2.appendChild(categoryH2);
}
/*-------------------------------------------------*/

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
      // console.log(response);
      showProductList(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

/*-----------------------------------*/
function fetchProductFilter(e) {
  let parent;
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

    btnEl = copy.querySelector(".btn-add");

    btnEl.dataset.id = product._id;

    btnEl.addEventListener("click", () => {
      // console.log(product);
      CART.add(product);
    });

    btnEl.addEventListener("click", checkOrder);
    btnEl.addEventListener("click", calculateTotal);

    if (product.category == "combo") {
      copy.querySelector(".btn-add").addEventListener("click", popUp);
      copy.querySelector(".infoProduct").classList.add(product.category);
      comboPrice = Number(product.price);
      // console.log(comboPrice);
    }

    //grab the proper parent for
    if (allProducts) {
      let productCategory = product.category;
      let parentCategory;
      if (productCategory == "combo") {
        parentCategory = "#killer-kombo";
      } else {
        parentCategory = `#${productCategory}s`;
      }
      parent = document.querySelector(parentCategory);
    } else {
      parent = document.querySelector(".productListContainer");
    }
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
  console.log(this.dataset.id);
  let x = this.dataset.id;
  comboI = localStorage.getItem("comboI");
  logComboICounting();
  console.log(JSON.parse(localStorage.getItem("orderKK")));
  const bags = JSON.parse(localStorage.getItem("orderKK"));
  const index = bags.findIndex((bag) => bag._id == x);
  newComboId = `${x}-combo${comboI}`;
  bags[index]._id = newComboId;
  comboI++;
  localStorage.setItem("orderKK", []);
  localStorage.setItem("orderKK", JSON.stringify(bags));
  console.log(comboI);
  console.log(bags);

  CART.init();

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
    const radioBtn = document.querySelectorAll(".beer");
    const price = document.querySelector("#formCombo .price");
    const priceInput = document.querySelector(".priceInput");
    if (radioBtn[1].checked | radioBtn[0].checked) {
      price.textContent = comboBeer;
      priceInput.value = comboBeer;
    } else {
      price.textContent = comboPrice;
      priceInput.value = comboPrice;
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

  logComboICounting();
}

function addComboProducts() {
  comboDrink = urlParams.get("drink");
  comboDip = urlParams.get("dip");
  comboP = urlParams.get("price");
  //grab de combo
  const orderX = JSON.parse(localStorage.getItem("orderKK"));
  comboX = orderX[orderX.length - 1];
  //adjust stuff
  comboX.price = Number(comboP);
  comboX.description = `<ul><li>${comboSide}</li><li>${comboDrink}</li><li>${comboDip}</li></ul>`;
  //
  localStorage.setItem("orderKK", []);
  localStorage.setItem("orderKK", JSON.stringify(orderX));

  CART.init();
  calculateTotal();
}

function logComboICounting() {
  if ((comboI < 1) | (comboI == null)) {
    comboI = 1;
  } else {
    localStorage.setItem("comboI", comboI);
  }
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

/*---------------------------------post order-------------------*/

document.querySelector("#checkout-pay").addEventListener("click", postOrder);

function postOrder() {
  const payload = {
    cart: JSON.parse(localStorage.getItem("orderKK")),
    payed: true,
    pickedUp: false,
  };

  fetch("https://reicpe-9cc2.restdb.io/rest/killer-kebab-orders", {
    method: "POST",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      localStorage.setItem("orderKK", []);
      location.href = `products.html`;
    })
    .catch((err) => {
      console.error(err);
    });
}
