class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());

    const card = this.createCard();
    shadow.appendChild(card);
  }

  createCard() {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const imageTitle = document.createElement("p");
    imageTitle.classList.add("image-title");
    imageTitle.textContent = this.getAttribute("data-title");
    imageContainer.appendChild(imageTitle);

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    const descriptionTitle = document.createElement("h5");
    descriptionTitle.innerHTML = "Descrição";
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = this.getAttribute("data-description");
    const button = document.createElement("button");
    button.textContent = "Aprender Receita";
    button.classList.add("learn-button");

    textContainer.appendChild(descriptionTitle);
    textContainer.appendChild(description);
    textContainer.appendChild(button);

    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(textContainer);

    return cardContainer;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
      .card {
        width: 20rem;
        border: 0.125rem solid ${this.dataset.border};
        border-radius: 8px;
        overflow: hidden;
        font-family: "Lexend", sans-serif;
        padding:.5rem;
        background-color: ${this.getAttribute("data-bg-color") || "#ffffff"};
      }

      .image-container {
      border-radius:12px;
        position: relative;
        height: 180px;
        background: url("${this.getAttribute(
          "data-image"
        )}") no-repeat center/cover;
      }

      .image-title {
        position: absolute;
        bottom:3rem;
        left:6rem;
        color: ${this.getAttribute("data-title-color") || "#000000"};
        font-size: 1.5rem;
        font-weight: bold;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: ${this.getAttribute("data-border")};
      }

      .text-container {
        padding: .8rem .2rem;
      }
        
      .text-container p, .text-container h5 {
        margin:.5rem 0;
      }
      .text-container h5 {
        font-size:1.3rem;
        color: ${this.getAttribute("data-title-color") || "#000000"};
      }

      .description {
        font-size: 1rem;
      }

      .learn-button {
        display: inline-block;
        padding: .8rem;
        width:100%;
        border: none;
        border-radius: 12px;
        background-color: ${
          this.getAttribute("data-button-color") || "#007BFF"
        };
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-family:"Lexend", sans-serif;
        margin-top:1rem;
        margin-bottom:-1rem;
      }

      .learn-button:hover {
        background-color: ${
          this.getAttribute("data-button-hover") || "#0056b3"
        };
      }
    `;
    return style;
  }
}

customElements.define("recipe-card", RecipeCard);
