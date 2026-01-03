let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

const NEAR_EXPIRY_DAYS = 10; // threshold for near expiry

// Toggle Add/Search boxes and hide details
function toggleBox(boxId) {
  const addBox = document.getElementById("addBox");
  const searchBox = document.getElementById("searchBox");
  const detailsBox = document.getElementById("detailsBox");

  // Hide both boxes and details
  addBox.classList.add("hidden");
  searchBox.classList.add("hidden");
  detailsBox.classList.add("hidden");

  // Show the clicked box
  document.getElementById(boxId).classList.remove("hidden");
}

// Add medicine
function addMedicine() {
  const name = document.getElementById("name").value.trim();
  const expiry = document.getElementById("expiry").value;
  const demand = document.getElementById("demand").value.trim();
  const offer = document.getElementById("offer").value.trim();

  if (!name || !expiry || !demand) {
    alert("Please fill all required fields");
    return;
  }

  medicines.push({ name, expiry, demand, offer });
  localStorage.setItem("medicines", JSON.stringify(medicines));

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("demand").value = "";
  document.getElementById("offer").value = "";

  populateSelect();
  alert("✅ Medicine added successfully!");
}

// Populate dropdown for search
function populateSelect() {
  const select = document.getElementById("medicineSelect");
  select.innerHTML = `<option value="">-- Select Medicine --</option>`;
  medicines.forEach((med, i) => {
    select.innerHTML += `<option value="${i}">${med.name}</option>`;
  });
}

// Show medicine details with alerts and offers
function showMedicineDetails(index) {
  if (index === undefined) {
    index = document.getElementById("medicineSelect").value;
    if (index === "") return hideDetails();
  }

  const med = medicines[index];
  const today = new Date();
  const exp = new Date(med.expiry);
  const diffDays = Math.floor((exp - today) / (1000 * 60 * 60 * 24));

  let alertMsg = "";

  if (diffDays < 0) {
    alertMsg = "❌ Medicine has expired!";
  } else if (diffDays <= NEAR_EXPIRY_DAYS) {
    // Near expiry → encourage sale + offer
    alertMsg = `⚠️ Near Expiry! Only ${diffDays} days left.`;
    if (med.offer) {
      alertMsg += ` 🎁 Offer: ${med.offer} – Sell Fast!`;
    } else {
      alertMsg += ` – Sell Fast!`;
    }
  } else {
    alertMsg = "✅ Safe";
  }

  const content = `
    <strong>Name:</strong> ${med.name}<br>
    <strong>Expiry:</strong> ${med.expiry}<br>
    <strong>Demand:</strong> ${med.demand}<br>
    <strong>Status:</strong> ${getStatus(med.expiry)}<br>
    <strong>Alert / Offer:</strong> ${alertMsg}
  `;

  document.getElementById("detailsContent").innerHTML = content;
  document.getElementById("detailsBox").classList.remove("hidden");
}

// Hide details box
function hideDetails() {
  document.getElementById("detailsBox").classList.add("hidden");
}

// Expiry status with colors and emojis
function getStatus(expiryDate) {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diffDays = Math.floor((exp - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `<span class="expired">❌ Expired</span>`;
  if (diffDays <= NEAR_EXPIRY_DAYS) return `<span class="warning">⚠️ Near Expiry</span>`;
  return `<span class="safe">✅ Safe</span>`;
}

// Initialize dropdown
populateSelect();

