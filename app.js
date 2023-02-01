const allProductDiv = document.getElementById("all-products");
const cartProductsDiv = document.getElementById("cart-products");
const cartTotalDiv = document.getElementById("cart-total");

let products;
// const lsData = 
let cartItem =JSON.parse(localStorage.getItem('cart')) || [];

//  (1) Display Product Using JSON File
fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data;
    for (let i = 0; i < data.length; i++) {
      allProductDiv.innerHTML += `
      <div class="col-lg-4">
         <div class="single-product">
                <img src="${data[i].image}" alt="" />
                <h5>$<span id="product-price">${data[i].price}</span></h5>
                <h3>${data[i].name}</h3>
                <p>
                ${data[i].text}
                </p>
                <button onClick="adToCard('${data[i].id}')">Add To Cart</button>
         </div>
      </div>`;
    }
  })
  .catch(function(err) {
    console.log(err)
  })
  
//  2 add to card item----------
function adToCard(productId){
   // console.log(productId)
   const findProduct = products.find((findProduct) => findProduct.id == productId)
   

   // create product
  const cardProduct = `
  <div class="cart-product" id="id2">
    <img src="${findProduct.image}" alt="" />
    <h3>
    ${findProduct.name}(Price: $<span id="product-price">${findProduct.price})</span>
    </h3>
    <h5>Quantity: 1</h5>
    <h5>Sub Total: ${findProduct.price}</h5>
    <button class="remove-item">X</button>
  </div>
  `
  cartProductsDiv.innerHTML += cardProduct

//  add product local storage---

cartItem.push(findProduct)
findProduct.quantity = 1;
localStorage.setItem('cart', JSON.stringify(cartItem))
cardTotal()

}

// display product on card--------
function displayCard (){
for(let i = 0; i < cartItem.length; i++){
   cartProductsDiv.innerHTML += `
   <div class="cart-product" id="id2">
   <img src="${cartItem[i].image}" alt="" />
   <h3>${cartItem[i].name}(Price: $<span id="product-price">${cartItem[i].price})</span> </h3>
   <h5>Quantity: ${cartItem[i].quantity}</h5>
   <h5>Sub Total: ${cartItem[i].price}</h5>
   <button class="remove-item">X</button>
 </div>
   `
}
}

displayCard()
//  get card total--------
function cardTotal(){
 const temp= cartItem.map(function (item) {
      return parseFloat(item.price) * parseFloat(item.quantity)
   })
  const totalPrice = temp.reduce(function(prev, next){
   return prev + next
  
  },0);
  cartTotalDiv.innerText =totalPrice
}
cardTotal()