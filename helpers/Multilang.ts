import config from "config";

export const isMultilangSet = (customConfig?) => {
  const cfg = customConfig ? customConfig : config;

  return (
    cfg.yotpo.hasOwnProperty("langs") && Object.keys(cfg.yotpo.langs).length > 0
  );
};

export const hasMultilangProperStructure = (customConfig?) => {
  // You should invoke isMultilangSet before that
  const cfg = customConfig ? customConfig : config;
  for (let key of Object.keys(cfg.yotpo.langs)) {
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
