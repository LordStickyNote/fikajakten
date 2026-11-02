export function initItemSelect(storeData) {
  let items = document.querySelectorAll(".card-item");
  let itemInfo = document.querySelector(".card-info");

  for (const item of items) {
    item.addEventListener("click", function () {
      if (item.classList.contains("card-item-active")) {
        itemInfo.style.display = "none";
        item.classList.remove("card-item-active");
        return;
      }

      let selectedItem = null;

      for (const menuItem of storeData.menu) {
        if (menuItem.id === item.dataset.item) {
          selectedItem = menuItem;
        }
      }

      if (selectedItem !== null) {
        let itemInfoImage = document.getElementById("item-info-image");
        let itemInfoName = document.getElementById("item-info-name");
        let itemInfoPrice = document.getElementById("item-info-price");
        let itemInfoDescription = document.getElementById(
          "item-info-description",
        );

        itemInfoImage.src = selectedItem.image;
        itemInfoImage.alt = selectedItem.name;
        itemInfoName.textContent = selectedItem.name;
        itemInfoPrice.textContent = selectedItem.price + " Kr";
        itemInfoDescription.textContent = selectedItem.description;

        let activeItems = document.querySelectorAll(".card-item-active");

        for (const activeItem of activeItems) {
          activeItem.classList.remove("card-item-active");
        }

        item.classList.add("card-item-active");
        itemInfo.style.display = "grid";
      }
    });
  }

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".card-item") &&
      !event.target.closest(".card-info")
    ) {
      itemInfo.style.display = "none";

      let activeItems = document.querySelectorAll(".card-item-active");

      for (const activeItem of activeItems) {
        activeItem.classList.remove("card-item-active");
      }
    }
  });
}
