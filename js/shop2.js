const urlParams = new URLSearchParams(window.location.search);
const KKcategory = urlParams.get("category");
let urlFetch;

if ((KKcategory == "all") | !KKcategory) {
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={}&h={"$orderby": {"importance": 1, "product": 1}}`;
  document.querySelector(".filterName").textContent = "ALL PRODUCTS";
} else {
  urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-products?q={"category": "${KKcategory}"}`;
  let headLine = KKcategory + "s";
  document.querySelector(".filterName").textContent = headLine.toUpperCase();
}

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
    copy.querySelector(".price").textContent = `${product.price} kr.`;

    copy.querySelector("img").src = product.image;
    copy.querySelector("img").alt = product.product;
    copy.querySelector(".input-image").value = product.image;
    copy.querySelector(".category").value = product.category;
    if ((product.category == "combo") | (product.product == "soft drink")) {
      copy.querySelector(".btn-add").addEventListener("click", popUp);
    }
    copy.querySelector(".infoProduct").innerHTML += product.description;
    //append
    document.querySelector(".productListContainer").appendChild(copy);
  });
  cursorHand();
}

function popUp(e) {
  // let productCategory =
  //   this.parentElement.querySelector(".productName").textContent;
  // console.log(productCategory);

  //grab the template
  // if (this.parentElement.querySelector(".category").value != "combo") {
  //   console.log("no es un combo");
  //   console.log(this.parentElement);

  //   const template = document.querySelector("template.modal").content;
  //   //clone
  //   const copy = template.cloneNode(true);
  //   //adjust stuff
  //   copy.querySelector("h2.modal").textContent =
  //     this.parentElement.querySelector("h2").textContent;
  //   copy.querySelector("p.modal").textContent =
  //     this.parentElement.querySelector(".price").textContent;
  //   copy.querySelector("img.modal").src =
  //     this.parentElement.querySelector("img").src;
  //   copy.querySelector("img.modal").alt =
  //     this.parentElement.querySelector("img").alt;
  //   copy.querySelector(".btn-close").addEventListener("click", closeModal);

  //   //append
  //   document.querySelector("main").appendChild(copy);

  //   //cursor
  //   let cursor = document.querySelector(".bg-modal .cursor");
  //   document
  //     .querySelector(".modal-content")
  //     .addEventListener("mousemove", (e) => {
  //       cursor.style.left = e.pageX + "px";
  //       cursor.style.top = e.pageY - window.scrollY + "px";
  //     });

  //   //soft drink option

  // if (productCategory == "soft drink") {
  //   document.querySelector(
  //     ".drinkOption"
  //   ).innerHTML = `<label for="softDrinkList">Soft Drink:</label>
  //  <select name="softDrinkList" id="softDrinkList">
  //    <option>--</option>
  //    <option value="coke">Coke</option>
  //    <option value="coke zero">Coke Zero</option>
  //    <option value="sparkling water">Sparkling Water</option>
  //  </select>`;
  // }
  const template = document.querySelector("template.modalCombo").content;
  //clone
  const copy = template.cloneNode(true);
  //adjust stuff
  copy.querySelector("img.modal").src =
    this.parentElement.querySelector(".input-image").value;

  copy.querySelector("img.modal").style.maxHeight = "150px";
  copy.querySelector(".btn-close").addEventListener("click", closeModal);
  //append
  document.querySelector("main").appendChild(copy);

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
    console.log("hola");
    card.addEventListener("mouseover", (e) => {
      cursorMain.style.display = "block";
    });
  });

  document.querySelectorAll(".btn-add").forEach((card) => {
    console.log("hola");
    card.addEventListener("mouseout", (e) => {
      cursorMain.style.display = "none";
    });
  });
}

//cursor pointer

// const cursors = document.querySelector(".cursor");
// cursors.forEach((cursor) =>
//   cursor.addEventListener("mousemove", (e) => {
//     console.log(e);
//     cursor.style.left = e.pageX + "px";
//     cursor.style.top = e.pageY + "px";
//   })
// );
