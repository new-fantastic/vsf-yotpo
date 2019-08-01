import GetKey from "../../helpers/GetKey";

jest.mock("@vue-storefront/core/lib/multistore", () => ({
  currentStoreView: () => ({
    storeCode: "eu"
  })
}));
jest.mock("config", () => {});

describe("GetKey", () => {
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
});
