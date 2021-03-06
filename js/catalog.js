/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.

function populateForm() {
  
  
  //TODO: Add an <option> tag inside the form's select for each product
  for (let i in Product.allProducts) {
    let optionsEl = document.createElement('option');
    const selectElement=document.getElementById('items');
    selectElement.appendChild(optionsEl);
    // optionsEl.innerHTML =JSON.stringify(Product.allProducts[i].name);
    optionsEl.value=Product.allProducts[i].name;
    optionsEl.textContent=Product.allProducts[i].name;
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  const d = event.target;
  const q = d.quantity.value;
  const i = d.items.value;
  console.log(i);
  console.log(q);
  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  event.target.reset();
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
 
  let selectElement = document.getElementById('items').value;
  let selectQuantity = document.getElementById('quantity').value;
  cart.addItem(selectElement,selectQuantity);
    }
 
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let counter=0;
  counter = cart.items.length;
  const countI = document.getElementById('itemCount');
  countI.textContent = counter;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  const cartCont = document.getElementById('cartContents');
  const liElement = document.createElement('li');
  cartCont.appendChild(liElement);
  liElement.textContent = `you chose ${document.getElementById('quantity').value} ${document.getElementById('items').value}`;
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
