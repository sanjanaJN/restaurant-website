const foods = [
{
name:"Margherita Pizza",
price:399,
image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
},
{
name:"Pasta Alfredo",
price:349,
image:"https://images.unsplash.com/photo-1551892374-ecf8754cf8b0"
},
{
name:"Tiramisu",
price:299,
image:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"
}
];

const foodContainer = document.getElementById("food-container");
const cartCount = document.getElementById("cart-count");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

// Generate menu dynamically
if(foodContainer){
foods.forEach((food,index)=>{
const card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`
<img src="${food.image}" class="food-img">
<h3>${food.name}</h3>
<p>₹${food.price}</p>
<button class="add-btn" onclick="addToCart(${index})">Add to Cart</button>
`;

foodContainer.appendChild(card);
});
}

function addToCart(index){
cart.push(foods[index]);
localStorage.setItem("cart",JSON.stringify(cart));
updateCartCount();
alert("Item added to cart");
}

function updateCartCount(){
if(cartCount){
cartCount.textContent=cart.length;
}
}

// CART PAGE
const cartItems=document.getElementById("cart-items");
const totalPrice=document.getElementById("total-price");

if(cartItems){
displayCart();
}

function displayCart(){
cartItems.innerHTML="";
let total=0;

if(cart.length===0){
cartItems.innerHTML="<p>Your cart is empty.</p>";
totalPrice.textContent="Total: ₹0";
return;
}

cart.forEach((item,index)=>{
total+=item.price;

const div=document.createElement("div");
div.classList.add("card");
div.innerHTML=`
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<button class="add-btn" onclick="removeItem(${index})">Remove</button>
`;

cartItems.appendChild(div);
});

totalPrice.textContent="Total: ₹"+total;
}

function removeItem(index){
cart.splice(index,1);
localStorage.setItem("cart",JSON.stringify(cart));
displayCart();
updateCartCount();
}

function clearCart(){
cart=[];
localStorage.removeItem("cart");
displayCart();
updateCartCount();
}