function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Light Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check if light mode was previously enabled
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        themeToggle.checked = true;
    } else {
        body.classList.add("dark-mode");
    }

    // Toggle theme on switch change
    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        }
    });
});