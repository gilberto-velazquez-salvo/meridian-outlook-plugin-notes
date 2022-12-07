function login_panel_only() {
  document.getElementById("cases-selector-panel").style.display = "none";
  document.getElementById("cases-linked-panel").style.display = "none";
  document.getElementById("cases-form-panel").style.display = "none";
  document.getElementById("final-message-panel").style.display = "none";
}

function user_logged_in() {
  document.getElementById("cases-selector-panel").style.display = "block";
  document.getElementById("cases-linked-panel").style.display = "block";
  document.getElementById("cases-form-panel").style.display = "block";
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

function clean_up_error() {
  var element = document.getElementById("error-message");
  element.innerHTML = "";
  document.getElementById("final-message-panel").style.display = "none";
}

function hide_login_panel() {
  document.getElementById("login-panel").style.display = "none";
}

function display_cases_form() {
  document.getElementById("cases-selector-panel").style.display = "block";
  document.getElementById("cases-linked-panel").style.display = "block";
  document.getElementById("cases-form-panel").style.display = "block";
}

function lockFormCasesLinked() {
  $([document.getElementById("cases-linked-panel")])
    .find("input")
    .each(function () {
      $(this).attr("disabled", "disabled");
    });
}

function lockFormCasesVisited() {
  $([document.getElementById("cases-selector-panel")])
    .find("input")
    .each(function () {
      $(this).attr("disabled", "disabled");
    });
}

function unlockForm(formName) {
  $([document.getElementById(formName)])
    .find("input")
    .each(function () {
      $(this).attr("disabled", "enabled");
    });
}

function clearMostRecentlyVisited() {
  var ele = document.getElementById("case-selector");
  for(var i=0;i<ele.length;i++){
    ele[i].checked = false;
  }
}

function clearCasesLinked() {
  var ele = document.getElementById("case-linked");
  for(var i=0;i<ele.length;i++){
    ele[i].checked = false;
  }
}