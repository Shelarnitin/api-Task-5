const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data
let products = [
  { id: 1, name: "Coffee", price: 120 },
  { id: 2, name: "Donut", price: 80 },
];

// 🟢 READ - Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// 🟡 CREATE - Add a new product
app.post("/api/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 🔵 UPDATE - Edit a product
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id == id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// 🔴 DELETE - Remove a product
app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
