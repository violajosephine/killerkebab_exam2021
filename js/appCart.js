if (!localStorage.getItem("orderKK")) {
  localStorage.setItem("orderKK", "[]");
}

if (!localStorage.getItem("orderKillerKombo")) {
  localStorage.setItem("orderKillerKombo", "[]");
}

let cartItems = Number(localStorage.getItem("cartItems"));

let cartLenght = localStorage.getItem("orderKK").length;
if (cartLenght < 3) {
  cartItems = 0;
  comboI = 1;
  document.querySelectorAll(".totalPrice").forEach((total) => {
    total.textContent = 0;
  });
}
// console.log(cartLenght);

document
  .querySelector(".desktopHeader .cartItemsCounter")
  .classList.add("hideCartCounter");

// console.log(localStorage);

const CART = {
  KEY: "orderKK",
  contents: [],
  init() {
    //_contents is a temporary string
    let _contents = localStorage.getItem(CART.KEY);
    // console.log(_contents);

    if (_contents.length == 0) {
      CART.contents = [];
    } else {
      {
        //if there's anything there, turn it into JS objects, that we can access with the dot . notation
        CART.contents = JSON.parse(_contents);
      }
    }
    //I want to update the
    //this.updateDOM(); //lacj!!! use this when we're not hardcoding the contents, and the content is read from localStorage
    CART.sync();
  },
  sync() {
    //turn CART contents array of objects into a string that we can write in localStorage
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    CART.updateDOM();
  },
  updateDOM() {
    const cartcontentEl = document.querySelector(".cart-content");
    cartcontentEl.innerHTML = "";

    //If we have an empty array / an array with the length of 0
    if (CART.contents.length === 0) {
      cartcontentEl.innerHTML = "<h4>The cart is empty</h4>";
      localStorage.setItem("comboI", 1);
    } else {
      CART.contents.forEach((element) => {
        // console.log(element);
        //grab template
        const tempItem = document.querySelector("#cart-item-template").content;
        const itemcopy = tempItem.cloneNode(true);
        //adjust stuff
        itemcopy.querySelector("h3").textContent = element.product;
        if (element.category == "combo") {
          itemcopy.querySelector(".texto div").innerHTML = element.description;
        }
        const id = element._id;
        const labelEl = itemcopy.querySelector("label");
        labelEl.textContent = element.product;
        labelEl.setAttribute("for", "fid-" + id);

        const minusBtn = itemcopy.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
          CART.minusOne(id);
        });

        const inputEl = itemcopy.querySelector("input");
        inputEl.id += id;
        inputEl.name += id;
        inputEl.value = element.qty;

        inputEl.addEventListener("input", () => {
          const itemQty = inputEl.valueAsNumber;
          element.qty = itemQty;
          /*  console.log("element");
          console.log(element); */
          CART.update(element);
        });

        /*------delete button---------*/
        const deletButton = itemcopy.querySelector(".deletItem");
        deletButton.addEventListener("click", () => {
          CART.deleteProduct(id);
        });
        /*----------------------------------*/

        inputEl.addEventListener("focus", (e) => {
          e.target.select();
        });

        const plusBtn = itemcopy.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
          CART.plusOne(id);
        });

        const priceEl = itemcopy.querySelector(".price-each span");
        priceEl.textContent = Number(element.price) * Number(element.qty);
        if (element.sale) {
          priceEl.textContent = Math.floor(
            Number(element.price) *
              (1 - Number(element.discount) / 100) *
              Number(element.qty)
          );
        }

        cartcontentEl.appendChild(itemcopy);
      });
    }
    logCartCounting();
    /*----countin items in cart---*/
    // document
    //   .querySelectorAll(`.cart form input[type="number"]`)
    //   .forEach((item) => {
    //     cartItems = cartItems + Number(item.value);
    //   });
    /*----------------------------- */
  },
  add(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (index == -1) {
      // console.log(obj);
      obj.qty = 1;
      console.log(CART.contents);
      CART.contents.push(obj);
      cartItems = cartItems + 1;
    } else {
      CART.contents[index].qty += 1;
      cartItems++;
    }
    logCartCounting();
    console.log(CART.contents);
    this.sync();
  },
  update(obj) {
    //find the index of the object
    const index = CART.contents.findIndex((element) => element._id == obj._id);

    //If the qty is 0 we'll remove from the CART.contens array of objects, so that it's nol onger show in the cart
    if (obj.qty === 0) {
      //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //1. parameter start (index in the array), 2. paramter: how many? - here 1
      CART.contents.splice(index, 1);
      // cartItems--;
      // logCartCounting();
    } else {
      //we'll have to read the data from the input field
      // const inputEl = document.querySelector("#fid-" + obj._id);
      // CART.contents[index].qty = inputEl.valueAsNumber;
      CART.contents[index].qty = obj.qty;
    }

    CART.sync();
  },

  deleteProduct(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    cartItems = cartItems - indexObj.qty;
    indexObj.qty = indexObj.qty - indexObj.qty;
    console.log(indexObj);
    CART.update(indexObj);

    logCartCounting();
  },

  minusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty--;
    console.log(indexObj);
    CART.update(indexObj);
    cartItems--;
    logCartCounting();
  },
  plusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty++;
    console.log(indexObj);
    CART.update(indexObj);
    cartItems++;
    logCartCounting();
  },
};
// console.log(localStorage.getItem("orderKK"));
CART.init();

function logCartCounting() {
  if ((cartItems < 1) | (cartItems == null)) {
    cartItems = 0;
    document
      .querySelector(".desktopHeader .cartItemsCounter")
      .classList.add("hideCartCounter");

    document.querySelectorAll(".totalPrice").forEach((total) => {
      total.textContent = 0;
    });
  } else {
    document.querySelector(".desktopHeader .cartItemsCounter p").textContent =
      cartItems;

    localStorage.setItem("cartItems", cartItems);

    document
      .querySelector(".desktopHeader .cartItemsCounter")
      .classList.remove("hideCartCounter");
  }
}
