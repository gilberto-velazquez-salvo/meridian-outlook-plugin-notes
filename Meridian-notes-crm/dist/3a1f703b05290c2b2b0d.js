function login_panel_only(){document.getElementById("cases-selector-panel").style.display="none",document.getElementById("cases-linked-panel").style.display="none",document.getElementById("cases-form-panel").style.display="none",document.getElementById("final-message-panel").style.display="none"}function user_logged_in(){document.getElementById("cases-selector-panel").style.display="block",document.getElementById("cases-linked-panel").style.display="block",document.getElementById("cases-form-panel").style.display="block",document.getElementById("final-message-panel").style.display="none"}function display_error(e){var n=document.createElement("p");n.innerHTML=e;var t=document.getElementById("error-message");t.innerHTML="",t.appendChild(n),document.getElementById("final-message-panel").style.display="flex",document.getElementById("success-message").style.display="none",document.getElementById("error-message").style.display="flex"}function display_success(e){var n=document.createElement("p");n.innerHTML=e;var t=document.getElementById("success-message");t.innerHTML="",t.appendChild(n),document.getElementById("final-message-panel").style.display="flex",document.getElementById("error-message").style.display="none",document.getElementById("success-message").style.display="flex"}function clean_up_error(){document.getElementById("error-message").innerHTML="",document.getElementById("final-message-panel").style.display="none"}function hide_login_panel(){document.getElementById("login-panel").style.display="none"}function display_cases_form(){document.getElementById("cases-selector-panel").style.display="block",document.getElementById("cases-linked-panel").style.display="block",document.getElementById("cases-form-panel").style.display="block"}function lockFormCasesLinked(){$([document.getElementById("cases-linked-panel")]).find("input").each((function(){$(this).attr("disabled","disabled")}))}function lockFormCasesVisited(){$([document.getElementById("cases-selector-panel")]).find("input").each((function(){$(this).attr("disabled","disabled")}))}function unlockForm(e){$([document.getElementById(e)]).find("input").each((function(){$(this).attr("disabled","enabled")}))}