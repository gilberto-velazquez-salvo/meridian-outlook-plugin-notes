function getConfig() {
  const config = {};

  config.applicationUserName = Office.context.roamingSettings.get("applicationUserName");
  config.applicationPassName = Office.context.roamingSettings.get("applicationPassName");
  return config;
}

function saveMyAppSettingsCallback(asyncResult) {
  if (asyncResult.status == Office.AsyncResultStatus.Failed) {
  }
}

function setValidConfig(user, pass) {
  const _settings = Office.context.roamingSettings;
  Office.context.roamingSettings.set("applicationUserName", user);
  Office.context.roamingSettings.set("applicationPassName", pass);
  _settings.saveAsync(saveMyAppSettingsCallback);
}
