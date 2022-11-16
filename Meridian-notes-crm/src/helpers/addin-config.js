function getConfig() {
  const config = {};

  config.applicationUserName = Office.context.roamingSettings.get('applicationUserName');;
  config.applicationPassName = Office.context.roamingSettings.get('applicationPassName');;

  //config.applicationUserName = "devteam@mailinator.com";
  //config.applicationPassName = "I9ty5tS2";
  return config;
}

function setConfig(config, callback) {
  Office.context.roamingSettings.set("applicationUserName", config.applicationUserName);
  Office.context.roamingSettings.set("applicationPassName", config.applicationPassName);

  Office.context.roamingSettings.saveAsync(callback);
}
