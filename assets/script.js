// Assignment code here
var criteria = {
  inclLower: undefined, inclUpper: undefined, inclNum: undefined, inclSpec: undefined, length: undefined,
  updateCrit: function(criterion, value) {
    if(criterion == "upper"){
      this.inclUpper = value;
    }else if(criterion == "lower"){
      this.inclLower = value;
    }else if(criterion == "num"){
      this.inclNum = value;
    }else if(criterion == "spec"){
      this.inclSpec = value;
    }else if(criterion == "length"){
      this.length = value;
    }
  }
};

//Reference for modal confirm dialog box
//https://jqueryui.com/dialog/#modal-confirmation
function generatePassword()
{
  //creating and defining html elements for dialog box
  var dialogEl = document.createElement("div");
  var formEl = document.createElement("form");
  var lengthLabelEl = document.createElement("label");
  var lengthInputEl = document.createElement("input");
  var lowerLabelEl = document.createElement("label");
  var lowerCheckboxEl = document.createElement("input");
  var upperLabelEl = document.createElement("label");
  var upperCheckboxEl = document.createElement("input");
  var numLabelEl = document.createElement("label");
  var numCheckboxEl = document.createElement("input");
  var specLabelEl = document.createElement("label");
  var specCheckboxEl = document.createElement("input");

  dialogEl.setAttribute("id","dialog-form");
  dialogEl.setAttribute("class", "modal-prompt");
  
  lengthLabelEl.setAttribute("for","length");
  lengthLabelEl.textContent = "Enter a number of characters between 8 and 128: ";
  lengthInputEl.setAttribute("type","text");
  lengthInputEl.setAttribute("id","length");

  lowerLabelEl.setAttribute("for","lower");
  lowerLabelEl.textContent = "Include Lowercase Letters ";
  lowerCheckboxEl.setAttribute("id","lower");
  lowerCheckboxEl.setAttribute("type","checkbox");

  upperLabelEl.setAttribute("for","upper");
  upperLabelEl.textContent = "Include Uppercase Letters ";
  upperCheckboxEl.setAttribute("id","upper");
  upperCheckboxEl.setAttribute("type","checkbox");

  numLabelEl.setAttribute("for","num");
  numLabelEl.textContent = "Include Numbers ";
  numCheckboxEl.setAttribute("id","num");
  numCheckboxEl.setAttribute("type","checkbox");

  specLabelEl.setAttribute("for","spec");
  specLabelEl.textContent = "Include Special Characters ";
  specCheckboxEl.setAttribute("id","spec");
  specCheckboxEl.setAttribute("type","checkbox");

  document.body.appendChild(dialogEl);
  dialogEl.appendChild(formEl);
  formEl.appendChild(lengthLabelEl);
  formEl.appendChild(lengthInputEl);
  formEl.appendChild(lowerLabelEl);
  formEl.appendChild(lowerCheckboxEl);
  formEl.appendChild(upperLabelEl);
  formEl.appendChild(upperCheckboxEl);
  formEl.appendChild(numLabelEl);
  formEl.appendChild(numCheckboxEl);
  formEl.appendChild(specLabelEl);
  formEl.appendChild(specCheckboxEl);

  $(function () {
    $("#dialog-form").dialog({
      resizable: false,
      modal: true,
      buttons: {
        "Submit": function() {
          console.log("Form Submitted");
          console.log(document.getElementById("lower").checked);
          criteria.updateCrit(lower, document.getElementById("lower").checked);
          criteria.updateCrit(upper, document.getElementById("upper").checked);
          criteria.updateCrit(num, document.getElementById("num").checked);
          criteria.updateCrit(spec, document.getElementById("spec").checked);
          criteria.updateCrit(length, document.getElementById("length").value);
          console.log(JSON.stringify(criteria));
          $(this).dialog("close");
        }
      }
    });
  });
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
