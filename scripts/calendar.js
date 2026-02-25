/**
 * @fileoverview provides basic functionality to the calendar
 * @author Jonas Neumann
 * @version 0.0.1
 * @date 2026-02-23
 * 
 * @license MIT
 */


const elements = {
    todayWeekdayAndDate: document.getElementById("today-weekday-and-date"),
    todayDayInMonth: document.getElementById("today-day-in-month"),
    nowMsUtc: document.getElementById("now-ms-utc"),
    listCurrentWeekdays: document.getElementsByName("current-weekday"),
    numberOfWeekday: document.getElementById("number-of-weekday"),
    currentMonth: document.getElementById("current-month"),
    primeOrNot: document.getElementById("prime-or-not"),
    fullDate: document.getElementById("full-date"),
    body: document.getElementById("holds-background")
}

const today = new Date(Date.now());

function setToday() {
    elements.nowMsUtc.innerHTML = today.getTime().toString();
    elements.todayDayInMonth.innerHTML = today.getDate().toString();
    elements.primeOrNot.innerHTML = isPrime(today.getDate()) ? "eine" : "keine";
    elements.listCurrentWeekdays.forEach((item) => {
        item.innerHTML = today.toLocaleString('de-de', { weekday: 'long' });
    })
    elements.fullDate.innerHTML = today.toLocaleString('de-de', { year: 'numeric', month: '2-digit', day: '2-digit' });
    elements.currentMonth.innerHTML = today.toLocaleString('de-de', { month: 'long' });
    elements.numberOfWeekday.innerHTML = Math.floor(today.getDate() / 7).toString();
}

function formatToWeekdayAndDate(date) {
    let output = "ein schöner Tag";
    if (date instanceof Date) {
        let formattedDate = "";
    }

    return output;
}

function isPrime(dateNumber) {
    return (dateNumber in [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]);
}

function setCurrentWeekday() {
    elements.listCurrentWeekdays.forEach((item) => {
        item.innerHTML = today.toLocaleString('en-us', { weekday: 'long' })
    })
}

function calcNumberOfWeekdayInMonth() {
    let result = Math.floor(today.getDate() / 7);
    return result in [1,2,3,4,5] ? result.toString() : '1';
}

function changeBackgrundColor() {
    //elements.body.setAttribute("class", "body-green");
}

setToday();
changeBackgrundColor();