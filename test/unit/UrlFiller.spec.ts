import UrlFiller from "../../helpers/UrlFiller";

describe("UrlFiller", () => {
  it("returns url itself by default", () => {
    const url = "http://localhost.pl/";
    expect(UrlFiller(url)).toBe(url);
  });

  it("replaces requested variables", () => {
    const url = "http://localhost.pl/<key>/smth/<other>";
    const replacers = {
      key: "first",
      other: "second"
    };
    const target = url
      .replace("<key>", replacers.key)
      .replace("<other>", replacers.other);

    const final = UrlFiller(url, replacers);
    expect(final).toBe(target);
  });
});
