function login_panel_only() {
  document.getElementById("cases-selector-panel").style.display = "none";
  document.getElementById("cases-form-panel").style.display = "none";
  document.getElementById("final-message-panel").style.display = "none";
}

function display_error(error_message) {
  let message = document.createElement("p");
  message.innerHTML = error_message;

  var element = document.getElementById("error-message");
  element.innerHTML = "";
  element.appendChild(message);
  document.getElementById("final-message-panel").style.display = "flex";
  document.getElementById("success-message").style.display = "none";
  document.getElementById("error-message").style.display = "flex";
}

function display_success(error_message) {
  let message = document.createElement("p");
  message.innerHTML = error_message;

  var element = document.getElementById("success-message");
  element.innerHTML = "";
  element.appendChild(message);
  document.getElementById("final-message-panel").style.display = "flex";
  document.getElementById("error-message").style.display = "none";
  document.getElementById("success-message").style.display = "flex";
}

function clean_up_error(){
  var element = document.getElementById("error-message");
  element.innerHTML = "";
  document.getElementById("final-message-panel").style.display = "none";
}

function hide_login_panel(){
  document.getElementById("login-panel").style.display = "none";
}

function display_cases_form() {
  document.getElementById("cases-selector-panel").style.display = "block";
  document.getElementById("cases-form-panel").style.display = "block";
}

$(document).ready(function()
{
    $("input[name=case_selected_form]").click(function () {    
        console.log('se hizo click con jquery');
        console.log($('input:radio[name=case_selected_form]:checked').val());
    });
});