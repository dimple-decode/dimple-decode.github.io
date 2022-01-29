const scriptURL =
  "https://script.google.com/macros/s/AKfycbxyHvNtWYoshlVv63y1rMQqbiU937yUaBJL9lm2NaW2GukkRIY5ReoHcvyjDJomDuDisQ/exec";

const form = document.forms["google-sheet"];
const productList = getItemDetails();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    return false;
  }
  showLoader();
  fetch(scriptURL, { method: "post", body: new FormData(form) })
    .then((response) => {
    
        form.reset();
        removeLoader();
        alert("Details submitted successfully.");
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
   
  var productNameCombo = document.getElementById("productName");
  
  var productNameList = [...new Set( productList.map(obj => obj.productName)) ];

  addValuesToDropDown(productNameCombo, productNameList);
  

});

function addValuesToDropDown(comboxBoxId, list){
  
  var opt = document.createElement('option');
  opt.innerHTML = "Select";
  comboxBoxId.appendChild(opt);
  list.forEach(x=>{
    var opt = document.createElement('option');
    opt.value = x;
    opt.innerHTML = x;
    comboxBoxId.appendChild(opt);
});

}

function onProductNameChange(){
  var selectedProduct = document.getElementById("productName").value;
 
  var pkgList = [...new Set( productList.filter(x=>x.productName === selectedProduct).map(obj => obj.package)) ];
  var pkgComobo = document.getElementById("pkg");
  pkgComobo.innerText=null ;
  addValuesToDropDown(pkgComobo, pkgList);
}

function onPkgChange(){
  var pktsPerCarton = document.getElementById("pktsPerCarton");
  var selectedProduct = document.getElementById("productName").value;
  var pkg = document.getElementById("pkg").value;
  var pkgPerCartonList = [...new Set( productList.filter(x=>x.productName === selectedProduct && x.package === pkg).map(obj => obj)) ];
  
  //Set input field values
  const productCodeInput = document.getElementById("productCode");
  const pktsPerCartonInput = document.getElementById("pktsPerCarton");
  const barcodeInput = document.getElementById("barcode");

  productCodeInput.value = pkgPerCartonList[0].productCode;
  barcodeInput.value = pkgPerCartonList[0].barCode;
  pktsPerCartonInput.value = pkgPerCartonList[0].pkgPerCarton;
}

function showLoader() {
  $("#mainDiv").addClass("disabledForm");
  document.getElementById("loader").style.display = "block";
}

function removeLoader() {
  $("#mainDiv").removeClass("disabledForm");
  document.getElementById("loader").style.display = "none";
}


function getCurrentDate() {
  let date = new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
  return date;
}

function getItemDetails(){
    const products = [
        {productCode: 'MA2BRM100', productName: 'Mammas Biriyani Masala', barCode: '8908001863049', package:'100g', pkgPerCarton:'48'},
        {productCode: 'MA2BPP100', productName: 'Mammas Black Pepper Powder', barCode: '8908001863056', package:'100g', pkgPerCarton:'48'},
        {productCode: 'MA2CHM100', productName: 'Mammas Chana Masala', barCode: '8908001863063', package:'100g', pkgPerCarton:'48'},
        {productCode: 'MA2CHM100', productName: 'Mammas Chat Masala', barCode: '8908001863070', package:'100g', pkgPerCarton:'48'},
        {productCode: 'MA2CKM160', productName: 'Mammas Chicken Masala', barCode: '8908001862356', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2CKM1000', productName: 'Mammas Chicken Masala', barCode: '8908001863520', package:'1kg', pkgPerCarton:'12'},
        {productCode: 'MA2CHP160', productName: 'Mammas Chilly Powder', barCode: '8908001862387', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2CHP1000', productName: 'Mammas Chilly Powder', barCode: '8908001862646', package:'1kg', pkgPerCarton:'12'},
        {productCode: 'MA2COP160', productName: 'Mammas Coriander Powder', barCode: '8908001862370', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2COP1000', productName: 'Mammas Coriander Powder', barCode: '8908001862653', package:'1kg', pkgPerCarton:'12'},
        {productCode: 'MA2CUP160', productName: 'Mammas Curry Powder', barCode: '8908001862280', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2CUP1000', productName: 'Mammas Curry Powder', barCode: '8908001862738', package:'1kg', pkgPerCarton:'12'},
        {productCode: 'MA2EGM160', productName: 'Mammas Egg Masala', barCode: '8908001862769', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2FIM160', productName: 'Mammas Fish Masala', barCode: '8908001862479', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2FIM1000', productName: 'Mammas Fish Masala', barCode: '8908001863537', package:'1000g', pkgPerCarton:'12'},
        {productCode: 'MA2GAM100', productName: 'Mammas Garam Masala', barCode: '8908001863087', package:'100g', pkgPerCarton:'48'},
        {productCode: 'MA2MEM160', productName: 'Mammas Meat Masala', barCode: '8908001862363', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2MEM1000', productName: 'Mammas Meat Masala', barCode: '8908001863513', package:'1000g', pkgPerCarton:'12'},
        {productCode: 'MA2MUM160', productName: 'Mammas Mutton Masala', barCode: '8908001862967', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2MUM1000', productName: 'Mammas Mutton Masala', barCode: '8908001863506', package:'1000g', pkgPerCarton:'12'},
        {productCode: 'MA2SAP160', productName: 'Mammas Sambar Powder', barCode: '8908001862448', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2SAP1000', productName: 'Mammas Sambar Powder', barCode: '8908001863544', package:'1000g', pkgPerCarton:'12'},
        {productCode: 'MA2TUP160', productName: 'Mammas Turmeric Powder', barCode: '8908001862394', package:'160g', pkgPerCarton:'48'},
        {productCode: 'MA2TUP1000', productName: 'Mammas Turmeric Powder', barCode: '8908001862677', package:'1000g', pkgPerCarton:'12'},
        {productCode: 'MA2VEM100', productName: 'Mammas Vegetable Masala', barCode: '8908001863117', package:'100g', pkgPerCarton:'48'}
    

    ];

    return products;
}