document.addEventListener("DOMContentLoaded", initializeForm);

function initializeForm() {
  // Initialize form elements or event listeners here if needed
  console.log("Form Initialized");

  //1. Get and set a new Invoice Code to the InvoiceCode input field
  var newInvoiceCode = generateNewInvoiceCode();
  //2. Assign the generated code to invoice code text box
  document.getElementById("InvoiceCode").value = newInvoiceCode;

  //3. Store countries in an array for demo purpose in a array of object format
  storeCountriesInLocalStorage();

  //4.Bind countries to country dropdown
  bindCountriesToCountryDropdown();

  //5.bindEvents to text boxes like price, duty should allow only numbers
  bindEvents();

  //6. Register save button click
  saveInvoice();

  //7. Goback button click

  function generateNewInvoiceCode() {
    //TODO: Logic to generate new invoice code
    return "INV-001";
  }

  function storeCountriesInLocalStorage() {
    var countries = [
      { id: 1, code: "IND", name: "India" },
      { id: 2, code: "USA", name: "United States" },
      { id: 3, code: "UK", name: "United Kingdom" },
      { id: 4, code: "AUS", name: "Australia" },
    ];
    // Store countries in local storage
    localStorage.setItem("countries", JSON.stringify(countries));
  }

  function bindCountriesToCountryDropdown() {
    var countrySelect = document.getElementById("CountryOfRegion");
    var countries = JSON.parse(localStorage.getItem("countries"));
    let options = "";
    countries.forEach((element) => {
      options += `<option value="${element.id}">${element.name}</option>`;
    });
    countrySelect.innerHTML += options;
  }

  function bindEvents() {
    let priceEl = document.getElementById("Price");
    let dutyEl = document.getElementById("Duty");
    let countryEl = document.getElementById("CountryOfRegion");
    let totalPriceEl = document.getElementById("TotalPrice");
    let saveButtonEl = document.getElementById('SaveForm')

    priceEl.addEventListener("keydown", allowOnlyDecimalNumbers);
    dutyEl.addEventListener("keydown", allowOnlyDecimalNumbers);

    priceEl.addEventListener("keydown", calculateTotalPrice);
    dutyEl.addEventListener("keydown", calculateTotalPrice);
    priceEl.addEventListener("change", calculateTotalPrice);
    dutyEl.addEventListener("change", calculateTotalPrice);
    countryEl.addEventListener("change", calculateTotalPrice);

    saveButtonEl.addEventListener('click', saveInvoice);

    totalPriceEl.setAttribute("readonly", "readonly");
  }

  function allowOnlyDecimalNumbers(evt) {
    //if(event.key == '0')
    //allow only numbers from 0-9 of main key board & number pad
    //. (only 1 dot)
    //backspace, delete, arrow left, arrow right, tab, arrow down, arrow up
    //enter

    var charCode = evt.which ? evt.which : evt.keyCode;

    // Allow numbers (0-9)
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }

    // Allow a single decimal point
    if (charCode === 46 || charCode === 190) {
      // ASCII code for '.'
      // Check if the input already contains a decimal point
      if (evt.target.value.indexOf(".") === -1) {
        return true;
      }
    }

    // Allow backspace, delete, arrow keys, etc. (non-printable characters)
    if (charCode === 0 || charCode === 8) {
      // 0 for some browsers, 8 for backspace
      return true;
    }

    evt.preventDefault();

    //return false; // Block all other characters
  }

  function calculateTotalPrice(e) {
    let priceEl = document.getElementById("Price");
    let dutyEl = document.getElementById("Duty");
    let countryEl = document.getElementById("CountryOfRegion");
    let totalPriceEl = document.getElementById("TotalPrice");

    let selectedCountry = countryEl.value;

    if (selectedCountry == 1) {
      dutyEl.value = "0.00";
      document.getElementById("duty-div").style.display = "none";
    } else {
      document.getElementById("duty-div").style.display = "block";
    }

    let priceValue = Number(priceEl.value);
    let dutyValue = Number(dutyEl.value);

    totalPriceEl.value = isNaN(priceValue + dutyValue) ? 0 : (priceValue + dutyValue).toFixed(2);
  }

  function saveInvoice(){
    var invoiceObj = {
      invoiceCode:document.getElementById('InvoiceCode').value,
      invoiceName: '',
      manufacturingDate : '',
      expiryDate : '',
      
    }

  }
}
