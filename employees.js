(function() {
  'use strict';

  function createEmployee(firstName, lastName, age, sex, employed) {
  return {
    firstName: firstName,
    lastName: lastName,
    age: age,
    sex: sex,
    employed: employed
  };
}

function populateEmployees() {
  let employees = [];
  employees.push(createEmployee("John", "Doe", 31, "male", true));
  employees.push(createEmployee("Amelia", "Clark", 22, "female", true));
  employees.push(createEmployee("Jack", "Jones", 21, "male", false));
  employees.push(createEmployee("Olivia", "Wilde", 31, "female", true));
  employees.push(createEmployee("Kate", "Ryan", 45, "female", true));
  employees.push(createEmployee("Andrew", "Joe", 56, "male", false));
  return employees;
}

function renderKeys(employeesArray) {
  const keysDOM = document.getElementById("table-keys");

  const employeeKeys = Object.keys(employeesArray[0]);

  let contentDOM = "<th scope='col'> Index </th>\n";

  employeeKeys.forEach(function(employeeKey) {
    contentDOM += '<th scope="col">' + employeeKey + "</th>\n";
  });
  keysDOM.innerHTML = contentDOM;
}

function renderEmployees(employeesArray) {
  const employeesDOM = document.getElementById("table-data");

  let contentDOM2 = "";

  employeesArray.forEach(function(employee) {
    contentDOM2 +=
      "<tr>\n<td>" + (employeesArray.indexOf(employee) + 1) + "</td>";
    const employeeValues = Object.values(employee);

    employeeValues.forEach(function(value) {
      if (value === true) {
        contentDOM2 += "<td><i class='fas fa-check'></i></td>";
      } else if (value === false) {
        contentDOM2 += "<td><i class='fas fa-times'></i></td>";
      } else {
        contentDOM2 += "<td>" + value + "</td>";
      }
    });
    contentDOM2 += "</tr>\n";
  });

  employeesDOM.innerHTML = contentDOM2;
}

function filterWomen() {
  let women = employees.filter(function(employee) {
    return employee.sex === "female";
  });

  renderEmployees(women);
}

function filterMen() {
  let men = employees.filter(function(employee) {
    return employee.sex === "male";
  });

  renderEmployees(men);
}

function refresh() {
  renderEmployees(employees);
}

function addANewEmployee() {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const age = document.querySelector("#age").value;
  const sex = document.querySelector("#sex").value;
  const isEmployed = document.querySelector("#is-employed").checked;

  if (firstName && lastName && age && sex) {
    employees.push(createEmployee(firstName, lastName, age, sex, isEmployed));
    window.localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees(employees);
  } else {
    alert("Please enter necessary information");
  }
}

function retrieveEmployeesFromLocalStorage() {
  let retrievedEmployees = localStorage.getItem("employees");
  if (!retrievedEmployees) {
    return populateEmployees();
  } else {
    return JSON.parse(retrievedEmployees);
  }
}

let employees = retrieveEmployeesFromLocalStorage();
renderKeys(employees);
renderEmployees(employees);

const filterWomenBtn = document.querySelector("#filter-women");
filterWomenBtn.addEventListener("click", filterWomen);

const filterMenBtn = document.querySelector("#filter-men");
filterMenBtn.addEventListener("click", filterMen);

const refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener("click", refresh);

const addButton = document.querySelector("#add-employee");
addButton.addEventListener("click", addANewEmployee);

}());
