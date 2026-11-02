export function qrButtons(storeData) {
  const buttons = document.querySelectorAll("[data-qr-popup]");
  const popup = document.createElement("div");

  popup.className = "qr-popup";
  popup.hidden = true;
  popup.innerHTML = `
    <button class="btn-chip qr-popup-back" type="button" hidden>
      <svg class="svg-gray" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 20 36" fill="none">
        <path d="M0.732422 15.7402C-0.244141 16.7168 -0.244141 18.3027 0.732422 19.2793L15.7324 34.2793C16.709 35.2559 18.2949 35.2559 19.2715 34.2793C20.248 33.3027 20.248 31.7168 19.2715 30.7402L6.03711 17.5059L19.2637 4.27148C20.2402 3.29492 20.2402 1.70898 19.2637 0.732422C18.2871 -0.244141 16.7012 -0.244141 15.7246 0.732422L0.72461 15.7324L0.732422 15.7402Z"></path>
      </svg>
      <h5 class="small-header">Tillbaka</h5>
    </button>
    <section class="qr-popup-content">
      <div class="qrcode"></div>
      <h1 class="qr-popup-title"></h1>
      <h5 class="small-header qr-popup-label"></h5>
    </section>
  `;
  document.body.appendChild(popup);

  const backButton = popup.querySelector(".qr-popup-back");
  const title = popup.querySelector(".qr-popup-title");
  const label = popup.querySelector(".qr-popup-label");
  const qrCode = popup.querySelector(".qrcode");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      let link = storeData.website;
      label.textContent = "Webbplats";

      if (button.dataset.qrPopup === "directions") {
        link = "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(storeData.name);
        label.textContent = "Vägbeskrivning";
      }

      title.textContent = storeData.name;
      qrCode.innerHTML = "";
      new QRCode(qrCode, link);
      popup.hidden = false;
      backButton.hidden = false;
    });
  });

  backButton.addEventListener("click", function () {
    popup.hidden = true;
  });
  popup.addEventListener("click", function (event) {
    if (event.target === popup) popup.hidden = true;
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") popup.hidden = true;
  });
}
