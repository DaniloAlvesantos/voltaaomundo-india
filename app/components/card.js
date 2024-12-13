class Card extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles())

    const card = this.createCard();
    shadow.appendChild(card)
  }

  createCard() {
  const cardContainer = document.createElement("div");
  const titleElement = document.createElement("p"); 

  cardContainer.classList = "card";
  titleElement.classList = "card-text"; 
  titleElement.textContent = this.getAttribute("data-title"); 

  cardContainer.appendChild(titleElement);

  return cardContainer;
}

  styles() {
    const style = document.createElement("style");
    style.textContent = `
        .card {
            width:23rem;
            height:12rem;

            border-radius:12px;
            background:url("${this.getAttribute("data-image")}");
            background-size:cover;

            display:flex;
            align-items:center;
            justify-content:center;

            color:#fff;

            position:relative;
        
            transition:all ease 400ms;
            scroll-snap-align: center;
        }
        .card::before,
        .card::after {
            content:"";
            position:absolute;
            inset:0;
            background:#12121220;
            border-radius:12px;
        }
        .card:hover {
            scale:1.03;
        }
        .card-text {
            font-family:"Funnel Sans", sans-serif;
            font-weight:bold;
            font-size:1.2rem;
            letter-spacing:.2rem;
            z-index:10;
        }
    `;

    return style;
  }
}

customElements.define("card-comp", Card);
