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

            console.log(daysElem.textContent);
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
});
