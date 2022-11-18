async function recentlyVisitedCases(user, pass) {
  try {
    console.log("recentlyVisitedCases");
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed = JSON.parse(remoteCode);
    console.log(dataParsed);
    console.log(dataParsed.data?.token);
    var infoFromDashboard = await getDashboardInfo(dataParsed.data.token);
    console.log(infoFromDashboard);
    console.log("infoFromDashboard");
  } catch (error) {
    console.log("Error getting the cases: ", error);
  }
}

async function getDashboardInfo(token) {
  try {
    var dashboard = await makeDashboardRequest("https://stage-api.meridianmedlegal.com/api/v1/dashboard", token);
    console.log("dashboard");
    const dataParsed1 = JSON.parse(dashboard);
    console.log("Inside getDashboardInfo");
    console.log(dataParsed1);
    //buildCasesHtml(dataParsed1.data.recently_visited_cases);
    buildCasesSelector(dataParsed1.data.recently_visited_cases);
  } catch (error) {
    console.log("Error fetching remote HTML: ", error);
  }
}
async function getToken(user, pass) {
  try {
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    //console.log("remoteCode");
    const dataParsed = JSON.parse(remoteCode);
    //console.log("dataParsed");
    console.log(dataParsed);
    console.log(dataParsed.data.token);
    return dataParsed.data.token;
  } catch (error) {
    console.log("Error fetching remote HTML: ", error);
    return null;
  }
}

async function saveNoteCRM(user, pass, fcaseidObtained, fsubjectObtained, fnoteObtained) {
  try {
    console.log("saveNote");
    console.log(user);
    console.log(pass);
    console.log(fcaseidObtained);
    console.log(fsubjectObtained);
    console.log(fnoteObtained);
    var remoteCodeCRM = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed3 = JSON.parse(remoteCodeCRM);
    console.log(dataParsed3.data.token);

    var infoFromNotes = await makeStoreRequest(
      dataParsed3.data.token,
      fcaseidObtained,
      fsubjectObtained,
      fnoteObtained
    );
    const dataParsed4 = JSON.parse(infoFromNotes);
    console.log(dataParsed4);
    return dataParsed4;
  } catch (error) {
    console.log("Error getting the cases: ", error);
    return null;
  }

  /*
  try {
    console.log("saveNote");
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed = JSON.parse(remoteCode);
    console.log(dataParsed.data.token);
    var infoFromDashboard = await makeStoreRequest(
      dataParsed.data.token,
      fcaseidObtained,
      fsubjectObtained,
      fnoteObtained
    );
    console.log(infoFromDashboard);
    console.log("infoFromDashboard");
  } catch (error) {
    console.log("Error getting the cases: ", error);
  }*/
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

function buildCasesSelector(recentlyVisitedCases) {
  console.log("inside buildCasesSelector");
  console.log(recentlyVisitedCases);
  var element = document.getElementById("cases-list");
  //var my_form = document.createElement("form");
  //my_form.name = "cases_form";
  var fieldset_form = document.createElement("fieldset");
  let field_legend = document.createElement("legend");
  field_legend.innerHTML = "Select desired case";
  fieldset_form.appendChild(field_legend);
  //my_form.method = "POST";
  //my_form.action = "http://www.another_page.com/index.htm";

  for (var x = 0; x < recentlyVisitedCases.length; x++) {
    let claim_number_obtained = recentlyVisitedCases[x].cases?.claim_number
      ? recentlyVisitedCases[x].cases.claim_number
      : "--";
    let case_id_obtained = recentlyVisitedCases[x].case_id ? recentlyVisitedCases[x].case_id : "--";
    let claimant_full_name_obtained = recentlyVisitedCases[x].cases?.claimant_full_name
      ? recentlyVisitedCases[x].cases.claimant_full_name
      : "--";

    //var my_div = document.createElement("div");
    var my_tb_label = document.createElement("label");
    my_tb_label.setAttribute("for", case_id_obtained);
    my_tb_label.innerHTML = claim_number_obtained + " " + claimant_full_name_obtained;
    var my_tb = document.createElement("input");
    my_tb.type = "radio";
    my_tb.name = "case_selected_form";
    my_tb.value = case_id_obtained;
    my_tb.id = case_id_obtained;
    //my_tb.innerHTML = claim_number_obtained + " " + claimant_full_name_obtained;
    //my_div.appendChild(my_tb_label);
    //my_div.appendChild(my_tb);
    fieldset_form.appendChild(my_tb);
    fieldset_form.appendChild(my_tb_label);
  }

  //my_form.appendChild(my_tb);

  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof element != "undefined" && element != null) {
    document.getElementById("cases-list").innerHTML = "";
    document.getElementById("cases-list").appendChild(fieldset_form);
  } else {
    // Adding the entire table to the body tag
    document.getElementById("cases-list").appendChild(fieldset_form);
  }
}

function buildCasesHtml(recentlyVisitedCases) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");

  // Creating and adding data to first row of the table
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
  console.log("before create table");
  for (var x = 0; x < recentlyVisitedCases.length; x++) {
    // Creating and adding data to second row of the table
    console.log("inside for x: " + x);
    console.log(recentlyVisitedCases[x]);
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
  //If it isn't "undefined" and it isn't "null", then it exists.
  if (typeof element != "undefined" && element != null) {
    document.getElementById("cases-list").innerHTML = "";
    document.getElementById("cases-list").appendChild(table);
  } else {
    // Adding the entire table to the body tag
    document.getElementById("cases-list").appendChild(table);
  }
  //document.getElementById("cases-list").innerHTML = "<table><thead><tr><th colspan=\"2\">The table header</th></tr></thead><tbody><tr><td>The table body</td><td>with two columns</td></tr></tbody></table>";
}
