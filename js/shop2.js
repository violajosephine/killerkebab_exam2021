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
    copy.querySelector("a").href = `product.html?product=${product._id}`;
    copy.querySelector("img").src = product.image;
    copy.querySelector("img").alt = product.product;
    copy.querySelector(".category").value = product.category;
    copy.querySelector(".btn-add").addEventListener("click", popUp);
    //append
    document.querySelector(".productListContainer").appendChild(copy);
  });
}

function popUp(e) {
  //grab the template
  if (this.parentElement.querySelector(".category").value != "combo") {
    console.log("no es un combo");
    console.log(this.parentElement);

    const template = document.querySelector("template.modal").content;
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff
    copy.querySelector("h2.modal").textContent =
      this.parentElement.querySelector("h2").textContent;
    copy.querySelector("p.modal").textContent =
      this.parentElement.querySelector(".price").textContent;
    copy.querySelector("img.modal").src =
      this.parentElement.querySelector("img").src;
    copy.querySelector("img.modal").alt =
      this.parentElement.querySelector("img").alt;
    copy.querySelector(".btn-close").addEventListener("click", closeModal);

    //append
    document.querySelector("main").appendChild(copy);
    //cursor
    let cursor = document.querySelector(".bg-modal .cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.pageX + "px";
      cursor.style.top = e.pageY + "px";
    });
  } else {
    const template = document.querySelector("template.modalCombo").content;
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff
    copy.querySelector("img.modal").src =
      this.parentElement.querySelector("img").src;
    copy.querySelector("img.modal").alt =
      this.parentElement.querySelector("img").alt;
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
        cursor.style.top = e.pageY + "px";
      });
  }
}

function closeModal() {
  document.querySelector(".bg-modal").remove();
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
