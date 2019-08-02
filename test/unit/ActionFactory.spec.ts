import ActionFactory from "../../helpers/ActionFactory";
import GetKey from "../../helpers/GetKey";

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

const baseBody = () => ({
  appKey: GetKey(),
  domain: "http://localhost.pl/"
});

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

  it("throws error if neededFields not provided", async () => {
    const neededFields = ["field"];
    const action = ActionFactory({
      neededFields,
      url: { href: "http://yotpo.com/ " }
    });

    let error = null;
    try {
      await action({}, {});
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("does nothing if neededFields not provided", () => {
    const action = ActionFactory({ url: { href: "http://yotpo.com/" } });
    expect(async () => {
      await action({}, {});
    }).not.toThrow();
  });

  it("picks proper request's method", () => {
    let action = ActionFactory({ url: { href: "http://yotpo.com/" } });
    const spy = jest.spyOn(<any>global, "fetch");
    action({}, {});

    expect(spy).toHaveBeenLastCalledWith(expect.any(String), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: baseBody()
    });

    action = ActionFactory({
      method: "POST",
      url: { href: "http://yotpo.com/" }
    });
    action({}, {});
    expect(spy).toHaveBeenLastCalledWith(expect.any(String), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: baseBody()
    });
  });

  it("sets header for application/json", () => {
    let action = ActionFactory({ url: { href: "http://yotpo.com/" } });
    const spy = jest.spyOn(<any>global, "fetch");
    action({}, {});

    expect(spy).toHaveBeenLastCalledWith(expect.any(String), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: baseBody()
    });
  });

  it("creates a proper body with custom attributes", () => {
    const customBodyAttrs = {
      special1: "abc",
      special2: "xyz"
    };
    let action = ActionFactory({
      body: {
        ...baseBody(),
        ...customBodyAttrs
      },
      url: { href: "http://yotpo.com/" }
    });
    const spy = jest.spyOn(<any>global, "fetch");
    action({}, {});

    expect(spy).toHaveBeenLastCalledWith(expect.any(String), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        ...baseBody(),
        ...customBodyAttrs
      }
    });
  });

  it("throws custom error if applied", async () => {
    const customErr = "Smth went wrong!";
    (<any>global).fetch = jest.fn().mockImplementation(() => Promise.reject());
    let action = ActionFactory({
      error: customErr,
      url: { href: "http://yotpo.com/" }
    });

    let error = null;
    try {
      await action({}, {});
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error(customErr));
  });

  it("throws base error", async () => {
    let action = ActionFactory({ url: { href: "http://yotpo.com/" } });
    (<any>global).fetch = jest.fn().mockImplementation(() => Promise.reject());

    let error = null;
    try {
      await action({}, {});
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("fills provided URL with Fillers", async () => {
    const fillers = {
      key: "abc",
      diff: 123
    };
    let action = ActionFactory({
      url: { href: "http://yotpo.com/<key>/smth/<diff>", fillers }
    });

    let targetUrl = `http://yotpo.com/${fillers.key}/smth/${fillers.diff}`;

    const spy = jest.spyOn(<any>global, "fetch");
    action({}, {});

    expect(spy).toHaveBeenLastCalledWith(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        ...baseBody()
      }
    });
  });

  it("runs onSuccess callback", async () => {
    let cbs = {
      onSuccess: () => {}
    };
    const spy = jest.spyOn(cbs, "onSuccess");

    let action = ActionFactory({
      url: { href: "http://yotpo.com/abc" },
      onSuccess: cbs.onSuccess
    });

    await action({}, {});

    expect(spy).toHaveBeenCalled();
  });

  it("runs onFailure callback", async () => {
    (<any>global).fetch = jest.fn().mockImplementation(() => Promise.reject());
    let cbs = {
      onFailure: () => {}
    };
    const spy = jest.spyOn(cbs, "onFailure");

    let action = ActionFactory({
      url: { href: "http://yotpo.com/" },
      onFailure: cbs.onFailure
    });

    try {
      await action({}, {});
    } catch (e) {}
    expect(spy).toHaveBeenCalled();
  });
});
