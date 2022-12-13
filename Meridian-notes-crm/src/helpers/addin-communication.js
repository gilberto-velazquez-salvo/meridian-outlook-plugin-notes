async function recentlyVisitedCases(user, pass) {
  try {
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed = JSON.parse(remoteCode);
    var infoFromDashboard = await getDashboardInfo(dataParsed.data.token);
  } catch (error) {
    //console.log("Error getting the cases: ", error);
  }
}

async function getClipboard() {
  try {
    var remoteCodeclip = await makeClipboardRequest("http://localhost:3030/");
    const dataParsed11 = JSON.parse(remoteCodeclip);
    return dataParsed11.info ? dataParsed11.info : "--";
  } catch (error) {
    return null;
  }
}

async function getDashboardInfo(token) {
  try {
    var dashboard = await makeDashboardRequest("https://stage-api.meridianmedlegal.com/api/v1/dashboard", token);
    const dataParsed1 = JSON.parse(dashboard);
    buildCasesSelector(dataParsed1.data.recently_visited_cases);
    get_copied_text_addin();
  } catch (error) {
    //console.log("Error fetching remote HTML: ", error);
  }
}

async function getEmailLinked(token) {
  try {
    let conversationId = Office.context.mailbox.item.conversationId;
    var email_linked = await makeEmailHashRequest(token, conversationId);
    const dataParsed3 = JSON.parse(email_linked);
    buildCasesHashSelector(dataParsed3.data.details);
  } catch (error) {
    //console.log("Error fetching remote emails", error);
  }
}

async function getToken(user, pass) {
  try {
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed = JSON.parse(remoteCode);
    return dataParsed.data.token;
  } catch (error) {
    return null;
  }
}

async function saveNoteCRM(user, pass, fcaseidObtained, fsubjectObtained, fnoteObtained) {
  try {
    var remoteCodeCRM = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed3 = JSON.parse(remoteCodeCRM);
    var infoFromNotes = await makeStoreRequest(
      dataParsed3.data.token,
      fcaseidObtained,
      fsubjectObtained,
      fnoteObtained
    );
    const dataParsed4 = JSON.parse(infoFromNotes);
    return dataParsed4;
  } catch (error) {
    return null;
  }
}

async function saveEmailChain(user, pass, fcaseidObtained, emailHash) {
  try {
    var remoteCodeCRM = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed3 = JSON.parse(remoteCodeCRM);
    var infoFromNotes = await makeEmailHashPersist(dataParsed3.data.token, fcaseidObtained, emailHash);
    const dataParsed4 = JSON.parse(infoFromNotes);
    return dataParsed4;
  } catch (error) {
    return null;
  }
}

function makeEmailHashRequest(token, emailHash) {
  var url_complete = "https://stage-api.meridianmedlegal.com/api/v1/case/emailcasesconsult";
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url_complete);
    xhr.setRequestHeader("content-Type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.errors,
      });
    };
    xhr.send(JSON.stringify({ email_hash: emailHash }));
  });
}

function makeStoreRequest(token, fcaseidObtained, fsubjectObtained, fnoteObtained) {
  var url_complete = "https://stage-api.meridianmedlegal.com/api/v1/case/" + fcaseidObtained + "/note/store";
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url_complete);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.errors,
      });
    };
    xhr.send(JSON.stringify({ description: fnoteObtained, subject: fsubjectObtained, pinned: true }));
  });
}

function makeEmailHashPersist(token, fcaseidObtained, emalHashReceived) {
  var url_complete =
    "https://stage-api.meridianmedlegal.com/api/v1/case/" + fcaseidObtained + "/note/emailcasespersist";
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url_complete);
    xhr.setRequestHeader("content-Type", "application/json");
    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.errors,
      });
    };
    xhr.send(JSON.stringify({ email_hash: emalHashReceived }));
  });
}

function makeTokenRequest(url, user, pass) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send("email=" + user + "&password=" + pass);
  });
}

