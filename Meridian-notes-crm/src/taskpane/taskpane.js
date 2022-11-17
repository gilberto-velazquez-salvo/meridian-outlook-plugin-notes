/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    //document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    //document.getElementById("run").onclick = run;
    //document.getElementById("cases").onclick = cases;
    //document.getElementById("submit").onclick = saveNote;
    document.getElementById("credentials-crm-done").onclick = login_user_validation;
    initialSubject();
    display_initial_panes();
  }
});

export async function display_initial_panes() {
  let config;
  config = getConfig();
  console.log(config);
  if (config.applicationUserName != null) {
    console.log("user fileed");
  } else {
    login_panel_only();
  }
}

export async function login_user_validation() {
  console.log("login_user_validation");
  var userTyped = document.getElementById("crm-user").value;
  var passTyped = document.getElementById("crm-pass").value;
  let response = await getToken(userTyped, passTyped);
  console.log(response);
  if (response===null){
    display_error('The user and password provided are not valid');
  }
}

export async function initialSubject() {
  // Get a reference to the current message
  const item = Office.context.mailbox.item;
  // Write message property value to the task pane
  document.getElementById("fsubject").value = item.subject;
}

export async function run() {
  let config;
  let tokenFromUser;
  config = getConfig();
  tokenFromUser = await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);

  // Write message property value to the task pane
  console.log("item element");
  //console.log(item);
  document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
  console.log(config.applicationUserName);
  console.log(tokenFromUser);
  //Get the active cases with the id's
}

export async function cases() {
  // Get a reference to the current message
  let config;
  config = getConfig();
  await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);

  // Write message property value to the task pane
  //console.log("item element");
  //console.log(item);
  //document.getElementById("cases-list").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
  //console.log(config.applicationUserName);
}

export async function saveNote() {
  //Case Id
  var fcaseidObtained = document.getElementById("fcaseid").value;
  //Subject
  var fsubjectObtained = document.getElementById("fsubject").value;
  //Note
  var fnoteObtained = document.getElementById("fnote").value;
  console.log(fcaseidObtained);
  console.log(fsubjectObtained);
  console.log(fnoteObtained);
  await saveNoteCRM("devteam@mailinator.com", "I9ty5tS2", fcaseidObtained, fsubjectObtained, fnoteObtained);
}
