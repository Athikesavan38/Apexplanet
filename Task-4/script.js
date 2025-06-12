
const products = [
  { id: 1, name: "Apple iPhone 16", category: "electronics", price: 1200, image: "./asserts/phone2.webp" },
  { id: 2, name: "Realme 14x 5G Mobile Phone", category: "electronics", price: 799, image: "./asserts/phone1.webp" },
  { id: 3, name: "T-Shirt", category: "clothing", price: 125, image: "./asserts/t1.webp" },
  { id: 4, name: "Lenovo Yoga Slim 7 Laptop", category: "electronics", price: 1199, image: "./asserts/lap1.avif" },
  { id: 5, name: "IKIGAI: The Japanese Secret To A Long And Happy Life", category: "books", price: 25, image: "./asserts/b2.webp" },
  { id: 6, name: "boAt Airdopes 141", category: "electronics", price: 199, image: "./asserts/h5.jpg" },
  { id: 7, name: "Jeans", category: "clothing", price: 140, image: "./asserts/j1.webp" },
  { id: 8, name: "Books Atomic Habits", category: "books", price: 50, image: "./asserts/b3.webp" },
  { id: 9, name: "RAM - Scion of Ikshvaku", category: "books", price: 45, image: "./asserts/b6.webp" },
  { id: 10, name: "MiraMichi Men's Striped Full Sleeve Corduroy Jacket", category: "clothing", price: 160, image: "./asserts/ja1.webp" },
  { id: 11, name: "Asus TUF Gaming A15 Fa506nc-hn083w Gaming Laptop", category: "electronics", price: 999, image: "./asserts/lap2.webp" },
  { id: 12, name: "Jeans", category: "clothing", price: 149, image: "./asserts/j2.webp" },
  { id: 13, name: "Men's Introvert", category: "clothing", price: 125, image: "./asserts/t2.webp" },
  { id: 14, name: "Psychology of Money", category: "books", price: 89, image: "./asserts/b1.webp" },
  { id: 15, name: "Men's Batman Graphic", category: "clothing", price: 99, image: "./asserts/t4.webp" },
  { id: 16, name: "Laptop", category: "electronics", price: 899, image: "./asserts/lap4.webp" },
  { id: 17, name: "Men's Breathable Round Neck", category: "clothing", price: 299, image: "./asserts/t5.webp" },
  { id: 18, name: "Laptop", category: "electronics", price: 1139, image: "./asserts/lap3.webp" },
  { id: 19, name: "Men's Breathable Round Neck", category: "clothing", price: 899, image: "./asserts/t6.webp" },
  { id: 20, name: "Laptop", category: "electronics", price: 1199, image: "./asserts/lap5.webp" },
  { id: 21, name: "OnePlus Bullets Wireless Z2 Bluetooth in Ear Earphones with Mic", category: "electronics", price: 199, image: "./asserts/h3.webp" },
  { id: 22, name: "Zebronics Jet Gaming Headphone", category: "electronics", price: 499, image: "./asserts/h1.webp" },
  { id: 23, name: "Lenovo LOQ 15IAX9 Intel Core i5 12th Gen Gaming Laptop", category: "electronics", price: 899, image: "./asserts/lap6.webp" },
  { id: 24, name: "JBL Tune 310 Wired in-Ear Type C Headphones", category: "electronics", price: 399, image: "./asserts/h2.webp" },
  { id: 26, name: "Lenovo Legion 5 10th Gen Intel Core i5 Gaming Laptop", category: "electronics", price: 1199, image: "./asserts/lap7.webp" },
  { id: 27, name: "T-Shirt", category: "clothing", price: 325, image: "./asserts/t3.webp" },
  { id: 28, name: "RICH DAD POOR DAD", category: "books", price: 99, image: "./asserts/b4.webp" },
  { id: 29, name: "WINGS OF FIRE AN AUTOBIOGRAPHY", category: "books", price: 63, image: "./asserts/b5.webp" },
  { id: 30, name: "Lenovo Legion i3 Gaming Laptop", category: "electronics", price: 999, image: "./asserts/lap8.webp" },
  { id: 31, name: "Hammer Bash 2.0 Wireless Bluetooth Headphones", category: "electronics", price: 799, image: "./asserts/h4.webp" },
];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const priceSort = document.getElementById("priceSort");
const resetBtn = document.getElementById("resetBtn");

const modal = document.getElementById("productModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalAddBtn = document.getElementById("modalAddBtn");
const relatedItems = document.getElementById("relatedItems");

let selectedProduct = null;

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
  alert(`${product.name} added to cart.`);
}

function renderProducts(filtered) {
  productGrid.innerHTML = "";
  filtered.forEach(p => {
    productGrid.innerHTML += `
          <div class="bg-white p-3 rounded shadow scale-on-hover">
            <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover rounded">
            <h2 class="mt-2 font-bold">${p.name}</h2>
            <p class="text-gray-500">${p.category}</p>
            <p class="text-blue-600 font-bold">₹${p.price}</p>
            <button onclick='addToCart(${JSON.stringify(p)})' class="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded">Add to Cart</button>
            <button onclick='openModal(${JSON.stringify(p)})' class="mt-1 w-full text-sm text-blue-700 underline">View Details</button>
          </div>
        `;
  });
}

function openModal(product) {
  selectedProduct = product;
  modalTitle.textContent = product.name;
  modalImage.src = product.image;
  modalCategory.textContent = `Category: ${product.category}`;
  modalPrice.textContent = `₹${product.price}`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  relatedItems.innerHTML = "";
  products.filter(p => p.category === product.category && p.id !== product.id).forEach(p => {
    relatedItems.innerHTML += `
          <div class='bg-gray-100 p-2 rounded'>
            <img src='${p.image}' class='w-full h-24 object-cover rounded'>
            <p class='text-sm mt-1'>${p.name}</p>
          </div>`;
  });
}

function closeModal() {
  modal.classList.add("hidden");
}

document.getElementById("modalAddBtn").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selectedProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
  alert(`${selectedProduct.name} added to cart.`);
});

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const selected = [...document.querySelectorAll('.category:checked')].map(cb => cb.value);
  const max = parseInt(priceRange.value);
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) &&
    (selected.length === 0 || selected.includes(p.category)) &&
    p.price <= max
  );
  if (priceSort.value === 'lowToHigh') filtered.sort((a, b) => a.price - b.price);
  else if (priceSort.value === 'highToLow') filtered.sort((a, b) => b.price - a.price);
  renderProducts(filtered);
}

searchInput.addEventListener("input", applyFilters);
priceRange.addEventListener("input", () => {
  priceValue.textContent = `₹${priceRange.value}`;
  applyFilters();
});
priceSort.addEventListener("change", applyFilters);
document.querySelectorAll('.category').forEach(cb => cb.addEventListener("change", applyFilters));
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  priceRange.value = 1200;
  priceValue.textContent = "₹1200";
  priceSort.value = "default";
  document.querySelectorAll(".category").forEach(cb => cb.checked = false);
  applyFilters();
});

applyFilters();

// 🟢 Update cart count on load
cartCount.textContent = (JSON.parse(localStorage.getItem("cart")) || []).length;
