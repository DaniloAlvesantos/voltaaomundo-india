class Weather extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  async build() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styles());

    const card = await this.createCard();
    shadow.appendChild(card);
  }

  async createCard() {
    const card = document.createElement("div");
    const icon = document.createElement("img");
    const info = document.createElement("p");
    const degree = document.createElement("h3");
    const textCont = document.createElement("span");
    const infoCont = document.createElement("span");
    const wind = document.createElement("p");
    const humidity = document.createElement("p");
    const hour = document.createElement("p");

    card.classList = "weather-card";
    icon.classList = "weather-icon";
    info.classList = "weather-info";
    infoCont.classList = "weather-info-container";
    degree.classList = "weather-degree";
    textCont.classList = "weather-text-container";
    wind.classList = "weather-wind";
    humidity.classList = "weather-humidity";
    hour.classList = "weather-hour";

    const data = await this.getWeatherData();

    const icon_info = this.getIcon(data.weather_code);
    const path = Array.from(
      { length: window.location.pathname.split("/").slice(3).length },
      () => "../"
    );

    let src = "";

    switch (icon_info) {
      case "sun":
        src = !data.is_day
          ? path.join("") + "assets/moon.svg"
          : path.join("") + "assets/sun.svg";
        infoCont.setAttribute("style", "--bg:#FFECB2;");
        break;
      case "clound":
        src = path.join("") + "assets/cloudy.svg";
        infoCont.setAttribute("style", "--bg:#D9E6EB;");
        break;
      case "light-rain":
        src = path.join("") + "assets/light-rain.svg";
        infoCont.setAttribute("style", "--bg:#C7EEFF;");
        break;
      case "rain":
        src = path.join("") + "assets/cloud-rain.svg";
        infoCont.setAttribute("style", "--bg:#3F6993;");
        break;
      default:
        console.log("Valor do icone desconhecido");
        break;
    }

    icon.src = src;
    info.innerHTML = data.weather;
    degree.innerHTML = `${data.temperature}°`;
    wind.innerHTML = `Vento: ${data.wind}`;
    humidity.innerHTML = `Humidade: ${data.humidity}`;
    hour.innerHTML = `${data.hour}`;

    infoCont.appendChild(icon);
    infoCont.appendChild(info);
    infoCont.appendChild(degree);
    textCont.appendChild(wind);
    textCont.appendChild(humidity);
    textCont.appendChild(hour);
    card.appendChild(infoCont);
    card.appendChild(textCont);

    return card;
  }

  async getWeatherData() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto",
      {
        method: "GET",
      }
    ).then((data) => data.json());

    const data = response.current;
    const hours = new Date(data.time).getHours();
    const minutes = new Date(data.time).getMinutes();

    const res = {
      hour: `${hours}:${minutes}`,
      is_day: data.is_day === 0 ? false : true,
      weather: this.getWeatherStatus(data.weather_code),
      temperature: data.temperature_2m,
      humidity: data.relative_humidity_2m, // %
      wind: data.wind_speed_10m, // km/h
      weather_code: data.weather_code,
    };

    return res;
  }

  getIcon(code) {
    if (code <= 1) {
      return "sun";
    }
    if (code >= 2 && code <= 48) {
      return "clound";
    }
    if (code >= 51 && code <= 67) {
      return "light-rain";
    }
    if (code >= 80 && code <= 99) {
      return "rain";
    }

    return "desconhecio";
  }

  getWeatherStatus(code) {
    const weatherStatus = {
      0: "Céu limpo",
      1: "Predominantemente limpo",
      2: "Parcialmente nublado",
      3: "Nublado",
      45: "Névoa",
      48: "Névoa com geada",
      51: "Garoa: Intensidade leve",
      53: "Garoa: Intensidade moderada",
      55: "Garoa: Intensidade forte",
      56: "Garoa congelante: Intensidade leve",
      57: "Garoa congelante: Intensidade forte",
      61: "Chuva: Intensidade leve",
      63: "Chuva: Intensidade moderada",
      65: "Chuva: Intensidade forte",
      66: "Chuva congelante: Intensidade leve",
      67: "Chuva congelante: Intensidade forte",
      71: "Queda de neve: Intensidade leve",
      73: "Queda de neve: Intensidade moderada",
      75: "Queda de neve: Intensidade forte",
      77: "Grãos de neve",
      80: "Pancadas de chuva: Intensidade leve",
      81: "Pancadas de chuva: Intensidade moderada",
      82: "Pancadas de chuva: Intensidade violenta",
      85: "Pancadas de neve: Intensidade leve",
      86: "Pancadas de neve: Intensidade forte",
      95: "Tempestade: Leve ou moderada",
      96: "Tempestade com granizo leve",
      99: "Tempestade com granizo forte",
    };

    return weatherStatus[code] || "Código meteorológico desconhecido";
  }

  styles() {
    const style = document.createElement("style");
    style.textContent = `
        * {
          margin:0;
          padding:0;
        }
        .weather-card {
          display:flex;
          flex-direction:column;
          position:relative;
          width:13rem;
          border-radius:12px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          margin:1rem 0;
        }
        .weather-icon {
          position:absolute;
          top:1rem;
          left:1rem;

          width:2.4rem;
          height:2.4rem;
        }
        .weather-info-container {
          text-align:right;
          background:var(--bg);
          padding:1rem;
          border-radius:12px 12px 0 0;
        }
        .weather-info {
          font-family:"Funnel Sans", sans-serif;
          line-height:1.8rem;
          text-wrap: wrap;
        }
        .weather-degree {
          font-size:1.8rem;
          font-family:"Lexend", sans-serif;
          font-weight:300;
        }
        .weather-text-container {
          padding:1rem;
        }
        .weather-text-container p {
          font-family:"Funnel Sans", sans-serif;
          margin: .2rem 0;
        }
    `;

    return style;
  }
}

customElements.define("weather-comp", Weather);
