const mapBtns = document.getElementsByClassName("btn-map");

for (const btn of mapBtns) {
  const response = await fetch(`data/${btn.dataset.storeId}.json`);
  const store = await response.json();

  btn.querySelector(".map-btn-header").textContent = store.name;
  btn.querySelector(".map-btn-time").textContent = store.distance;
  btn.querySelector(".map-btn-cost").textContent = "$ ".repeat(store.priceLevel).trim();
  btn.querySelector(".map-btn-star").textContent = store.rating;
  btn.querySelector(".map-btn-img").src = store.logo;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = store.hours[0].split(":").map(Number);
  const [closeHour, closeMinute] = store.hours[1].split(":").map(Number);
  const openingTime = openHour * 60 + openMinute;
  const closingTime = closeHour * 60 + closeMinute;
  const isOvernight = closingTime <= openingTime;
  const isOpen = isOvernight
    ? currentTime >= openingTime || currentTime < closingTime
    : currentTime >= openingTime && currentTime < closingTime;
  const minutesUntilClosing =
    isOvernight && currentTime >= openingTime
      ? 24 * 60 - currentTime + closingTime
      : closingTime - currentTime;
  const openText = btn.querySelector(".map-btn-text-open");
  let status = "Öppet";
  let statusClass = "text-open";

  if (!isOpen) {
    status = "Stängt";
    statusClass = "text-closed";
  } else if (minutesUntilClosing < 60) {
    status = "Stänger snart";
    statusClass = "text-closing";
  }
  openText.textContent = status;
  openText.className = `map-btn-text-open text-strong ${statusClass}`;

  btn.addEventListener("click", () => {
    open(`store.html?id=${btn.dataset.storeId}`, "_self");
  });
}