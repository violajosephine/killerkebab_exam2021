const urlParams = new URLSearchParams(window.location.search);
const categories = ["killer kombo", "killers", "sides", "drinks", "dips"];
const extraForBeer = 10;
let KKcategory = urlParams.get("category");
let comboSide = urlParams.get("side");
const dateTimeX = urlParams.get("pickupdate");
const timeTimeX = urlParams.get("pickuptime");
let comboDrink;
let comboDip;
let urlFetch;
let comboPrice;
let comboBeer;
let allProducts;
let comboI;
let newComboId;
let customerRock;
let emailCustomer;
let idCustomer;
let nameCustomer;
let phoneCustomer;
let orderDate;
let orderTime;

//eventListeners
window.addEventListener("load", fetchProductList);
document
  .querySelector("#categoryFilter")
  .addEventListener("change", fetchProductFilter);
document.querySelector("#filterOptions").addEventListener("click", showMenu);
document.querySelector("#checkout-pay").addEventListener("click", popUpInfo);

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

if (dateTimeX) {
  orderDate = dateTimeX;
  orderTime = timeTimeX;
  console.log(orderTime + orderDate);
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
      copy.querySelector(".btn-add").addEventListener("click", popUpKombo);
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

//showing filter options in mobile header

function showMenu() {
  console.log("showMenu");
  document.querySelector("#filter").classList.toggle("appear");
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
    document.querySelectorAll(".totalPrice").forEach((total) => {
      total.textContent = orderTotal;
    });
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

function popUpKombo(e) {
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

function popUpInfo() {
  const template = document.querySelector("template.info-payment").content;
  //clone
  const copy = template.cloneNode(true);
  //adjust stuff
  copy
    .querySelector(".bg-modal .btn-close")
    .addEventListener("click", closeModal);
  copy
    .querySelector("#personalData .backBtn")
    .addEventListener("click", closeModal);
  copy
    .querySelector("#personalData .nextBtn")
    .addEventListener("click", slidder);
  copy.querySelector("#CreditCard .backBtn").addEventListener("click", slidder);

  //append
  document.querySelector("main").appendChild(copy);
}

function slidder() {
  console.log("slidder");
  nameCustomer = document.querySelector("#name").value;
  customerRock = nameCustomer.split(" ")[0];
  document.querySelector(".customerName").textContent = customerRock;
  document.querySelector("#nameCC").value = nameCustomer;
  emailCustomer = document.querySelector("#email").value;
  phoneCustomer = document.querySelector("#phone").value;
  document.querySelector(".formsWrapper").classList.toggle("slide");
  document.querySelector("#nextBtnCC").addEventListener("click", postOrder); // <= check if works
  document.querySelector("#nextBtnCC").addEventListener("click", popUPyouRock);
  document.querySelector("#nextBtnCC").addEventListener("click", closeModal);
  searchCustomer();
}

function popUPyouRock() {
  const template = document.querySelector("template.youRock").content;
  //clone
  const copy = template.cloneNode(true);
  //adjust stuff
  copy.querySelector(".name").textContent = customerRock;
  // copy.querySelector(".black .nextBtn").addEventListener("click", postOrder);
  copy.querySelector(".black .nextBtn").addEventListener("click", () => {
    location.href = `index.html`;
  });

  //append
  document.querySelector("main").appendChild(copy);
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
/*------------------------------serch/post customer by email-------*/

function searchCustomer() {
  console.log("search");
  const urlSearchCutomer = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-customers?q={"email":"${emailCustomer}"}`;

  fetch(urlSearchCutomer, {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.length < 1) {
        postCustomer();
      } else {
        console.log(response[0]._id);
        idCustomer = response[0]._id;
      }
    })
    .catch((err) => {
      console.error(err);
    });

  function postCustomer() {
    const payload = {
      name: nameCustomer,
      email: emailCustomer,
      telephoneNo: phoneCustomer,
    };

    fetch("https://reicpe-9cc2.restdb.io/rest/killer-kebab-customers", {
      method: "POST",
      headers: {
        "x-apikey": "606d5dcef5535004310074f4",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json()) // <= it was necessary
      .then((response) => {
        console.log(response);
        console.log("newCustomer");
        console.log(response._id);
        idCustomer = response._id;
        // searchCustomer();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/*---------------------------------post order-------------------*/

function postOrder() {
  console.log("postOrder");
  console.log(idCustomer);
  const payload = {
    customer: idCustomer,
    cart: JSON.parse(localStorage.getItem("orderKK")),
    payed: true,
    dateO: orderDate,
    timeO: orderTime,
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
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("orderKK", []);
      // location.href = `index.html`;
    })
    .catch((err) => {
      console.error(err);
    });
}

/*--------------calc min date and time------------------------*/

function calcToday() {
  const month = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Abr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  d = new Date().toString().split(" ");

  /*--- min date----*/
  minMonth = month[d[1]];
  minDay = d[2];
  minYear = d[3];
  console.log(d);
  minDate = `${minYear}-${minMonth}-${minDay}`;
  document.querySelectorAll(`.dateselection`).forEach((e) => {
    e.setAttribute("min", minDate);
    e.value = minDate;
    e.addEventListener("change", anotherDay);
  });
  /*-----min time---*/
  minTime = d[4].split(":");
  minHour = Number(minTime[0]);
  minMinute = Number(minTime[1]) + 40;
  if (minMinute > 60) {
    minHour = minHour + 1;
    minMinute = minMinute - 60;
  }
  if (minMinute < 10) {
    minMinute = "0" + minMinute;
  }
  console.log(minHour + ":" + minMinute);
  minTime = minHour + ":" + minMinute;
  document.querySelectorAll(".timeselection").forEach((e) => {
    e.setAttribute("min", minTime);
    e.setAttribute("max", "20:10");
    e.value = minTime;
  });
}

function anotherDay() {
  if (this.value != this.min) {
    document.querySelectorAll(".timeselection").forEach((e) => {
      e.setAttribute("min", "12:40");
      e.value = "12:40";
    });
  } else {
    calcToday();
  }
}
