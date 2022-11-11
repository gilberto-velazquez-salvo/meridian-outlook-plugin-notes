function getWorkingCases(user, pass) {
  const requestUrl = "https://stage-api.meridianmedlegal.com/api/v1/login";
  /* CORS error
    const requestUrl = "https://stage-api.meridianmedlegal.com/api/v1/login";
    const response = fetch(requestUrl, {
      method: "POST",
      body: {
        email: user,
        password: pass,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    const myJson = response.json();
    console.log(myJson);

    return true;
  */
  var tokenObtained;
  let result = makeRequest("POST", requestUrl, user, pass);
  console.log("httpRequest-Response");
  console.log(result);
  tokenObtained = result;
  return tokenObtained;
  /*


  const httpRequest = new XMLHttpRequest();


  httpRequest.open("POST", "https://stage-api.meridianmedlegal.com/api/v1/login", true);
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  httpRequest.onreadystatechange = () => {
    // Call a function when the state changes.
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
      // Request finished. Do processing here.
      console.log("httpRequest");
      console.log(httpRequest);
      console.log("httpRequestParsed");

      console.log(JSON.parse(httpRequest.response));
      const parsedResponse = JSON.parse(httpRequest.response);
      tokenObtained = parsedResponse.data.token;
      console.log('tokenObtained');
      console.log(tokenObtained);
      return tokenObtained;
    }
  };
  httpRequest.send("email=" + user + "&password=" + pass);

  */
}

async function recentlyVisitedCases(user, pass) {
  try {
    console.log('recentlyVisitedCases');
    var remoteCode = await makeTokenRequest("https://stage-api.meridianmedlegal.com/api/v1/login", user, pass);
    const dataParsed = JSON.parse(remoteCode);
    console.log(dataParsed);
    console.log(dataParsed.data.token);
    var infoFromDashboard= await getDashboardInfo(dataParsed.data.token);
    console.log(infoFromDashboard);
    console.log('infoFromDashboard');
  } catch (error) {
    console.log("Error getting the cases: ", error);
  }
}

async function getDashboardInfo(token) {
  try {
    var dashboard = await makeDashboardRequest("https://stage-api.meridianmedlegal.com/api/v1/dashboard", token);
    console.log("dashboard");
    const dataParsed1 = JSON.parse(dashboard);
    console.log(dataParsed1);
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
    //console.log(dataParsed);
    //console.log(dataParsed.data.token);
  } catch (error) {
    console.log("Error fetching remote HTML: ", error);
  }
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
