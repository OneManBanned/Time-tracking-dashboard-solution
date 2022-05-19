
const toggleButtons = document.querySelectorAll('.ellipsis')
const titles = document.querySelectorAll('.title')
const daily = document.querySelectorAll('.daily')
const previousDaily = document.querySelectorAll('.previous-daily')
const weekly = document.querySelectorAll('.weekly')
const previousWeekly = document.querySelectorAll('.previous-weekly')
const monthly = document.querySelectorAll('.monthly')
const previousMonthly = document.querySelectorAll('.previous-monthly')

/*DAILY WEEKLY MONTHLY BUTTONS*/

document.getElementById('daily').addEventListener('click', getDaily);
document.getElementById('weekly').addEventListener('click', getWeekly);
document.getElementById('monthly').addEventListener('click', getMonthly);

function getDaily() {
    document.querySelector('#daily').classList.add('active')
    document.querySelector('#weekly').classList.remove('active')
    document.querySelector('#monthly').classList.remove('active')
    fetch('data.json')
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i <= data.length; i++) {
                daily[i].innerHTML = `${data[i].timeframes.daily.current}hrs`
                previousDaily[i].innerHTML = `Yesterday - ${data[i].timeframes.daily.previous}hrs`
            }
        })
        .catch((err) => console.log(err))
}

function getWeekly() {
    document.querySelector('#daily').classList.remove('active')
    document.querySelector('#weekly').classList.add('active')
    document.querySelector('#monthly').classList.remove('active')
    fetch('data.json')
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i <= data.length; i++) {
                weekly[i].innerHTML = `${data[i].timeframes.weekly.current}hrs`
                previousWeekly[i].innerHTML = `Last Week - ${data[i].timeframes.weekly.previous}hrs`
            }
        })
        .catch((err) => console.log(err))
}

function getMonthly() {
    document.querySelector('#daily').classList.remove('active')
    document.querySelector('#weekly').classList.remove('active')
    document.querySelector('#monthly').classList.add('active')
    fetch('data.json')
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i <= data.length; i++) {
                monthly[i].innerHTML = `${data[i].timeframes.monthly.current}hrs`
                previousMonthly[i].innerHTML = `Last Month - ${data[i].timeframes.monthly.previous}hrs`
            }
        })
        .catch((err) => console.log(err))
}

/*ONLOAD DEFAULT (DAILY) */

window.addEventListener('load', () => {
    document.querySelector('#weekly').classList.add('active')
    fetch('data.json')
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                titles[i].innerHTML = data[i].title
                weekly[i].innerHTML = `${data[i].timeframes.weekly.current}hrs`
                previousWeekly[i].innerHTML = `Last Week - ${data[i].timeframes.weekly.previous}hrs`
            }
        })
        .catch((err) => console.log(err))
})

/*TOGGLE BUTTON (DAILY/WEEKLY/MONTHLY)*/

for (let b = 0; b < toggleButtons.length; b++) {
    toggleButtons[b].addEventListener('click', () => {
        fetch('data.json')
            .then((res) => res.json())
            .then((data) => {
                if (daily[b].innerHTML === `${data[b].timeframes.daily.current}hrs`) {
                    weekly[b].innerHTML = `${data[b].timeframes.weekly.current}hrs`
                    previousWeekly[b].innerHTML = `Last Week - ${data[b].timeframes.weekly.previous}hrs`
                } else if (weekly[b].innerHTML === `${data[b].timeframes.weekly.current}hrs`) {
                    monthly[b].innerHTML = `${data[b].timeframes.monthly.current}hrs`
                    previousMonthly[b].innerHTML = `Last Month - ${data[b].timeframes.monthly.previous}hrs`
                } else if (monthly[b].innerHTML === `${data[b].timeframes.monthly.current}hrs`) {
                    daily[b].innerHTML = `${data[b].timeframes.daily.current}hrs`
                    previousDaily[b].innerHTML = `Yesterday - ${data[b].timeframes.daily.previous}hrs`
                }
            })
    })
}

