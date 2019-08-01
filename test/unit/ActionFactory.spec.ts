import ActionFactory from "../../helpers/ActionFactory";
jest.mock("@vue-storefront/core/helpers", () => ({
  once: a => {}
}));
jest.mock("@vue-storefront/core/lib/multistore", () => ({
  currentStoreView: () => ({
    storeCode: "eu"
  })
}));
jest.mock("config", () => ({
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
}));

describe("ActionFactory", () => {
  beforeEach(() => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
      json: () => mockJsonPromise
    });

    (<any>global).fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  it("throws error if neededFields not provided", () => {
    const neededFields = ["field"];
    const action = ActionFactory({ neededFields });
    expect(() => {
      action({}, {});
    }).toThrow();
  });

  it("does nothing if neededFields not provided", () => {
    const action = ActionFactory({});
    expect(() => {
      action({}, {});
    }).not.toThrow();
  });

  it("picks proper request's method", () => {
    let action = ActionFactory({});
    const spy = jest.spyOn(<any>global, "fetch");
    action({}, {});

    expect(spy).toHaveBeenLastCalledWith(``, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    action = ActionFactory({ method: "POST" });
    action({}, {});
    expect(spy).toHaveBeenLastCalledWith(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
});
