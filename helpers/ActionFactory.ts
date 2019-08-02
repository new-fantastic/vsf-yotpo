import HasNeededFields from "./HasNeededFields";
import GetKey from "./GetKey";
import UrlFiller from "./UrlFiller";
import AttachQueryStrings from "./AttachQueryStrings";
import fetch from "isomorphic-fetch";

interface ActionFactoryBody {
  appkey?: boolean;
  domain?: string;
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
  queries?: object;
}

export default ({
  neededFields = [],
  method = "GET",
  url,
  body = { appkey: true, domain: "http://localhost.pl/" },
  error = null,
  onSuccess = null,
  onFailure = null,
  queries = {}
}: ActionFactory) => {
  return async (state, payload) => {
    if (neededFields.length > 0) {
      if (!HasNeededFields(payload, neededFields)) {
        throw new Error("Yotpo - Necessary fields not provided");
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
        if (key === "appkey" && body.appkey === true) {
          fetchObj.body.appkey = k;
        } else {
          fetchObj.body[key] = body[key];
        }
      }
    }
    fetchObj.body = {
      ...fetchObj.body,
      ...payload
    };

    // Create url
    let path = UrlFiller(url.href, url.fillers);
    if (Object.keys(queries).length > 0) {
      path = AttachQueryStrings(path, queries);
    }
    fetchObj.body = JSON.stringify(fetchObj.body);
    if (method === "GET" || method === "HEAD") {
      delete fetchObj.body;
    }

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
