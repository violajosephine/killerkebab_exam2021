const urlParams = new URLSearchParams(window.location.search);
let KKcategory = urlParams.get("category");
let urlFetch;
let comboPrice;
let orderTotal;
const extraForBeer = 10;
let comboBeer;

if ((KKcategory == "all") | !KKcategory) {
  KKcategory = "all";
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={}&h={"$orderby": {"importance": 1, "product": 1}}`;
  document.querySelector(".filterName").textContent = "ALL PRODUCTS";
} else {
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={"category": "${KKcategory}"}`;
  let headLine = KKcategory + "s";
  document.querySelector(".filterName").textContent = headLine.toUpperCase();
}
document.querySelector(`input[value=${KKcategory}]`).checked = true;
let cursorMain = document.querySelector(".cursorMain");

//eventListeners
window.addEventListener("load", fetchProductList);
document
  .querySelector("#categoryFilter")
  .addEventListener("change", fetchProductFilter);

//functions
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

function fetchProductFilter(e) {
  const categoryValue = e.target.value;
  location.href = `products.html?category=${categoryValue}`;
}

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
    if (product.product != "soft drink") {
      btnEl.addEventListener("click", () => {
        // alert("hey");
        console.log(product);
        CART.add(product);
      });
      btnEl.addEventListener("click", checkOrder);
    }
    //append
    document.querySelector(".productListContainer").appendChild(copy);
  });
  // document.querySelector("#softDrinkList").addEventListener("change", soda);
  cursorHand();
}

function soda() {
  let btnSoda =
    this.parentElement.parentElement.parentElement.querySelector(".btn-add");
  console.log(btnSoda.dataset.id);
  btnSoda.addEventListener("click", () => {
    CART.add(product);
  });
  btnSoda.addEventListener("click", checkOrder);
}

function checkOrder() {
  let ordered = this.parentElement.querySelector(".checkmark");
  ordered.classList.add("orderGood");
  ordered.addEventListener("animationend", cleanAnimation);
}

function cleanAnimation() {
  this.classList.remove("orderGood");
}

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
