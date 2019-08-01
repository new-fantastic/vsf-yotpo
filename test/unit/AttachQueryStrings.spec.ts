import AttachQueryStrings from "../../helpers/AttachQueryStrings";

describe("AttachQueryStrings", () => {
  const baseUrl = "http://localhost/";

  it("does nothing for empty `queries`", () => {
    expect(AttachQueryStrings(baseUrl, {})).toBe(baseUrl);
  });

  it("attaches one query string", () => {
    expect(
      AttachQueryStrings(baseUrl, {
        key: "value"
      })
    ).toBe(baseUrl + "?key=value");
  });

  it("attaches a few query strings", () => {
    const data = {
      first: "abc",
      second: "xyz"
    };

    let target = baseUrl + "?first=abc&second=xyz";

    expect(AttachQueryStrings(baseUrl, data)).toBe(target);
  });
});
