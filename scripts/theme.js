const toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
  // Toggle the .dark class on the body
  document.body.classList.toggle("dark");

  // Update button text based on current theme
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "🌙 Switch to Light Mode";
  } else {
    toggleBtn.textContent = "☀️ Switch to Dark Mode";
  }
});
