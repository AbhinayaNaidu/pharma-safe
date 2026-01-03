let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// Toggle visibility of a box
function toggleBox(boxId) {
  const box = document.getElementById(boxId);
  box.classList.toggle("hidden");
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

  document.getElementById("name").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("demand").value = "";
  document.getElementById("offer").value = "";

  populateSelect();
  renderTable();
  document.getElementById("tableBox").classList.remove("hidden");
}

// Get status for expiry
function getStatus(expiryDate) {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diffDays = (exp - today) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return `<span class="expired">Expired</span>`;
  if (diffDays <= 30) return `<span class="warning">Near Expiry</span>`;
  return `<span class="safe">Safe</span>`;
}

// Delete medicine
function deleteMedicine(index) {
  medicines.splice(index, 1);
  localStorage.setItem("medicines", JSON.stringify(medicines));
  populateSelect();
  renderTable();
  hideDetails();
}

// Populate dropdown for search
function populateSelect() {
  const select = document.getElementById("medicineSelect");
  select.innerHTML = `<option value="">-- Select Medicine --</option>`;
  medicines.forEach((m, i) => {
    select.innerHTML += `<option value="${i}">${m.name}</option>`;
  });
}

// Show medicine details
function showMedicineDetails(index) {
  if (index === undefined) {
    index = document.getElementById("medicineSelect").value;
    if (index === "") return hideDetails();
  }
  const med = medicines[index];
  const today = new Date();
  const exp = new Date(med.expiry);
  const diffDays = Math.floor((exp - today) / (1000*60*60*24));

  let alertMsg = "";
  if (diffDays < 0) alertMsg = "⚠️ Medicine has expired!";
  else if (diffDays <= 30) alertMsg = "⚠️ Medicine is near expiry!";

  const content = `
    <strong>Name:</strong> ${med.name}<br>
    <strong>Expiry:</strong> ${med.expiry}<br>
    <strong>Demand:</strong> ${med.demand}<br>
    <strong>Status:</strong> ${getStatus(med.expiry)}<br>
    <strong>Offer:</strong> ${med.offer || 'No Offer'}<br>
    <strong>Alert:</strong> ${alertMsg || 'None'}
  `;
  document.getElementById("detailsContent").innerHTML = content;
  document.getElementById("detailsBox").classList.remove("hidden");
}

// Hide details box
function hideDetails() {
  document.getElementById("detailsBox").classList.add("hidden");
}

// Initial render
populateSelect();
renderTable();

