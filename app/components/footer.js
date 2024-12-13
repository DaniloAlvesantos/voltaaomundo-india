class Footer extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());
    shadow.appendChild(this.craeteFooter())

  }

  craeteFooter() {
    const footer = document.createElement("footer");
    footer.classList = "footer-container";
    
    const year = new Date().getFullYear();

    const copy = document.createElement("p");
    copy.innerHTML = `&copy;dalves-${year}`;

    footer.appendChild(copy);

    return footer;
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
        .footer-container {
            display:flex;
            align-items:center;
            justify-content:center;

            font-family:"Lexend", sans-serif;
            font-weight:600;
            color:#fff;

            background:var(--india-orange);
            margin-top:2rem;
        }
        `;

    return style;
  }
}

customElements.define("footer-comp", Footer);