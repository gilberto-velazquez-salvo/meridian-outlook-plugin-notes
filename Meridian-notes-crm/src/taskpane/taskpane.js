/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("submit").onclick = saveNote;
    document.getElementById("credentials-crm-done").onclick = login_user_validation;
    document.getElementById("case-selector").onclick = getCaseSelected;
    document.getElementById("case-linked").onclick = getLinkedCaseSelected;
    initialSubject();
    initialClipboard();
    display_initial_panes();
  }
});

export async function display_initial_panes() {
  let config;
  config = getConfig();
  if (config.applicationUserName != null) {
    clean_up_error();
    hide_login_panel();
    user_logged_in();
    initialLoginExistent();
  } else {
    login_panel_only();
  }
}

export async function initialLoginExistent() {
  let config;
  config = getConfig();
  document.getElementById("crm-user").value = config.applicationUserName;
  document.getElementById("crm-pass").value = config.applicationPassName;
  login_user_validation();
}

export async function login_user_validation() {
  var userTyped = document.getElementById("crm-user").value;
  var passTyped = document.getElementById("crm-pass").value;
  let response = await getToken(userTyped, passTyped);
  if (response === null) {
    display_error("The user and password provided are not valid");
  } else {
    clean_up_error();
    hide_login_panel();
    display_cases_form();
    setValidConfig(userTyped, passTyped);
    await getEmailLinked(response);
    await getDashboardInfo(response);
  }
}
export async function initialClipboard() {
  // Get information from clipboard
  document.getElementById("fnote").value = await getClipboard();
}
export async function initialSubject() {
  // Get a reference to the current message
  const item = Office.context.mailbox.item;
  // Write message property value to the task pane
  document.getElementById("fsubject").value = item.normalizedSubject;
}


export async function getCaseSelected() {
  console.log("entro a case selected");
  var valorgetCaseSeclected = $("#case-selector").serialize();
  document.getElementById("fcaseid").value = valorgetCaseSeclected.split("=")[1];
  clearCasesLinked();
}

export async function getLinkedCaseSelected() {
  console.log("getLinkedCaseSelected");
  var valorgetCaseSeclected1 = $("#case-linked").serialize();
  document.getElementById("fcaseid").value = valorgetCaseSeclected1.split("=")[1];
  clearMostRecentlyVisited();
}

export async function run() {
  let config;
  let tokenFromUser;
  config = getConfig();
  tokenFromUser = await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);
  document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
}

export async function cases() {
  // Get a reference to the current message
  let config;
  config = getConfig();
  await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);
}

export async function saveNote() {
  //Case Id
  var fcaseidObtained = document.getElementById("fcaseid").value;
  //Subject
  var fsubjectObtained = document.getElementById("fsubject").value;
  //Note
  var fnoteObtained = document.getElementById("fnote").value;
  let config;
  config = getConfig();
  let response = await saveNoteCRM(
    config.applicationUserName,
    config.applicationPassName,
    fcaseidObtained,
    fsubjectObtained,
    fnoteObtained
  );
  const emailHash = Office.context.mailbox.item.conversationId;
  let response2 = await saveEmailChain(
    config.applicationUserName,
    config.applicationPassName,
    fcaseidObtained,
    emailHash
  );

  if (response === null || response2 === null) {
    display_error("The note is not valid");
  } else {
    display_success("The note was stored successfully");
  }
}
