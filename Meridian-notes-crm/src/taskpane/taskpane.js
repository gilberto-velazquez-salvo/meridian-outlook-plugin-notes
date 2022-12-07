/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
Office.onReady((info) => {
  //console.log(info);
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("submit").onclick = saveNote;
    document.getElementById("credentials-crm-done").onclick = login_user_validation;
    document.getElementById("case-selector").onclick = getCaseSelected;
    document.getElementById("case-linked").onclick = getLinkedCaseSelected;
    initialSubject();
    initialClipboard();
    infoFromEmail();
    display_initial_panes();
  }
});

export async function display_initial_panes() {
  let config;
  //console.log("display_initial_panes");
  config = getConfig();
  //console.log(config);
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
  //console.log("initialLoginExistent");
  config = getConfig();
  document.getElementById("crm-user").value = config.applicationUserName;
  document.getElementById("crm-pass").value = config.applicationPassName;
  login_user_validation();
}

export async function login_user_validation() {
  var userTyped = document.getElementById("crm-user").value;
  var passTyped = document.getElementById("crm-pass").value;
  // response=token obtained
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

export async function infoFromEmail() {
  // Get a reference to the current message
  const item = Office.context.mailbox.item;
  //console.log("infoFromEmail");
  //console.log(item);
  // Get the address entities from the item.
  const entities = Office.context.mailbox.item.getEntities();
  // Check to make sure that address entities are present.
  if (null != entities && null != entities.addresses && undefined != entities.addresses) {
    //Addresses are present, so use them here.
    //console.log(entities);
  }

  const bodyEmail = Office.context.mailbox.item.body;
  //console.log(bodyEmail);

  // This example gets the body of the item as plain text.
  Office.context.mailbox.item.body.getAsync(
    "text",
    { asyncContext: "This is passed to the callback" },
    function callback(result) {
      // Do something with the result.
      //console.log("log result");
      //console.log(result);
    }
  );
  /*
  Office.context.mailbox.item.body.getSelectedDataAsync(
    "text", // coercionType
    {
      valueFormat: "unformatted", // valueFormat
      filterType: "all",
    }, // filterType
    function (result) {
      // callback
      const dataValue = result.value;
      // write('Selected data is: ' + dataValue);
      //console.log("Selected data is: " + dataValue);
    }
  );*/
}

export async function getCaseSelected() {
  console.log("entro a case selected");
  var valorgetCaseSeclected = $("#case-selector").serialize();
  //console.log(valorgetCaseSeclected);
  document.getElementById("fcaseid").value = valorgetCaseSeclected.split("=")[1];
  clearCasesLinked();
  //lockFormCasesLinked();
  //unlockForm("cases-selector-panel");
}

export async function getLinkedCaseSelected() {
  console.log("getLinkedCaseSelected");
  var valorgetCaseSeclected1 = $("#case-linked").serialize();
  document.getElementById("fcaseid").value = valorgetCaseSeclected1.split("=")[1];
  clearMostRecentlyVisited();
  //unlockForm("cases-linked-panel");
  //lockFormCasesVisited();
}

export async function run() {
  let config;
  let tokenFromUser;
  config = getConfig();
  tokenFromUser = await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);

  // Write message property value to the task pane
  //console.log("item element");
  ////console.log(item);
  document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
  //console.log(config.applicationUserName);
  //console.log(tokenFromUser);
  //Get the active cases with the id's
}

export async function cases() {
  // Get a reference to the current message
  let config;
  config = getConfig();
  await recentlyVisitedCases(config.applicationUserName, config.applicationPassName);

  // Write message property value to the task pane
  ////console.log("item element");
  ////console.log(item);
  //document.getElementById("cases-list").innerHTML = "<b>Subject:</b> <br/>" + item.subject;
  ////console.log(config.applicationUserName);
}

export async function saveNote() {
  //Case Id
  var fcaseidObtained = document.getElementById("fcaseid").value;
  //Subject
  var fsubjectObtained = document.getElementById("fsubject").value;
  //Note
  var fnoteObtained = document.getElementById("fnote").value;

  //console.log("Enter in save Note");
  //console.log(fcaseidObtained);
  //console.log(fsubjectObtained);
  //console.log(fnoteObtained);

  let config;
  config = getConfig();
  //console.log(config.applicationUserName);
  //console.log(config.applicationPassName);

  let response = await saveNoteCRM(
    config.applicationUserName,
    config.applicationPassName,
    fcaseidObtained,
    fsubjectObtained,
    fnoteObtained
  );

  //console.log("response from notes");
  //console.log(response);

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
