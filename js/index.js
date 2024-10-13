"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // tabs
    const tabHeaders = document.querySelectorAll(".tabheader__item");    
    const tabHeadersParent = document.querySelector(".tabheader__items");    
    const tabContents = document.querySelectorAll(".tabcontent");  
    
    function hideContent() {
        tabContents.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show");
        })
        tabHeaders.forEach(item => {
            item.classList.remove("tabheader__item_active");
        })
    }

    function showContent(i = 0) {
        tabContents[i].classList.add("show");
        tabContents[i].classList.remove("hide");
        tabHeaders[i].classList.add("tabheader__item_active");
    }

    hideContent();
    showContent();

    tabHeadersParent.addEventListener("click", (e) => {
        if(e.target && e.target.matches(".tabheader__item")) {
            tabHeaders.forEach((item, index) => {
                if(e.target === item) {
                    hideContent();
                    showContent(index);
                }
            })
        }
    })

    // timer
    const deadline = Date.parse("2024-10-29");
    const setZero = n => n >= 0 && n < 10 ? `0${n}` : n;
    
    function getLeftTime(endTime) {
        let todayDate = Date.now();
        let diff = deadline - todayDate;
        let days, hours, minutes, seconds;

        if(diff <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } 
        else {
            days = Math.floor((diff / 1000 / 60 / 60 / 24));
            hours = Math.floor((diff / 1000 / 60 / 60) % 24);
            minutes = Math.floor((diff / 1000 / 60) % 60);
            seconds = Math.floor((diff / 1000) % 60);
        }

        return {diff, days, hours, minutes, seconds}
    }   

    function setTimer(endTime) {
        const daysElem = document.querySelector("#days");
        const hoursElem = document.querySelector("#hours");
        const minutesElem = document.querySelector("#minutes");
        const secondsElem = document.querySelector("#seconds");

        const timerID = setInterval(updateTimer, 1000);
        
        function updateTimer() {
            const {diff, days, hours, minutes, seconds} = getLeftTime(endTime);

            // console.log(daysElem.textContent);
            daysElem.textContent = setZero(days);
            hoursElem.textContent = setZero(hours);
            minutesElem.textContent = setZero(minutes);
            secondsElem.textContent = setZero(seconds);

            if(diff <= 0) {
                clearInterval(timerID);
            }
        }        
    }

    setTimer(deadline);

    // modal
    const modalOpenTriggers = document.querySelectorAll("[data-modal-open]");
    const modalCloseTrigger = document.querySelector("[data-modal-close]");
    const modal = document.querySelector(".modal");
    
    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflowY = "hidden";
        clearTimeout(modalTimerID);
    }

    function hideModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflowY = "auto";
    }

    modalOpenTriggers.forEach(btn => btn.addEventListener("click", showModal));
    
    modalCloseTrigger.addEventListener("click", hideModal);

    modal.addEventListener("click", (e) => {
        if(e.target && e.target === modal) hideModal();
    })

    window.addEventListener("keydown", (e) => {
        if((e.key === "Escape" || e.key === "Backspace") && modal.matches(".show")) hideModal();
    });

    const modalTimerID = setTimeout(showModal, 3000);

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            removeEventListener("scroll", showModalByScroll);
        }
    }
    
    window.addEventListener("scroll", showModalByScroll);

    // Menu 
    const menuItems = document.querySelectorAll('.menu__items');
    const parentItem = document.querySelector(".menu__field .container");
    class Menu {
        constructor(img, title, description, price) {
            this.img = img;
            this.title = title;
            this.description = description;
            this.price = price;
        }
        showMenu() {
            const element = document.createElement("div");
            if(menuItems.length === 0) element.classList.add("menu__item");
            element.innerHTML = `
                <img src=${this.img} alt="poster"/>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.description}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                        <span>${this.price}</span> грн/день
                    </div>
                </div>
            `;
           parentItem.append(element);
           
        }
    }

    let menu1 = new Menu(
    "../img/tabs/vegy.jpg",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    550);

    let menu2 = new Menu(
    "../img/tabs/elite.jpg",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    210);

    let menu3 = new Menu(
    "../img/tabs/post.jpg",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    430);

    menu1.showMenu();
    menu2.showMenu();
    menu3.showMenu();
});
