function showToast(message, duration = 3000) {
  let container = document.getElementById("toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    container.style.cssText = [
      "position: fixed",
      "bottom: 24px",
      "right: 24px",
      "z-index: 9999",
      "display: flex",
      "flex-direction: column",
      "gap: 10px"
    ].join(";");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = [
    "background: #1e293b",
    "color: #ffffff",
    "padding: 12px 18px",
    "border-radius: 8px",
    "box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2)",
    "font-family: Arial, sans-serif",
    "font-size: 14px",
    "opacity: 0",
    "transform: translateY(8px)",
    "transition: opacity 0.2s ease, transform 0.2s ease"
  ].join(";");

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 200);
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const matchSelect = document.getElementById("match");
  const bookButtons = document.querySelectorAll(".book-btn");

  bookButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedMatch = btn.dataset.match;
      const matchLabel = btn.dataset.matchLabel || selectedMatch || "selected match";

      if (matchSelect && selectedMatch) {
        matchSelect.value = selectedMatch;
      }

      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: "smooth", block: "start" });
        const firstInput = bookingForm.querySelector("input, select");
        if (firstInput) {
          setTimeout(() => firstInput.focus({ preventScroll: true }), 400);
        }
      }

      showToast(`Scrolling to booking form for ${matchLabel}...`);
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", () => {
      showToast("Form validated! Processing your ticket request...");
    });
  }
});