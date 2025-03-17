document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-list");
    const loadLocalBtn = document.getElementById("load-local");
    const loadRemoteBtn = document.getElementById("load-remote");

    function createProjectCard(project) {
        let card = document.createElement("project-card");
        card.setAttribute("title", project.title);
        card.setAttribute("image", project.image);
        card.setAttribute("alt", project.alt);
        card.setAttribute("description", project.description);
        card.setAttribute("link", project.link);
        projectContainer.appendChild(card);
    }

    function loadLocalProjects() {
        projectContainer.innerHTML = "";
        const localProjects = JSON.parse(localStorage.getItem("projects")) || [];
        if (localProjects.length === 0) {
            alert("No local data found!");
        }
        localProjects.forEach(createProjectCard);
    }

    function loadRemoteProjects() {
        projectContainer.innerHTML = "";
        fetch("https://my-json-server.typicode.com/joc044/CSE134B_EndPoint/projects")
            .then(response => response.json())
            .then(data => {
                data.forEach(createProjectCard);
            })
            .catch(error => console.error("Error fetching remote projects:", error));
    }

    loadLocalBtn.addEventListener("click", loadLocalProjects);
    loadRemoteBtn.addEventListener("click", loadRemoteProjects);
});