function makeClipboardRequest(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

function makeDashboardRequest(url, token) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

var fieldset_form_linked_cases = document.createElement("fieldset");
let field_legend_linked_cases = document.createElement("legend");
var fieldset_form_recent_cases = document.createElement("fieldset");
let field_legend_recent_cases = document.createElement("legend");

function buildCasesHashSelector(recentlyVisitedHashCases) {
  var element = document.getElementById("cases-linked-list");
  let br = document.createElement("br");
  let title_container = document.createElement("div");
  title_container.onclick = () => {
    fieldset_form_linked_cases.classList.remove("arrow");
    field_legend_linked_cases.classList.add("no_legend");
    fieldset_form_recent_cases.classList.add("arrow");
    field_legend_recent_cases.classList.remove("no_legend");
  };
  let title_text = document.createElement("b");
  title_text.setAttribute("id", "linked_cases_title");
  title_text.innerHTML = "Linked Cases";
  let icon = document.createElement("img");
  field_legend_linked_cases.classList.add("no_legend");
  title_container.classList.add("title_container");
  icon.src = "../../assets/briefcase.png";
  fieldset_form_linked_cases.classList.add("fieldset");
  title_container.appendChild(icon);
  title_container.appendChild(title_text);

  field_legend_linked_cases.innerHTML = "Linked Cases";

  fieldset_form_linked_cases.appendChild(title_container);
  fieldset_form_linked_cases.appendChild(field_legend_linked_cases);
  if (recentlyVisitedHashCases.length > 0) {
    for (var x = 0; x < recentlyVisitedHashCases.length; x++) {
      let claim_number_obtained = recentlyVisitedHashCases[x].claim_number
        ? recentlyVisitedHashCases[x].claim_number
        : "--";
      let case_id_obtained = recentlyVisitedHashCases[x].case_id ? recentlyVisitedHashCases[x].case_id : "--";
      let claimant_full_name_obtained = recentlyVisitedHashCases[x].claimant_full_name
        ? recentlyVisitedHashCases[x].claimant_full_name
        : "--";

      var my_tb_label = document.createElement("label");
      my_tb_label.setAttribute("for", case_id_obtained);
      my_tb_label.innerHTML = claim_number_obtained + " " + claimant_full_name_obtained;
      var my_tb = document.createElement("input");
      my_tb.type = "radio";
      my_tb.name = "case_selected_form";
      my_tb.value = case_id_obtained;
      my_tb.id = case_id_obtained;
      fieldset_form_linked_cases.appendChild(my_tb);
      fieldset_form_linked_cases.appendChild(my_tb_label);
      fieldset_form_linked_cases.appendChild(br.cloneNode(true));
    }
    fieldset_form_recent_cases.classList.add("arrow");
  } else {
    fieldset_form_recent_cases.classList.add("arrow");
    var my_tb_label = document.createElement("label");
    my_tb_label.innerHTML = " No cases linked to Email thread";
    fieldset_form_linked_cases.appendChild(my_tb_label);
  }
  if (typeof element != "undefined" && element != null) {
    document.getElementById("cases-linked-list").innerHTML = "";
    document.getElementById("cases-linked-list").appendChild(fieldset_form_linked_cases);
  } else {
    document.getElementById("cases-linked-list").appendChild(fieldset_form_linked_cases);
  }
}

function buildCasesSelector(recentlyVisitedCases) {
  var element = document.getElementById("cases-list");
  let br = document.createElement("br");
  let title_container = document.createElement("div");
  title_container.onclick = () => {
    fieldset_form_recent_cases.classList.remove("arrow");
    field_legend_recent_cases.classList.add("no_legend");
    fieldset_form_linked_cases.classList.add("arrow");
    field_legend_linked_cases.classList.remove("no_legend");
  };
  field_legend_recent_cases.classList.add("no_legend");
  let title_text = document.createElement("b");
  title_text.setAttribute("id", "recent_cases_title");
  title_text.innerHTML = "Recent Cases";
  let icon = document.createElement("img");
  title_container.classList.add("title_container");
  icon.src = "../../assets/clock.png";
  fieldset_form_recent_cases.classList.add("fieldset");
  title_container.appendChild(icon);
  title_container.appendChild(title_text);
  fieldset_form_recent_cases.appendChild(title_container);
  field_legend_recent_cases.innerHTML = "Recent Cases";
  fieldset_form_recent_cases.appendChild(field_legend_recent_cases);

  let data_container = document.createElement("div");
  data_container.classList.add("data_container");
  // element.appendChild(fieldset_form);

  fieldset_form_recent_cases.appendChild(data_container);

  for (var x = 0; x < recentlyVisitedCases.length; x++) {
    let claim_number_obtained = recentlyVisitedCases[x].cases?.claim_number
      ? recentlyVisitedCases[x].cases.claim_number
      : "--";
    let case_id_obtained = recentlyVisitedCases[x].case_id ? recentlyVisitedCases[x].case_id : "--";
    let claimant_full_name_obtained = recentlyVisitedCases[x].cases?.claimant_full_name
      ? recentlyVisitedCases[x].cases.claimant_full_name
      : "--";

    var my_tb_label = document.createElement("label");
    my_tb_label.setAttribute("for", case_id_obtained);
    my_tb_label.innerHTML = claim_number_obtained + " " + claimant_full_name_obtained;
    var my_tb = document.createElement("input");
    my_tb.type = "radio";
    my_tb.name = "case_selected_form";
    my_tb.value = case_id_obtained;
    my_tb.id = case_id_obtained;
    data_container.appendChild(my_tb);
    data_container.appendChild(my_tb_label);
    data_container.appendChild(br.cloneNode(true));
  }

  if (typeof element != "undefined" && element != null) {
    document.getElementById("cases-list").innerHTML = "";
    document.getElementById("cases-list").appendChild(fieldset_form_recent_cases);
  } else {
    document.getElementById("cases-list").appendChild(fieldset_form_recent_cases);
  }
}

function buildCasesHtml(recentlyVisitedCases) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  let row_1 = document.createElement("tr");
  let heading_1 = document.createElement("th");
  heading_1.innerHTML = "Case ID";
  let heading_2 = document.createElement("th");
  heading_2.innerHTML = "Claim Number";
  let heading_3 = document.createElement("th");
  heading_3.innerHTML = "Claimant";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  thead.appendChild(row_1);
  for (var x = 0; x < recentlyVisitedCases.length; x++) {
    let row_2 = document.createElement("tr");
    let row_2_data_1 = document.createElement("td");
    row_2_data_1.innerHTML = recentlyVisitedCases[x].case_id ? recentlyVisitedCases[x].case_id : "--";
    let row_2_data_2 = document.createElement("td");
    row_2_data_2.innerHTML = recentlyVisitedCases[x].cases?.claim_number
      ? recentlyVisitedCases[x].cases.claim_number
      : "--";
    let row_2_data_3 = document.createElement("td");
    row_2_data_3.innerHTML = recentlyVisitedCases[x].cases?.claimant_full_name
      ? recentlyVisitedCases[x].cases.claimant_full_name
      : "--";

    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    tbody.appendChild(row_2);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  var element = document.getElementById("cases-list");
  if (typeof element != "undefined" && element != null) {
    document.getElementById("cases-list").innerHTML = "";
    document.getElementById("cases-list").appendChild(table);
  } else {
    document.getElementById("cases-list").appendChild(table);
  }
}

function get_copied_text_addin() {
  const range = window.getSelection();
}
