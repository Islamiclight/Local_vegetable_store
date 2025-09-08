// পণ্য লিস্ট
const products = [
  { id: 1, name: "আলু", price: 40 },
  { id: 2, name: "টমেটো", price: 60 },
  { id: 3, name: "পেঁয়াজ", price: 50 },
  { id: 4, name: "ঢেঁড়স", price: 30 },
  { id: 5, name: "বেগুন", price: 35 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product show
const productList = document.getElementById("product-list");
products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <h3>${product.name}</h3>
    <p>৳${product.price} প্রতি কেজি</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Display Cart
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ৳${item.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total;
}
displayCart();

// Clear Cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
}

// Checkout
document.getElementById("checkout-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  
  if (cart.length === 0) {
    alert("কার্ট খালি আছে!");
    return;
  }
  
  alert(`ধন্যবাদ ${name}! আপনার অর্ডার কনফার্ম হয়েছে।\nমোবাইল: ${phone}\nঠিকানা: ${address}\nমোট: ৳${document.getElementById("cart-total").textContent}`);
  
  clearCart();
  this.reset();
});
