!function(){"use strict";function e(e,i){getUserGists(e,(function(e,s){s?($(".gist-list-container").hide(),$("#error-text").text(JSON.stringify(s,null,2)),$(".error-display").show(),i&&i(!1)):($(".error-display").hide(),buildGistList($("#gist-list"),e,t),$(".gist-list-container").show(),i&&i(!0))}))}function t(){$(".ms-ListItem").removeClass("is-selected").removeAttr("checked"),$(this).children(".ms-ListItem").addClass("is-selected").attr("checked","checked"),$(".not-configured-warning").hide(),$("#settings-done").removeAttr("disabled")}function i(e){Office.context.ui.messageParent(e)}function s(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var i=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return i?i[2]?decodeURIComponent(i[2].replace(/\+/g," ")):"":null}Office.initialize=function(t){jQuery(document).ready((function(){if(window.location.search)if(s("warn"))$(".not-configured-warning").show();else{var t=s("gitHubUserName"),n=s("defaultGistId");$("#github-user").val(t),e(t,(function(e){e&&($(".ms-ListItem").removeClass("is-selected"),$("input").filter((function(){return this.value===n})).addClass("is-selected").attr("checked","checked"),$("#settings-done").removeAttr("disabled"))}))}$("#github-user").on("change",(function(){$("#gist-list").empty();var t=$("#github-user").val();t.length>0&&e(t)})),$("#settings-done").on("click",(function(){var e={};e.gitHubUserName=$("#github-user").val();var t=$(".ms-ListItem.is-selected");t&&(e.defaultGistId=t.val(),i(JSON.stringify(e)))})),$("#credentials-done").on("click",(function(){var e={};$("#gist-list").empty();var t=$("#github-user").val(),s=$("#github-pass").val();t.length>0&&function(e,t,i){getToken(e,t,(function(e,t,i){i?($(".gist-list-container").hide(),$("#error-text").text(JSON.stringify(i,null,2)),$(".error-display").show()):($(".error-display").hide(),$(".gist-list-container").hide(),buildBodyContent($("#welcome-crm"),cred))}))}(t,s),e.gitHubUserName=$("#github-user").val();var n=$(".ms-ListItem.is-selected");n&&(e.defaultGistId=n.val(),i(JSON.stringify(e)))}))}))}}();