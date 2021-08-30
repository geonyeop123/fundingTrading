"use strict";
const upbitPrice = document.querySelector("#upbitPrice");
console.log(upbitPrice);
const request = new XMLHttpRequest();
const url = "https://api.upbit.com/v1/ticker?markets=KRW-XRP";
function getPrice() {
  request.open("GET", url, false);
  request.send();
  var obj = JSON.parse(request.responseText);
  const price = obj[0].trade_price;
  console.log(price);
  upbitPrice.textContent = price.toLocaleString() + "₩";
}

setInterval(getPrice, 1000);
getPrice();
