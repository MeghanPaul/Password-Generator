// Assignment code here
var lowercaseArr = "abcdefghijklmnopqrstuvwxyz";
var uppercaseArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numArr = "1234567890";
var specArr = "!#$%&,(),*+,-.:;<=>?@[]^_{}~";
var selectedCharsArr = "";

var firstGenerate = true;

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
  if(firstGenerate)
  {
    firstGenerate = false;
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

    formEl.setAttribute("id","form");
    
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
  }
  $(function () {
    $("#dialog-form").dialog({
      resizable: false,
      modal: true,
      position: { my: "center", at: "center", of: window },
      width: 400,
      buttons: {
        "Submit": function() {
          console.log("Form Submitted");
          var lowerVal = document.getElementById("lower").checked;
          var upperVal = document.getElementById("upper").checked;
          var numVal = document.getElementById("num").checked;
          var specVal = document.getElementById("spec").checked;
          var lengthVal = parseInt(document.getElementById("length").value);

          if(!(lowerVal || upperVal || numVal || specVal))
          {
            $(this).dialog("close");
            window.alert("Please select at lease one character type");
            generatePassword();
          }else if(document.getElementById("length").value == '' || lengthVal < 8 || lengthVal > 128)
          {
            $(this).dialog("close");
            window.alert("Please enter a length value between 8 and 128");
            generatePassword();
          }else{
            console.log("valid input");
            criteria.updateCrit("lower", lowerVal);
            criteria.updateCrit("upper", upperVal);
            criteria.updateCrit("num", numVal);
            criteria.updateCrit("spec", specVal);
            criteria.updateCrit("length", lengthVal);
            console.log(JSON.stringify(criteria));
            $(this).dialog("close");
            document.getElementById("form").reset();
            console.log("Begin Password Generation");
            var password = "";
            var charArrIndex = 0;
            
            if(criteria.inclLower){
              selectedCharsArr += lowercaseArr;
            }
            if(criteria.inclUpper){
              selectedCharsArr += uppercaseArr;
            }
            if(criteria.inclNum){
              selectedCharsArr += numArr;
            }
            if(criteria.inclSpec){
              selectedCharsArr += specArr;
            }

            for(var i = 0; i < criteria.length; i++){
              charArrIndex = Math.floor(Math.random()*selectedCharsArr.length)-1;
              password += selectedCharsArr.substring(charArrIndex,charArrIndex+1);
            }

            selectedCharsArr = "";
            length = '';

            console.log("returning " + password);
            writePassword(password);
          }
        }
      }
    });
  });

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(password) {
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);
