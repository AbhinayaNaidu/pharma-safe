let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function addMedicine() {
  const name = document.getElementById("name").value;
  const expiry = document.getElementById("expiry").value;
  const demand = document.getElementById("demand").value;

  if (!name || !expiry || !demand) {
    alert("Please fill all fields");
    return;
  }

  medicines.push({ name, expiry, demand });
  localStorage.setItem("medicines", JSON.stringify(medicines));

  document.getElementById("name").value = "";
  document.getElementById("expiry").value = "";
  document.getElementById("demand").value = "";

  renderTable();
}

function getStatus(expiryDate) {
  const today = new Date();
  const exp = new Date(expiryDate);
  const diffDays = (exp - today) / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return `<span class="expired">Expired</span>`;
  if (diffDays <= 30) return `<span class="warning">Near Expiry</span>`;
  return `<span class="safe">Safe</span>`;
}

function deleteMedicine(index) {
  medicines.splice(index, 1);
  localStorage.setItem("medicines", JSON.stringify(medicines));
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  const search = document.getElementById("search").value.toLowerCase();
  tbody.innerHTML = "";

  medicines
    .filter(m => m.name.toLowerCase().includes(search))
    .sort((a, b) => new Date(a.expiry) - new Date(b.expiry))
    .forEach((m, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${m.name}</td>
          <td>${m.expiry}</td>
          <td>${m.demand}</td>
          <td>${getStatus(m.expiry)}</td>
          <td><button onclick="deleteMedicine(${i})">Delete</button></td>
        </tr>
      `;
    });
}

renderTable();
