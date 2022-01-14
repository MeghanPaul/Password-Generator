// Assignment code here
function generatePassword() 
{
  var length = parseInt(window.prompt("Enter length of password as a number of characters between 8 and 128: "));
  while(length < 8 || length > 128)
  {
    length = parseInt(window.prompt("Invalid length. Enter a number of characters between 8 and 128: "));
  }

  var inclLower = false;
  var inclUpper = false;
  var inclNum = false;
  var inclSpec = false;

  return "Password" + length;
  
}

//Reference for modal confirm dialog box
//https://jqueryui.com/dialog/#modal-confirmation
function customConfirm() {
  var dialogEl = document.createElement("div");
  dialogEl.setAttribute("id","dialog-confirm");
  document.body.appendChild(dialogEl);
  $(function () {
    $("#dialog-confirm").dialog({
      resizable: false,
      height: "auto",
      width: 400,
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
