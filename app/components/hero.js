class Hero extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());

    const hero = this.createHeroContainer();
    const frag = this.createElementFrag();

    hero.appendChild(frag);

    shadow.appendChild(hero);

    this.dataset.link ? shadow.appendChild(this.createBackToButton()) : null;
  }

  createHeroContainer() {
    const hero = document.createElement("div");
    hero.id = "hero";

    let title = null;

    if (this.getAttribute("data-title")) {
      title = document.createElement("h1");
      title.classList = "hero-title";
      title.innerHTML = this.getAttribute("data-title");

      hero.appendChild(title);
    }

    return hero;
  }

  createElementFrag() {
    const container = document.createElement("span");
    const frag = document.createElement("img");
    const text = document.createElement("p");

    const path = Array.from(
      { length: window.location.pathname.split("/").slice(3).length },
      () => "../"
    );

    const src =
      path.length > 0
        ? path.join("") + "assets/india-frag.svg"
        : "./app/assets/india-frag.svg";

    container.classList = "frag-container";
    frag.classList = "frag";
    text.classList = "frag-text";

    frag.src = src;
    text.innerHTML = `Índia <br>${this.dataset.text}`;

    container.appendChild(frag);
    container.appendChild(text);

    return container;
  }

  createBackToButton() {
    const link = document.createElement("a");
    link.href = this.dataset.link;
    link.textContent = "Voltar";
    link.classList = "back-button";

    return link;
  }

  styles() {
    const style = document.createElement("style");

    const src = this.dataset.image;

    style.textContent = `
        .frag-container {
            position:absolute;
            top:1.5rem;
            left:1.5rem;

            display:flex;
            align-items:center
        }
        .frag {
            object-fit: cover;
            width: 4.5rem;
            height: 3rem;
        }
        .back-button {
            position:absolute;
            top:2rem;
            right:1.5rem;

            padding:1rem 1.2rem;
            border-radius:8px;

            text-decoration:none;
            color:#fff;

            font-family:"Lexend", sans-serif;
            cursor:pointer;

            background:var(--india-green);

            transition:background ease 400ms;
        }
        .back-button:hover{
          background:#2EA55F;
        }
        .frag-text {
            font-family: "Lexend", sans-serif;
            color:#ffffff;
            margin-left:.5rem;
        }
        #hero {
            background: url("${src}") #121212 no-repeat top/cover;
            width: 100%;
            height: 80vh;
            position: relative;

            display:flex;
            align-items:center;
            justify-content:center;
        }
        #hero::before,
        #hero::after {
          content: "";
          background: linear-gradient(to top,#fff, transparent 20%);
          position: absolute;
          inset: 0;
        }
        ${
          this.getAttribute("data-title")
            ? `
            #hero::before {
                background:#00000030;
            }`
            : null
        }
        .hero-title {
            font-family:"Funnel Sans", sans-serif;
            font-weight: 900;
            text-transform:uppercase;
            color:#fff;
            z-index:10;
            letter-spacing:.5rem;
            font-size:1.8rem;
        }
        @media(min-width: 640px) {
          .hero-title {
            font-size:2.8rem;        
          }
        }
    `;

    return style;
  }
}

customElements.define("hero-comp", Hero);
