import config from "config";

export const hasSinglelangProperStructure = (customConfig?) => {
  const cfg = customConfig ? customConfig : config;
  if (
    cfg.yotpo.hasOwnProperty("app_key") &&
    cfg.yotpo.hasOwnProperty("account_id")
  ) {
    return true;
  } else {
    throw new Error("Yotpo - Bad config - Provide app_key and account_id");
  }
};
