import HasNeededFields from "./HasNeededFields";
import GetKey from "./GetKey";

export default ({ neededFields = [], method = "GET" }) => {
  return (state, payload) => {
    if (neededFields.length > 0) {
      if (!HasNeededFields(payload, neededFields)) {
        throw new Error("Yotpo - Add review - Necessary fields not provided");
      }
    }

    const appkey = GetKey();
    try {
      fetch(``, {
        method,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (e) {}
  };
};
