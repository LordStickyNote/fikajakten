import { initItemSelect } from './item-select.js';
import { initFilterButtons } from './filter-items.js';
import { qrButtons } from './qr-buttons.js';

renderStore(new URLSearchParams(window.location.search).get("id"));

async function renderStore(store) {
  const response = await fetch(`data/${store}.json`);
  if (!response.ok) {
    throw new Error("Could not load");
  }

  let storeData = await response.json();

  document.title = storeData.name;
  document.getElementById("store-name").textContent = storeData.name;
  document.getElementById("store-type").textContent = storeData.type;
  const storeLogo = document.getElementById("store-logo");
  storeLogo.src = storeData.logo;
  document.getElementById("store-description").textContent =
    storeData.description;
  document.getElementById("store-opening-time").textContent =
    `${storeData.hours[0]} - ${storeData.hours[1]}`;

  document.getElementById("store-distance").textContent = storeData.distance;

  function priceRangeCalc() {
    let priceRangeCalculated = "";
    for (let i = 0; i < storeData.priceLevel; i++) {
      priceRangeCalculated += "$ ";
    }
    return priceRangeCalculated;
  }
  document.getElementById("store-price-range").textContent = priceRangeCalc();

  document.getElementById("store-rating").textContent = storeData.rating;

  function getCatagories() {
    let catagories =
      '<button class="btn-chip btn-chip-active" data-category="all">Alla produkter</button>';
    let sameCheck = [];
    for (const category of storeData.menu) {
      if (!sameCheck.includes(category.category)) {
        sameCheck.push(category.category);
        catagories += `
          <button class="btn-chip" data-category="${category.category}">
            ${category.category}
          </button>`;
      }
    }
    return catagories;
  }

  document.getElementById("store-category-bar").innerHTML = getCatagories();

  function getItems() {
    let itemArray = [];
    for (const item of storeData.menu) {
      itemArray.push(`
            <div
              class="card-item"
              data-item="${item.id}"
              data-category="${item.category}"
            >
          <div class="card-img">
            <img src="${item.image}" alt="${item.name}" />
            <svg
              width="129"
              height="106"
              viewBox="0 0 129 106"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M124.594 56C104.094 97 86.4553 106 53.5943 106C20.7334 106 0.594313 82 0.594313 56C-4.90569 17 28.7334 0 61.5943 0C94.4552 0 141.594 0 124.594 56Z"
                fill="#74da8dcb"
                fill-opacity="0.5"
              />
            </svg>
          </div>

          <div>
            <h5 class="small-header">${item.name}</h5>
            <p class="txt-muted">${item.price} Kr</p>
          </div>
        </div>`);
    }
    let itemString = "";
    for (const item of itemArray) {
      itemString += item;
    }
    return itemString;
  }

  document.getElementById("item-grid").innerHTML = getItems();
  initFilterButtons();
  initItemSelect(storeData);

  
  qrButtons(storeData);
}
