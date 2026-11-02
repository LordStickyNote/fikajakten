export function initFilterButtons() {
  let filterButtons = document.getElementById("store-category-bar");

  filterButtons.addEventListener("click", function (event) {
    let clickedButton = event.target.closest("button[data-category]");

    if (clickedButton === null) {
      return;
    }

    let selectedCategory = clickedButton.dataset.category;
    let items = document.querySelectorAll(".card-item");

    for (const item of items) {
      if (
        selectedCategory === "all" ||
        item.dataset.category === selectedCategory
      ) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }

    let buttons = filterButtons.querySelectorAll("button");

    for (const button of buttons) {
      button.classList.remove("btn-chip-active");
    }

    clickedButton.classList.add("btn-chip-active");

    let activeItem = document.querySelector(".card-item-active");

    if (activeItem && activeItem.style.display === "none") {
      activeItem.classList.remove("card-item-active");
      document.querySelector(".card-info").style.display = "none";
    }
  });
}
