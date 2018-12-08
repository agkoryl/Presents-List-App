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

  function removeReceiver(index) {
    let receivers = retrieveEmployeesFromLocalStorage();
    receivers.splice(index -1, 1);
    updateReceiversInLocalStorage(receivers);
    console.log("ble");
  }
  
  function renderTableHedings(receiversArray) {
    const keysDOM = document.getElementById("table-keys");

    const employeeKeys = Object.keys(receiversArray[0]);

    let contentDOM = "<th scope='col'> Index </th>\n";

    employeeKeys.forEach(function(employeeKey) {
      contentDOM += '<th scope="col">' + employeeKey + "</th>\n";
    });

    contentDOM += "<th scope='col'> Remove </th>\n";

    keysDOM.innerHTML = contentDOM;
  }

  function renderReceivers(receiversArray) {
    const employeesDOM = document.getElementById("table-data");

    let contentDOM2 = "";

    receiversArray.forEach(function(receiver) {
      contentDOM2 +=
        "<tr>\n<td>" + (receiversArray.indexOf(receiver) + 1) + "</td>";
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
          "<td><button onclick=\"removeReceiver('"+ (receiversArray.indexOf(receiver) + 1)+"')\"><i class='fas fa-user-times'></i></button></td>";

      contentDOM2 += "</tr>\n";
    });

    employeesDOM.innerHTML = contentDOM2;
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

    if (name && ocassion && present && price) {
      let receivers = retrieveEmployeesFromLocalStorage()
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
      receivers.push(createReceiver("Adrian", "Christmas", "Pillow", false, 67));
      return receivers;
    } else {
      return JSON.parse(retrievedReceivers);
    }
  }

  let receivers = retrieveEmployeesFromLocalStorage();

  renderTableHedings(receivers);
  renderReceivers(receivers);

  const refreshBtn = document.querySelector("#refresh");
  refreshBtn.addEventListener("click", refresh);

  const addButton = document.querySelector("#add-receiver");
  addButton.addEventListener("click", addANewPerson);

