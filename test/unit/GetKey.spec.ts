import GetKey from "../../helpers/GetKey";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";

jest.mock("@vue-storefront/core/lib/multistore", () => ({
  currentStoreView: jest.fn()
}));
jest.mock("config", () => {});

describe("GetKey", () => {

  beforeEach(() => {
    (<any>currentStoreView).mockImplementation(() => ({
      storeCode: "eu"
    }))
  })
  it("returns proper app_key for singlelang", () => {
    const config = {
      yotpo: {
        app_key: 123,
        account_id: "123"
      }
    };
    const key = GetKey(config);
    expect(key).toBe(config.yotpo.app_key);
  });

  it("returns proper app_key for multilang", () => {
    const config = {
      yotpo: {
        langs: {
          eu: {
            app_key: 123,
            account_id: "123"
          },
          de: {
            app_key: 555,
            account_id: "654"
          }
        }
      }
    };
    const key = GetKey(config);
    expect(key).toBe(config.yotpo.langs.eu.app_key);
  });

  it("fallback to es for mx if not provided", () => {
    (<any>currentStoreView).mockImplementation(() => ({
      storeCode: "mx"
    }))

    const config = {
      yotpo: {
        langs: {
          es: {
            app_key: 123,
            account_id: "123"
          }
        }
      }
    };
    const key = GetKey(config);
    expect(key).toBe(config.yotpo.langs.es.app_key);
  });

  it("fallback to eu for other than mx if not provided", () => {
    (<any>currentStoreView).mockImplementation(() => ({
      storeCode: "kk"
    }))

    const config = {
      yotpo: {
        langs: {
          eu: {
            app_key: 123,
            account_id: "123"
          }
        }
      }
    };
    const key = GetKey(config);
    expect(key).toBe(config.yotpo.langs.eu.app_key);
  });
});
