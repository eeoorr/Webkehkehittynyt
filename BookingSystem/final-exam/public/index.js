// Simple customer management frontend using vanilla JavaScript. 
// Shows how to perform CRUD operations by interacting with a RESTful API.
// Stores the currently selected customer in a variable to manage state between the customer list and the form.
let selectedCustomer = null; 

// ----------------------------
// LOAD ALL CUSTOMERS
// ----------------------------
// This function fetches all customers from the API and displays them in the customer list container. 
// The customers are displayed as clickable cards. 
// When a card is clicked, the customer's details are loaded into the form for editing,
//  and the update/delete buttons are enabled.
async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";

      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;

      div.addEventListener("click", () => {
        selectedCustomer = person;
        fillForm(person);
        toggleActionButtons(true);
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

// ----------------------------
// FORM HELPERS
// ----------------------------
// These functions help with filling the form when a customer is selected, getting data from the form, 
// toggling action buttons, and showing messages to the user.
function fillForm(person) {
  document.getElementById("firstName").value = person.first_name;
  document.getElementById("lastName").value = person.last_name;
  document.getElementById("email").value = person.email;
  document.getElementById("phone").value = person.phone || "";
  document.getElementById("birthDate").value =
    person.birth_date ? person.birth_date.substring(0, 10) : "";
}

function getFormData() {
  return {
    first_name: document.getElementById("firstName").value.trim(),
    last_name: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    birth_date: document.getElementById("birthDate").value || null
  };
}

function toggleActionButtons(enabled) {
  document.getElementById("updateCustomerBtn").disabled = !enabled;
  document.getElementById("deleteCustomerBtn").disabled = !enabled;
}

function showMessage(msg, type = "info") {
  const el = document.getElementById("customer-form-message");
  el.textContent = msg;
  el.style.color = type === "error" ? "red" : "green";
}

// ----------------------------
// CRUD OPERATIONS:
// Each operation is handled by a separate function that makes the appropriate API call
// ----------------------------
// CREATE
// ----------------------------
async function createCustomer() {
  const payload = getFormData();

  if (!payload.first_name || !payload.last_name || !payload.email) {
    showMessage("First name, last name and email are required", "error");
    return;
  }

  try {
    const res = await fetch("/api/persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      showMessage(err.error || "Failed to create customer", "error");
      return;
    }

    showMessage("Customer created successfully");
    await loadCustomers();

  } catch (err) {
    console.error(err);
    showMessage("Network error", "error");
  }
}

// ----------------------------
// UPDATE
// ----------------------------
// gone
async function updateCustomer() {
  if (!selectedCustomer) return;

  const payload = getFormData();

  try {
    const res = await fetch(`/api/persons/${selectedCustomer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      showMessage(err.error || "Failed to update customer", "error");
      return;
    }

    showMessage("Customer updated successfully");
    await loadCustomers();

  } catch (err) {
    console.error(err);
    showMessage("Network error", "error");
  }
}

// ----------------------------
// DELETE
// ----------------------------
// no confirmation dialog for some reason
// in a real app, you would want to confirm this action with the user
async function deleteCustomer() {
  if (!selectedCustomer) return;

  try {
    const res = await fetch(`/api/persons/${selectedCustomer.id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      const err = await res.json();
      showMessage(err.error || "Failed to delete customer", "error");
      return;
    }

    showMessage("Customer deleted");
    selectedCustomer = null;
    toggleActionButtons(false);
    await loadCustomers();

  } catch (err) {
    console.error(err);
    showMessage("Network error", "error");
  }
}

// ----------------------------
// EVENT LISTENERS
// ----------------------------
// Run on page load
// Set up form submission and button click handlers
// Note: The form submission handler checks if a customer is selected to determine whether to create or update
document.addEventListener("DOMContentLoaded", () => {
  loadCustomers();

  const form = document.getElementById("customer-management-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (selectedCustomer) updateCustomer();
    else createCustomer();
  });

  document.getElementById("updateCustomerBtn")
    .addEventListener("click", updateCustomer);

  document.getElementById("deleteCustomerBtn")
    .addEventListener("click", deleteCustomer);
});
