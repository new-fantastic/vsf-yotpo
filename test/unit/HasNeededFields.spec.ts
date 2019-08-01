import HasNeededFields from "../../helpers/HasNeededFields";

describe("HasNeededFields", () => {
  it("returns true if needed fields are provided", () => {
    const obj = {
      first: "abc",
      second: "xyz"
    };

    const needed = ["first", "second"];

    expect(HasNeededFields(obj, needed)).toBeTruthy();
  });

  it("returns false if needed fields are not provided", () => {
    const obj = {
      first: "abc",
      second: "xyz"
    };

    const needed = ["prov", "not"];

    expect(HasNeededFields(obj, needed)).toBeFalsy();
  });
});
