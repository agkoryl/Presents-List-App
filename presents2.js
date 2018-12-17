"use strict";

var newReceiver = (function() {
  function newReceiver(name, ocassion, present, ifBought, price) {
    return {
      name: name,
      ocassion: ocassion,
      present: present,
      ifBought: ifBought,
      price: price
    };
  }
})();

function renderTableHedings() {
    let contentDOM =
      "<th scope='col'> Index </th>\n\
    <th scope='col'> Name </th>\n\
    <th scope='col'> Occasion </th>\n\
    <th scope='col'> Present </th>\n\
    <th scope='col'> Bought </th>\n\
    <th scope='col'> Price </th>\n\
    <th scope='col'>  </th>\n";
  
    const keysDOM = document.getElementById("table-keys");
  
    keysDOM.innerHTML = contentDOM;
  }

  renderTableHedings();