const API_URL = "http://localhost:5000/api/products";
const productList = document.getElementById("productList");
const form = document.getElementById("productForm");

async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();

  productList.innerHTML = data
    .map(
      (item) => `
      <div class="product">
        <p><strong>${item.name}</strong> - ₹${item.price}</p>
        <button onclick="deleteProduct(${item.id})">Delete</button>
      </div>
    `
    )
    .join("");
}

// Add new product
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price }),
  });

  form.reset();
  fetchProducts();
});

// Delete product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchProducts();
}

// Load data on page load
fetchProducts();
