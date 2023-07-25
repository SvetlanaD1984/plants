// ФУНКЦИОНАЛ БУРГЕР МЕНЮ

const burger = document.querySelector(".burger");

const burgerMenu = document.createElement("nav");
burgerMenu.classList = "burger-menu";

burgerMenu.innerHTML = `
  <ul>
  <li class="menu-name">
                <a href="#welcome" class="menu-link">Home</a>
              </li>
              <li class="menu-name">
                <a href="#about" class="menu-link">About us</a>
              </li>
              <li class="menu-name">
                <a href="#service" class="menu-link">Service</a>
              </li>
              <li class="menu-name">
                <a href="#prices" class="menu-link">Price</a>
              </li>
              <li class="menu-name">
                <a href="#contacts" class="menu-link">Contacts</a>
              </li>
              </ul>`;

burger.addEventListener("click", toggleBurger);

function toggleBurger() {
    const burgerMenu = document.querySelector(".burger-menu");

    if (burgerMenu) {
        closeBurger();
    } else {
        showBurger();
    }
}

function showBurger() {
    document.body.appendChild(burgerMenu);

    burger.style.backgroundImage = 'url("./assets/closeburger.svg")';
    // Находим координаты бургера
    const { left, top } = burger.getBoundingClientRect();

    // По координатам бургера позиционируем бургер меню
    burgerMenu.style.left = `${left - 127}px`;
    burgerMenu.style.top = `${top + 30}px`;

    setTimeout(() => {
        document.addEventListener("click", closeBurger, {
            once: true,
        });
    }, 0);
}

function closeBurger() {
    burger.style.backgroundImage = 'url("./assets/burger.svg")';
    burgerMenu.style.left = "800px";
    setTimeout(() => {
        document.body.removeChild(burgerMenu);
    }, 400);
}

//ФУНКЦИОНАЛ КНОПОК СЕКЦИИ SERVICE
// filterBySelectedButton();

document
    .querySelector(".service-buttons")
    .addEventListener("click", (event) => {
        if (event.target.classList.contains("service-button")) {
            let clickedButton = event.target;
            // removeSelectedButtons();
            selectClickedButton(clickedButton);
        }
    });

const selectClickedButton = (clickedServiceButton) => {
    if (clickedServiceButton.classList.contains("service-button_active")) {
        clickedServiceButton.classList.remove("service-button_active");
        filterBySelectedButton();
    } else {
        const activeButtons = document.querySelectorAll(".service-button_active");

        if (activeButtons.length < 2) {
            clickedServiceButton.classList.add("service-button_active");
            filterBySelectedButton();
        }
    }
};

const filterBySelectedButton = () => {
    let allImages = document.querySelectorAll(".service__catalog-item");
    allImages.forEach((image) => {
        image.classList.add("service__catalog-item_blur");
    });

    const activeButtons = document.querySelectorAll(".service-button_active");

    if (activeButtons.length === 0) {
        allImages.forEach((image) => {
            image.classList.remove("service__catalog-item_blur");
        });

        //чтобы функция дальше не пошла
        return;
    }
    // 1 Найти активные кнопки.
    // 2 пройтись по кнопкам и получить их дата атрибуты.
    activeButtons.forEach((activeButton) => {
        const filterButton = activeButton.dataset.filter;

        const images = document.querySelectorAll(
            `.service__catalog-item[data-filter='${filterButton}']`
        );

        images.forEach((activeImage) => {
            activeImage.classList.remove("service__catalog-item_blur");
        });
    });
};

// ФУНКЦИОНАЛ АККОРДЕОНА СЕКЦИИ PRICES

const selectPrice = document.querySelectorAll(".select__price");

selectPrice.forEach((select) => {
    select.addEventListener("click", function(event) {
        const eachSelectPrice = event.currentTarget;

        if (eachSelectPrice.classList.contains("opened")) {
            eachSelectPrice.classList.remove("opened");
        } else {
            // 1 select
            const openedSelect = document.querySelector(".select__price.opened");
            if (openedSelect !== null) {
                openedSelect.classList.remove("opened");
            }
            eachSelectPrice.classList.add("opened");
        }
    });
});

// ФУНКЦИОНАЛ КНОПКИ ORDER СЕКЦИИ PRICES

const orderButtons = document.querySelectorAll(".select__button");
const sectionContacts = document.getElementById("contacts");

function toContacts(element) {
    window.scroll({
        behavior: "smooth",
        left: 0,
        top: element.offsetTop,
    });
}

orderButtons.forEach((orderButton) => {
    orderButton.addEventListener("click", () => {
        toContacts(sectionContacts);
    });
});

//ФУНКЦИОНАЛ СЕЛЕКТА СЕКЦИИ CONTACTS

const selectCity = document.querySelector(".select__city-name");
selectCity.addEventListener("click", function() {
    selectCity.classList.toggle("opened");
});

const selectCards = document.querySelectorAll('.select__city-content');

const selectOptions = document.querySelectorAll('.select__city-options');

selectOptions.forEach((select) => {

    select.addEventListener('click', (event) => {
        const currentSelectOption = event.target;
        const dataCity = currentSelectOption.dataset.city;

        const currentCard = document.querySelector(
            `.select__city-content[data-city='${dataCity}']`
        );

        const cardOpened = document.querySelector(".select__city-content.opened");
        if (cardOpened) {
          cardOpened.classList.remove('opened');
        }
       
        selectCity.classList.remove("opened");
        currentCard.classList.add("opened");


    })
})
