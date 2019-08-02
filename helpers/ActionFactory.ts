import HasNeededFields from "./HasNeededFields";
import GetKey from "./GetKey";
import UrlFiller from "./UrlFiller";

interface ActionFactoryBody {
  appKey: Boolean;
  domain: string;
  [key: string]: any;
}
interface ActionFactoryUrl {
  href: string;
  fillers?: Object;
}
export interface ActionFactory {
  neededFields?: Array<string>;
  method?: string;
  url: ActionFactoryUrl;
  body?: ActionFactoryBody;
  error?: string | null;
  onSuccess?: Function | null;
  onFailure?: Function | null;
}

export default ({
  neededFields = [],
  method = "GET",
  url,
  body = { appKey: true, domain: "http://localhost.pl/" },
  error = null,
  onSuccess = null,
  onFailure = null
}: ActionFactory) => {
  return async (state, payload) => {
    if (neededFields.length > 0) {
      if (!HasNeededFields(payload, neededFields)) {
        throw new Error("Yotpo - Add review - Necessary fields not provided");
      }
    }

    const k = GetKey();
    const fetchObj: any = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };
    let keys = Object.keys(body);
    if (keys.length > 0) {
      fetchObj.body = {};
      for (let key of Object.keys(body)) {
        if (key === "appKey" && body.appKey === true) {
          fetchObj.body[key] = k;
        } else {
          fetchObj.body[key] = body[key];
        }
      }
    }

    // Create url
    const path = UrlFiller(url.href, url.fillers);

    try {
      let r = await fetch(path, fetchObj);
      let { response } = await r.json();
      if (onSuccess !== null) onSuccess(response);
    } catch (e) {
      if (onFailure !== null) onFailure(e);
      if (error === null) {
        throw new Error(e);
      } else {
        throw new Error(error);
      }
    }
  };
};
