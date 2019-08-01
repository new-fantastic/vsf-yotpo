import config from "config";

export const hasSinglelangProperStructure = () => {
  if (
    config.yotpo.hasOwnProperty("app_key") &&
    config.yotpo.hasOwnProperty("account_id")
  ) {
    return true;
  } else {
    throw new Error("Yotpo - Bad config - Provide app_key and account_id");
  }
};
