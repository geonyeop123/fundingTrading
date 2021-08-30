"use strict";
const upbitPrice = document.querySelector("#upbitPrice");
const upbitInput = document.querySelector("#upbitInput");
const upbitValue = document.querySelector("#upbitValue");
const binancePrice = document.querySelector("#binancePrice");
const binanceInput = document.querySelector("#binanceInput");
const binanceValue = document.querySelector("#binanceValue");

const upbitSession = "upbit";
const binanceSession = "binance";
let upbitSessionFlag =
  localStorage.getItem(upbitSession) != null ? true : false;
let binanceSessionFlag =
  localStorage.getItem(binanceSession) != null ? true : false;
let upbit = 0;
let upbitAmount = 0;
let binance = 0;
let binanceAmount = 0;

function getPrice() {
  const request = new XMLHttpRequest();
  const url = "https://api.upbit.com/v1/ticker?markets=KRW-XRP";
  request.open("GET", url, false);
  request.send();
  var obj = JSON.parse(request.responseText);
  upbit = obj[0].trade_price;
  upbitPrice.textContent = upbit.toLocaleString() + "₩";
  if (upbitSessionFlag) calcuValue(true);
  if (binanceSessionFlag) calcuValue(true);
}

function calcuValue(type) {
  if (type) {
    upbitAmount = upbitInput.value;
    upbitValue.textContent = (upbitAmount * upbit).toLocaleString() + "₩";
  } else {
    binanceAmount = binanceInput.value;
    binanceValue.textContent = (binanceAmount * binance).toLocaleString() + "₩";
  }
  saveSession(type);
}

function saveSession(type) {
  let coin = null;
  if (type) {
    localStorage.setItem(upbitSession, upbitAmount);
    upbitSessionFlag = true;
    coin = localStorage.getItem(upbitSession);
  } else {
    localStorage.setItem(binanceSession, binanceAmount);
    binanceSessionFlag = true;
    coin = localStorage.getItem(binanceSession);
  }
}

function init() {
  if (upbitSessionFlag) {
    upbitInput.value = parseInt(localStorage.getItem(upbitSession));
    calcuValue(true);
  }
  if (binanceSessionFlag) {
    binanceInput.value = localStorage.getItem(binanceSession);
    calcuValue(false);
  }
}
init();
setInterval(getPrice, 1000);
