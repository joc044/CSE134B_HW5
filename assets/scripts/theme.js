document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    themeIcon.textContent = currentTheme === "dark" ? "Light" : "Dark";

    toggleButton.addEventListener("click", () => {
        const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeIcon.textContent = newTheme === "dark" ? "Light" : "Dark";
    });

    const searchForm = document.querySelector("form[role='search']");
    if (searchForm) {
        searchForm.addEventListener("submit", (event) => {
            const queryInput = document.getElementById("query");
            const searchQuery = queryInput.value.trim();

            if (searchQuery === "") {
                alert("Please enter a search term before submitting.");
                queryInput.focus();
                event.preventDefault();
            }
        });
    }
});