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
const ustdValue = document.querySelector("#ustd");
const sellBinanceInput = document.querySelector("#sellBinanceInput");
const sellUpbitInput = document.querySelector("#sellUpbitInput");
const buyBinanceInput = document.querySelector("#buyBinanceInput");
const expectationValue = document.querySelector("#expectationValue");
const upbitPriceTimerTitle = document.querySelector("#upbitPriceTimer");
const binancePriceTimerTitle = document.querySelector("#binancePriceTimer");
const binanceDalValue = document.querySelector("#binanceDalValue");

const upbitSession = "upbit";
const binanceSession = "binance";
const binancePriceSession = "binancePrice";
const upbitDregsSession = "upbitDregs";
const binanceDregsSession = "binanceDregs";
const buyTotalSession = "buyTotal";
const ustdSession = "ustd";
const sellBinanceSession = "sellBinance";
const sellUpbitSession = "sellUpbit";
const buyBinanceSession = "buyBinance";

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
let ustd = 0;
let sellBinance = 0;
let sellUpbit = 0;
let buyBinance = 0;
let expectation = 0;
let binanceBenefit = 0;
let leverage = 2;
let sellTotal = 0;
let upbitSellTotal = 0;
let upbitTimer = 15;
let binanceTimer = 15;
let ustdTImer = 60;
let symbol;

function getPrice() {
  fetch("https://api.upbit.com/v1/ticker?markets=KRW-BTC")
    .then((response) => response.json())
    .then((data) => {
      upbit = data[0].trade_price;
    });
  calcuValue();
  upbitPrice.textContent = upbit.toLocaleString() + "₩";
  binancePrice.textContent = parseFloat(binance).toLocaleString() + "$";
  currentTotal = upbitTotal + binanceTotal;
  currentValue.textContent = currentTotal.toLocaleString() + "₩";
  benefitTotal = Math.floor(currentTotal - buyTotal);
  symbol = "+";
  if (benefitTotal < 0) symbol = "";
  benefit.textContent = symbol + benefitTotal.toLocaleString() + "₩";
  ustdValue.textContent = ustd.toLocaleString() + "₩";
  console.log("getPrice");
}

function calcuValue() {
  upbitAmount = upbitInput.value;
  upbitDregs = parseInt(upbitDregsInput.value);
  upbitTotal = upbitAmount * upbit + upbitDregs;
  upbitValue.textContent = upbitTotal.toLocaleString() + "₩";
  binanceAmount = binanceInput.value;
  binanceDregs = parseFloat(binanceDregsInput.value);
  sellTotal =
    (binanceAmount * (parseFloat(sellBinance) * ustd)) / leverage +
    binanceDregs * ustd;
  upbitSellTotal = upbitAmount * parseInt(sellUpbit) + upbitDregs;
  binanceTotal = sellTotal - binanceBenefit;
  binanceValue.textContent = Math.round(binanceTotal).toLocaleString() + "₩";
  buyTotal = sellTotal + upbitSellTotal;
  buyValue.textContent = parseInt(buyTotal).toLocaleString() + "₩";
  sellBinance = parseFloat(sellBinanceInput.value).toFixed(4);
  sellUpbit = parseInt(sellUpbitInput.value);
  buyBinance = parseFloat(buyBinanceInput.value).toFixed(4);
  sellBinanceInput.value = sellBinance;
  sellUpbitInput.value = sellUpbit;
  buyBinanceInput.value = buyBinance;
  binanceBenefit =
    binanceAmount * (binance * ustd) -
    binanceAmount * (parseFloat(sellBinance) * ustd);
  binanceDalValue.textContent = (binanceTotal / ustd).toFixed(4) + "$";
  saveSession();
  upbitTimer = 10;
  binanceTimer = 10;
}

function saveSession() {
  localStorage.setItem(upbitSession, upbitAmount);
  localStorage.setItem(binanceSession, binanceAmount);
  localStorage.setItem(upbitDregsSession, upbitDregs);
  localStorage.setItem(binanceDregsSession, binanceDregs);
  localStorage.setItem(sellBinanceSession, sellBinance);
  localStorage.setItem(sellUpbitSession, sellUpbit);
  localStorage.setItem(buyBinanceSession, buyBinance);
}

function init() {
  upbitInput.value = localStorage.getItem(upbitSession);
  binanceInput.value = localStorage.getItem(binanceSession);
  upbitDregsInput.value = localStorage.getItem(upbitDregsSession);
  binanceDregsInput.value = localStorage.getItem(binanceDregsSession);
  sellBinanceInput.value = localStorage.getItem(sellBinanceSession);
  sellUpbitInput.value = localStorage.getItem(sellUpbitSession);
  buyBinanceInput.value = localStorage.getItem(buyBinanceSession);
  ustd = parseInt(localStorage.getItem(ustdSession));
  if (isNaN(ustd)) getUstd();
  binance = parseFloat(localStorage.getItem(binancePriceSession));
  if (isNaN(binance)) getBinance();
  getPrice();
  calcuValue();
}

function getUstd() {
  fetch("https://exchange.jaeheon.kr:23490/query/USDKRW")
    .then((response) => response.json())
    .then((data) => {
      ustd = data.USDKRW[0];
      localStorage.setItem(ustdSession, ustd);
      console.log("getUstd");
    });
}

function getBinance() {
  fetch("https://api.binance.com/api/v1/ticker/24hr")
    .then((response) => response.json())
    .then((data) => {
      // binance = data[637].askPrice;
      binance = parseFloat(data[11].askPrice) + parseFloat(buyBinance);
      localStorage.setItem(binancePriceSession, binance);
      console.log("getBinance");
    });
}

init();
setInterval(getUstd, 600000);
setInterval(() => {
  getBinance();
  getPrice();
}, 10000);

function getTimer() {
  upbitTimer--;
  binanceTimer--;
  upbitPriceTimerTitle.textContent = upbitTimer;
  binancePriceTimerTitle.textContent = binanceTimer;
  symbol = "+";
  if (benefitTotal < 0) symbol = "";
  let gp = (((upbit - binance * ustd) / upbit) * 100).toFixed(2);
  document.title =
    gp + "　　" + symbol + benefitTotal.toLocaleString() + "　　" + upbitTimer;
}

setInterval(() => {
  getTimer();
}, 1000);
