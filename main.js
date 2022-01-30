const scriptURL =
  "https://script.google.com/macros/s/AKfycbyqknsKyi5E8PFP-QTRfsniSRf0m5bJQV9W0Yj5VfgpnFKH2VjsBWxBE7PhlilXQOvr/exec";

const exec1URL =
  "https://script.google.com/macros/s/AKfycbwty365Cpz3vtwcr-N-fE4yPO3IhSwq9roJN1mQuENapxBIK0gjxflUgsPVrcn4EcNgUQ/exec";
const exec2URL =
  "https://script.google.com/macros/s/AKfycbzbMA36PH15SprPWvIhdVcAvTrzGVemc4wdNmF2DX3A5xJiK6B0Av70bmW3vjC-SreNTw/exec";
const exec3URL =
  "https://script.google.com/macros/s/AKfycbwRjIEohkQb9v8tkMAKrC3ay6nLnHj0qbIl0b59tVch5F0pmDkmnJYbj9WGk2x-41bzCA/exec";
const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    return false;
  }
  showLoader();
  var name = document.getElementById("executiveName").value;
  name = name.trim().replace(/\s/g, "").toLowerCase();
  fetch(scriptURL, { method: "post", body: new FormData(form) })
    .then((response) => {
      if (name === "aboobakkar") {
        submitDetails(exec1URL, form);
      } else if (name === "noushad") {
        submitDetails(exec2URL, form);
      } else if (name === "shaheer") {
        submitDetails(exec3URL, form);
      } else {
        form.reset();
        removeLoader();
        alert("Details submitted successfully.");
      }
    })
    .catch((error) => {
      removeLoader();
      alert("Failed to submit the details.");
    });
});

$(document).ready(function () {
  let currentDate = getCurrentDate().toString();
  document.getElementById("dateLabel").innerHTML = "Date: " + currentDate;
  document.getElementById("Date").innerHTML = currentDate;
  // $(window).keydown(function (event) {
  //   if (event.keyCode == 13) {
  //     event.preventDefault();
  //     return false;
  //   }
  // });
});
function showLoader() {
  $("#mainDiv").addClass("disabledForm");
  document.getElementById("loader").style.display = "block";
}

function removeLoader() {
  $("#mainDiv").removeClass("disabledForm");
  document.getElementById("loader").style.display = "none";
}

function submitDetails(url, form) {
  fetch(url, { method: "post", body: new FormData(form) })
    .then((response) => {
      form.reset();
      removeLoader();
      alert("Details submitted successfully.");
    })
    .catch((error) => {
      removeLoader();
      alert("Failed to submit the details.");
    });
}

function getCurrentDate() {
  let date = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
  return date;
}
