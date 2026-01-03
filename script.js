let medicines = JSON.parse(localStorage.getItem("medicines")) || [];
const NEAR_EXPIRY_DAYS = 10;

// Populate dropdown
function populateSelect(filteredMedicines = medicines) {
  const select = document.getElementById("medicineSelect");
  select.innerHTML = `<option value="">-- Select Medicine --</option>`;
  filteredMedicines.forEach((med, i) => {
    select.innerHTML += `<option value="${i}">${med.name}</option>`;
  });
}

// Search bar function
function searchMedicine() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = medicines.filter(med => med.name.toLowerCase().includes(query));
  populateSelect(filtered);
}

// Filter function
function filterMedicines() {
  const filter = document.getElementById("filterSelect").value;
  let filtered = medicines;

  filtered = medicines.filter(med => {
    const today = new Date();
    const exp = new Date(med.expiry);
    const diffDays = Math.floor((exp - today) / (1000 * 60 * 60 * 24));

    if (filter === "safe") return diffDays > NEAR_EXPIRY_DAYS;
    if (filter === "near") return diffDays <= NEAR_EXPIRY_DAYS && diffDays >= 0;
    if (filter === "expired") return diffDays < 0;
    return true; // all
  });

  populateSelect(filtered);
}

// Show medicine details (same as before with near expiry message)
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
    alertMsg = `⚠️ Near Expiry! Only ${diffDays} days left.`;
    if (med.offer) alertMsg += ` 🎁 Offer: ${med.offer} – Keep any offer to sale the product!`;
    else alertMsg += " – Keep any offer to sale the product!";
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

// Expiry status
function getStatus(expiryDate) {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diffDays = Math.floor((exp - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `<span class="expired">❌ Expired</span>`;
  if (diffDays <= NEAR_EXPIRY_DAYS) return `<span class="warning">⚠️ Near Expiry</span>`;
  return `<span class="safe">✅ Safe</span>`;
}

// Hide details
function hideDetails() {
  document.getElementById("detailsBox").classList.add("hidden");
}

// Initialize
populateSelect();
