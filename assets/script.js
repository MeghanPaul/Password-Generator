// Assignment code here
function generatePassword() 
{
  var length = parseInt(window.prompt("Enter length of password as a number of characters between 8 and 128: "));
  while(length < 8 || length > 128)
  {
    length = parseInt(window.prompt("Invalid length. Enter a number of characters between 8 and 128: "));
  }

  //Reference for using setInterval to make one dialog box appear at a time
  //https://www.codegrepper.com/code-examples/javascript/jquery+wait+for+element+to+exist
  var timerReset = false;
  var inclLower = customConfirm("lowercase letters");
  inclLowerTimer = setInterval(function(){
    if(inclLower != undefined){
      console.log("lower decision made");

      //call inclUpper dialog;
      inclUpperTimer = setInterval(function(){
        if(!timerReset)
        {
          var inclUpper = customConfirm("uppercase letters");
          clearInterval(inclLowerTimer);
          timerReset = true;
        }
        if(inclUpper != undefined)
        {
          console.log("upper decision made");

          //call inclNum dialog;
          inclNumTimer = setInterval(function(){
            if(!timerReset)
            {
              var inclNum = customConfirm("numbers");
              clearInterval(inclUpperTimer);
              timerReset = true;
            }
            if(inclNum != undefined)
            {
              console.log("num decision made");
              clearInterval(inclNumTimer);
            }

          },100);

        }
      }, 100);
    
    }
  }, 100);//checks every 100 milliseconds
  
  
  //var inclSpec = customConfirm("special characters");

 // return "Password" + length + inclLower + inclUpper + inclNum + inclSpec;
  
}

//Reference for modal confirm dialog box
//https://jqueryui.com/dialog/#modal-confirmation
function customConfirm(charType) {

  var dialogEl = document.createElement("div");
  dialogEl.setAttribute("id","dialog-confirm");
  dialogEl.setAttribute("class", "modal-prompt");
  dialogEl.textContent = "Would you like to include " + charType + "?";
  document.body.appendChild(dialogEl);
  
  $(function () {
    $("#dialog-confirm").dialog({
      resizable: false,
      modal: true,
      buttons: {
        "Yes": function() {
          $(this).dialog("close");
          return true;
        },
        "No": function() {
          $(this).dialog("close");
          return false;
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
