import { requireAuth, authFetch } from "./auth.js";
requireAuth();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const message = document.getElementById("message");
  const deleteBtn = document.getElementById("deleteBtn");
  const currentUser = window.currentUser;

  /* ============================================================
     ROLE-BASED: Reserver auto-fills userId
  ============================================================ */
  if (currentUser.role === "reserver") {
    const userIdField = document.getElementById("userId");
    userIdField.value = currentUser.id;
    userIdField.disabled = true;
  }

  /* ============================================================
     Load a reservation into the form (EDIT MODE)
  ============================================================ */
  function loadReservationIntoForm(r) {
    document.getElementById("resourceId").value = r.resource_id;
    document.getElementById("userId").value = r.user_id;
    document.getElementById("startTime").value = r.start_time.slice(0, 16);
    document.getElementById("endTime").value = r.end_time.slice(0, 16);
    document.getElementById("note").value = r.note ?? "";
    document.getElementById("status").value = r.status;

    form.dataset.editId = r.id;

    // ⭐ ROLE-BASED LOGIC
    if (currentUser.role === "manager") {
      document.getElementById("userId").disabled = false;
      deleteBtn.classList.remove("hidden");
    } else {
      document.getElementById("userId").disabled = true;

      if (r.user_id === currentUser.id) {
        deleteBtn.classList.remove("hidden");
      } else {
        deleteBtn.classList.add("hidden");
        message.textContent = "You can only edit your own reservations";
        message.style.color = "red";
      }
    }

    message.textContent = `Editing reservation #${r.id}`;
    message.style.color = "blue";
  }

  /* ============================================================
     Load all reservations into the table
  ============================================================ */
  async function loadReservations() {
    const table = document.getElementById("reservationsTable");
    table.innerHTML = "";

    try {
      const res = await authFetch("/api/reservations");
      const body = await res.json();

      if (!res.ok) {
        console.error("Failed to load reservations:", body);
        return;
      }

      const reservations = body.data || [];

      reservations.forEach(r => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="py-2">${r.id}</td>
          <td class="py-2">${r.resource_id}</td>
          <td class="py-2">${r.user_id}</td>
          <td class="py-2">${new Date(r.start_time).toLocaleString()}</td>
          <td class="py-2">${new Date(r.end_time).toLocaleString()}</td>
          <td class="py-2">${r.note ?? ""}</td>
          <td class="py-2">${r.status}</td>
        `;

        row.classList.add("cursor-pointer", "hover:bg-black/5");
        row.addEventListener("click", () => loadReservationIntoForm(r));

        table.appendChild(row);
      });

    } catch (err) {
      console.error("Error loading reservations:", err);
    }
  }

  /* ============================================================
     DELETE reservation
  ============================================================ */
  deleteBtn.addEventListener("click", async () => {
    const editId = form.dataset.editId;
    if (!editId) return;

    if (currentUser.role === "reserver") {
      const reservationUserId = Number(document.getElementById("userId").value);
      if (reservationUserId !== currentUser.id) {
        message.textContent = "You cannot delete another user's reservation";
        message.style.color = "red";
        return;
      }
    }

    if (!confirm("Delete this reservation?")) return;

    const res = await authFetch(`/api/reservations/${editId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      message.textContent = "Reservation deleted!";
      message.style.color = "green";

      form.reset();
      delete form.dataset.editId;
      deleteBtn.classList.add("hidden");

      loadReservations();
    } else {
      message.textContent = "Error deleting reservation.";
      message.style.color = "red";
    }
  });

  /* ============================================================
     CREATE or UPDATE reservation
  ============================================================ */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const editId = form.dataset.editId;

    if (currentUser.role === "reserver" && editId) {
      if (Number(document.getElementById("userId").value) !== currentUser.id) {
        message.textContent = "You cannot modify another user's reservation";
        message.style.color = "red";
        return;
      }
    }

    const data = {
      resourceId: Number(document.getElementById("resourceId").value),
      userId: Number(document.getElementById("userId").value),
      startTime: new Date(document.getElementById("startTime").value).toISOString(),
      endTime: new Date(document.getElementById("endTime").value).toISOString(),
      note: document.getElementById("note").value,
      status: document.getElementById("status").value
    };

    const url = editId ? `/api/reservations/${editId}` : `/api/reservations`;
    const method = editId ? "PUT" : "POST";

    const res = await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      message.textContent = editId ? "Reservation updated!" : "Reservation created!";
      message.style.color = "green";

      form.reset();
      delete form.dataset.editId;
      deleteBtn.classList.add("hidden");

      loadReservations();
    } else {
      message.textContent = "Error saving reservation.";
      message.style.color = "red";
    }
  });

  // Initial load
  loadReservations();
});
