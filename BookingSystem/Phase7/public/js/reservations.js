document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      resourceId: Number(document.getElementById("resourceId").value),
      userId: Number(document.getElementById("userId").value),
      startTime: new Date(document.getElementById("startTime").value).toISOString(),
      endTime: new Date(document.getElementById("endTime").value).toISOString(),
      note: document.getElementById("note").value,
      status: document.getElementById("status").value
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        message.textContent = "Reservation created!";
        message.style.color = "green";
        form.reset();
      } else {
        message.textContent = "Error creating reservation.";
        message.style.color = "red";
      }
    } catch (err) {
      message.textContent = "Network error.";
      message.style.color = "red";
    }
  });
});