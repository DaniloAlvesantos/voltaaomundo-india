function setImage(url) {
  const imageContainer = document.querySelector(".img-container");
  
  imageContainer.style.background = `url(${url}) #121212 no-repeat center/cover`;
  window.screen.width >= 768
    ? (imageContainer.style.backgroundAttachment = "fixed")
    : null;
}
