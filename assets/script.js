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

function generatePassword()
{
  customConfirm("length", "length");

  //Reference for using setInterval to make one dialog box appear at a time
  //https://www.codegrepper.com/code-examples/javascript/jquery+wait+for+element+to+exist
  customConfirm("lowercase letters", "lower");
  customConfirm("uppercase letter", "upper");
  customConfirm("numbers","num");
  customConfirm("special characters","spec");
 
  var counter = 0;
  var wait = setInterval(function(){
    console.log(counter);
    counter++;
    if(criteria.inclLower != undefined && criteria.inclUpper != undefined && criteria.inclNum != undefined && criteria.inclSpec != undefined)
    {
      clearInterval(wait);
    }
  },100);
  console.log("FINAL: " + JSON.stringify(criteria));
 
//Reference for modal confirm dialog box
//https://jqueryui.com/dialog/#modal-confirmation
function customConfirm(promptFill, criterion) {

  var dialogEl = document.createElement("div");
  dialogEl.setAttribute("id","dialog-confirm");
  dialogEl.setAttribute("class", "modal-prompt");
  if(criterion == "length")
  {
    dialogEl.textContent = "Enter length of password as a number of characters between 8 and 128: ";
    var lengthFormEl = document.createElement("form");
    var formInputEl = document.createElement("input");
    formInputEl.setAttribute("type","text");
    formInputEl.setAttribute("id","lengthValue");
    document.body.appendChild(dialogEl);
    dialogEl.appendChild(lengthFormEl);
    lengthFormEl.appendChild(formInputEl);
    $(function () {
      $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        buttons: {
          "Continue": function() {
            console.log("Length submitted");
            criteria.updateCrit(criterion, document.getElementById("lengthValue").value);
            $(this).dialog("close");
          }
        }
      });
    });

    /* while(length < 8 || length > 128)
    {
      length = parseInt(window.prompt("Invalid length. Enter a number of characters between 8 and 128: "));
    } */
  }else {
    dialogEl.textContent = "Would you like to include " + promptFill + "?";
    document.body.appendChild(dialogEl);
    
    $(function () {
      $("#dialog-confirm").dialog({
        resizable: false,
        modal: true,
        buttons: {
          "Yes": function() {
            console.log("Yes selected for " + promptFill);
            criteria.updateCrit(criterion, true);
            $(this).dialog("close");
            return true;
          },
          "No": function() {
            console.log("No selected for " + promptFill);
            criteria.updateCrit(criterion, false);
            $(this).dialog("close");
            return false;
          }
        }
      });
    });
  }
}
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
