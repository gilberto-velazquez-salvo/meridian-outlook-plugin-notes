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
}
