class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                --primary-color: #78e9ff;
                --secondary-color: #3498db;
                --text-color: black;
                --card-bg: #cbeaff;
                --card-border: #9fc5e8;
                --card-padding: 16px;
                --card-radius: 10px;
            }

            .card {
                background: var(--card-bg);
                border: 2px solid var(--card-border);
                border-radius: var(--card-radius);
                padding: var(--card-padding);
                margin: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .card:hover {
                transform: scale(1.05);
            }

            h2 {
                color: var(--text-color);
                margin: 10px;
            }

            picture img {
                border-radius: 8px;
            }

            p {
                color: var(--text-color);
                margin: 10px;
            }

            a {
                text-decoration: none;
                color: var(--secondary-color);
                font-weight: bold;
                padding: 8px 12px;
                border-radius: 6px;
                background: var(--primary-color);
                transition: background 0.3s;
            }

            a:hover {
                background: var(--secondary-color);
                color: var(--primary-color);
            }
        </style>
        <div class="card">
            <h2></h2>
            <picture>
                <source srcset="" type="image">
                <img src="" alt="">
            </picture>
            <p></p>
            <a href="">Read More</a>
        </div>
        `;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["title", "image", "alt", "description", "link"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        this.shadowRoot.querySelector("h2").innerText = this.getAttribute("title");
        this.shadowRoot.querySelector("img").src = this.getAttribute("image");
        this.shadowRoot.querySelector("img").alt = this.getAttribute("alt");
        this.shadowRoot.querySelector("p").innerText = this.getAttribute("description");
        this.shadowRoot.querySelector("a").href = this.getAttribute("link");
    }
}

customElements.define("project-card", ProjectCard);