import config from "config";

export const isMultilangSet = () => {
  return (
    config.yotpo.hasOwnProperty("langs") &&
    Object.keys(config.yotpo.langs).length > 0
  );
};

export const hasMultilangProperStructure = (customConfig?) => {
  // You should invoke isMultilangSet before that
  const cfg = customConfig ? customConfig : config;
  for (let key of Object.keys(config.yotpo.langs)) {
    if (
      !cfg.yotpo.langs[key].hasOwnProperty("account_id") ||
      !cfg.yotpo.langs[key].hasOwnProperty("app_key")
    ) {
      throw new Error(
        "Yotpo - Bad config - Lang " + key + " does not have needed attributes"
      );
    }
  }
  return true;
};
