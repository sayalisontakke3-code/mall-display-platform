// Save Vendor
function saveVendor() {
  const vendor = {
    name: vendorName.value,
    shop: shopName.value,
    shopNo: shopNo.value,
    performance: performance.value
  };
  localStorage.setItem("vendor", JSON.stringify(vendor));
  alert("Vendor Saved");
}

// Add Product
function addProduct() {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const product = {
    name: productName.value,
    price: price.value,
    discount: discount.value,
    description: description.value,
    views: 0,
    sold: 0
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  alert("Product Added");
  loadDisplay();
}

// Load Display
function loadDisplay() {
  if (!document.getElementById("display")) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  display.innerHTML = "";

  products.forEach((p, index) => {
    p.views++;
    display.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>₹${p.price} | ${p.discount}% OFF</p>
        <button onclick="buy(${index})">Scan & Buy</button>
      </div>
    `;
  });

  localStorage.setItem("products", JSON.stringify(products));
}

// Buy Product
function buy(index) {
  let products = JSON.parse(localStorage.getItem("products"));
  products[index].sold++;

  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push({
    product: products[index].name,
    time: new Date().toLocaleString(),
    payment: "UPI"
  });

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("customers", JSON.stringify(customers));
  alert("Purchase Recorded");
}

// Analytics
function loadAnalytics() {
  if (!document.getElementById("analytics")) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  analytics.innerHTML = "";

  products.forEach(p => {
    analytics.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>Views: ${p.views}</p>
        <p>Sold: ${p.sold}</p>
      </div>
    `;
  });
}

// Customer Data
function loadCustomers() {
  if (!document.getElementById("customers")) return;

  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.innerHTML = "";

  customers.forEach(c => {
    customers.innerHTML += `
      <div class="card">
        <p>${c.product}</p>
        <p>${c.time}</p>
        <p>${c.payment}</p>
      </div>
    `;
  });
}

window.onload = function () {
  loadDisplay();
  loadAnalytics();
  loadCustomers();
};
