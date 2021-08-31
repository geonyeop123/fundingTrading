"use strict";
const upbitPrice = document.querySelector("#upbitPrice");
const upbitInput = document.querySelector("#upbitInput");
const upbitValue = document.querySelector("#upbitValue");
const binancePrice = document.querySelector("#binancePrice");
const binanceInput = document.querySelector("#binanceInput");
const binanceValue = document.querySelector("#binanceValue");
const currentValue = document.querySelector("#currentValue");
const benefit = document.querySelector("#benefit");
const upbitDregsInput = document.querySelector("#upbitDregsInput");
const binanceDregsInput = document.querySelector("#binanceDregsInput");
const buyTotalInput = document.querySelector("#buyInput");
const buyValue = document.querySelector("#buyValue");

const upbitSession = "upbit";
const binanceSession = "binance";
const upbitDregsSession = "upbitDregs";
const binanceDregsSession = "binanceDregs";
const buyTotalSession = "buyTotal";
const binanceCurrent = "binanceCurrent";

let upbitSessionFlag = true;
let binanceSessionFlag = true;
let upbitDregsSessionFlag = true;
let binanceDregsSessionFlag = true;
let upbit = 0;
let upbitAmount = 0;
let upbitTotal = 0;
let binance = 0;
let binanceAmount = 0;
let binanceTotal = 0;
let benefitTotal = 0;
let buyTotal = 0;
let currentTotal = 0;
let upbitDregs = 0;
let binanceDregs = 0;

function getPrice() {
  fetch("https://api.upbit.com/v1/ticker?markets=KRW-XRP")
    .then((response) => response.json())
    .then((data) => {
      upbit = data[0].trade_price;
    });
  upbitPrice.textContent = upbit.toLocaleString() + "₩";
  binancePrice.textContent = binance.toLocaleString() + "₩";
  calcuValue();
  currentTotal = upbitTotal + binanceTotal;
  currentValue.textContent = currentTotal.toLocaleString() + "₩";
  benefitTotal = currentTotal - buyTotal;
  let symbol = "+";
  if (benefitTotal < 0) symbol = "";
  benefit.textContent = symbol + benefitTotal.toLocaleString() + "₩";
  document.title =
    symbol + benefitTotal.toLocaleString() + "  " + currentValue.textContent;
}

function calcuValue() {
  upbitAmount = upbitInput.value;
  upbitDregs = parseInt(upbitDregsInput.value);
  upbitTotal = upbitAmount * upbit + upbitDregs;
  upbitValue.textContent = upbitTotal.toLocaleString() + "₩";
  binanceAmount = binanceInput.value;
  binanceDregs = parseInt(binanceDregsInput.value);
  binanceTotal = binanceAmount * binance + binanceDregs;
  binanceValue.textContent = binanceTotal.toLocaleString() + "₩";
  buyTotal = buyTotalInput.value;
  buyValue.textContent = parseInt(buyTotal).toLocaleString() + "₩";
  saveSession();
}

function saveSession() {
  localStorage.setItem(upbitSession, upbitAmount);
  localStorage.setItem(binanceSession, binanceAmount);
  localStorage.setItem(upbitDregsSession, upbitDregs);
  localStorage.setItem(binanceDregsSession, binanceDregs);
  localStorage.setItem(buyTotalSession, buyTotal);
}

function init() {
  upbitInput.value = localStorage.getItem(upbitSession);
  binanceInput.value = localStorage.getItem(binanceSession);
  upbitDregsInput.value = localStorage.getItem(upbitDregsSession);
  binanceDregsInput.value = localStorage.getItem(binanceDregsSession);
  buyTotalInput.value = localStorage.getItem(buyTotalSession);
  binance = parseInt(localStorage.getItem(binanceCurrent));
  if (binance == null) getBinance();
  calcuValue();
}
init();
setInterval(getPrice, 1000);

function getBinance() {
  fetch("https://exchange.jaeheon.kr:23490/query/USDKRW")
    .then((response) => response.json())
    .then((data) => {
      binance = data.USDKRW[0];
      localStorage.setItem(binanceCurrent, binance);
      console.log("getBinance");
    });
}

setInterval(getBinance, 600000);
