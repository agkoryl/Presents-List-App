"use strict";

function createReceiver(name, ocassion, present, ifBought, price) {
  return {
    name: name,
    ocassion: ocassion,
    present: present,
    ifBought: ifBought,
    price: price
  };
}


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

function renderReceivers(receiversArray) {
  const employeesDOM = document.getElementById("table-data");

  let contentDOM2 = "";

  receiversArray.forEach(function(receiver) {
    contentDOM2 +=
      "<tr>\n<th scope='row'>" +
      (receiversArray.indexOf(receiver) + 1) +
      "</th>";
    console.log(receiver);
    const employeeValues = Object.values(receiver);

    employeeValues.forEach(function(value) {
      if (value === true) {
        contentDOM2 += "<td><i class='fas fa-check'></i></td>";
      } else if (value === false) {
        contentDOM2 += "<td><i class='fas fa-times'></i></td>";
      } else {
        contentDOM2 += "<td>" + value + "</td>";
      }
    });

    contentDOM2 +=
      "<td>\
      <button type='button' class='btn btn-outline-danger' onclick=\"removeReceiver('" +
      (receiversArray.indexOf(receiver)) +
      "')\"><i class='fas fa-user-times'></i>\
      </button>\
      <button type='button' class='btn btn-outline-dark m-1' onclick=\"editReceiver('" +
      (receiversArray.indexOf(receiver))+
      "')\" data-toggle='modal' data-target='#edit-receiver-form'><i class='fas fa-user-edit'></i></button>\
      </td>";

    contentDOM2 += "</tr>\n";
  });

  employeesDOM.innerHTML = contentDOM2;
  document.querySelector("#sum").innerHTML = pricesSum();
}

function refresh() {
  renderReceivers(retrieveEmployeesFromLocalStorage());
}


function addANewPerson() {
  const name = document.querySelector("#name").value;
  const ocassion = document.querySelector("#ocassion").value;
  const present = document.querySelector("#present").value;
  const ifBought = document.querySelector("#is-bought").checked;
  const price = document.querySelector("#price").value;

  if (name) {
    let receivers = retrieveEmployeesFromLocalStorage();
    receivers.push(createReceiver(name, ocassion, present, ifBought, price));
    updateReceiversInLocalStorage(receivers);
  } else {
    alert("Please enter necessary information");
  }
}

function updateReceiversInLocalStorage(receivers) {
  window.localStorage.setItem("receivers", JSON.stringify(receivers));
  renderReceivers(receivers);
}

function retrieveEmployeesFromLocalStorage() {
  let retrievedReceivers = localStorage.getItem("receivers");
  console.log(retrievedReceivers);
  if (!retrievedReceivers || retrievedReceivers === "[]") {
    let receivers = [];
    return receivers;
  } else {
    return JSON.parse(retrievedReceivers);
  }
}

function pricesSum() {
  let receivers = retrieveEmployeesFromLocalStorage();
  if (receivers.length === 0) {
    return 0;
  }
  return receivers
    .map(receiver => parseInt(receiver.price))
    .reduce((value, sum) => (value += sum));
}

let receivers = retrieveEmployeesFromLocalStorage();

renderTableHedings();
renderReceivers(receivers);

const refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener("click", refresh);

const addButton = document.querySelector("#add-receiver");
addButton.addEventListener("click", addANewPerson);

function insertExistingValues(name, ocassion, present, ifBought, price) {
  document.querySelector("#name-edit").setAttribute("value", name);
  document.querySelector("#ocassion-edit").setAttribute("value", ocassion);
  document.querySelector("#present-edit").setAttribute("value", present);
  document.querySelector("#is-bought-edit").checked = ifBought;
  document.querySelector("#price-edit").setAttribute("value", price);
}

function editReceiver(index) {
  let receivers = retrieveEmployeesFromLocalStorage();
  let receiver = receivers[index];
  insertExistingValues(
    receiver.name,
    receiver.ocassion,
    receiver.present,
    receiver.ifBought,
    receiver.price
  );

  //Nie działający edit a person
  
  document
    .querySelector("#update-receiver")
    .addEventListener("click", ()=> updateAPerson(index));
}
function updateAPerson(index) {
    const name = document.querySelector("#name-edit").value;
    const ocassion = document.querySelector("#ocassion-edit").value;
    const present = document.querySelector("#present-edit").value;
    const ifBought = document.querySelector("#is-bought-edit").checked;
    const price = document.querySelector("#price-edit").value;
  
    if (name) {
      let receivers = retrieveEmployeesFromLocalStorage();
      console.log(receivers);
      receivers[index] = createReceiver(
        name,
        ocassion,
        present,
        ifBought,
        price
      );
      console.log(receivers);
      updateReceiversInLocalStorage(receivers);
      
    } else {
      alert("Please enter necessary information");
    }
    

    //Dodać usuwanie event listenera
   /* function removeListener(updateAPerson) {
        document.querySelector("#update-receiver")
        .removeEventListener("click", ()=>updateAPerson(index));
    }
  }*/

function removeReceiver(index) {
    let receivers = retrieveEmployeesFromLocalStorage();
    receivers.splice(index, 1);
    updateReceiversInLocalStorage(receivers);
  }
