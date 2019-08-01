import {
  isMultilangSet,
  hasMultilangProperStructure
} from "../../helpers/Multilang";

// To do
// Mock bad config

jest.mock("config", () => ({
  yotpo: {
    langs: {
      de: {
        app_key: "abc",
        account_id: "123"
      },
      it: {
        app_key: "abc",
        account_id: "123"
      }
    }
  }
}));

describe("Multilang", () => {
  it("checks is multilang set", () => {
    expect(isMultilangSet()).toBeTruthy();
  });

  it("checks structure of config", () => {
    expect(hasMultilangProperStructure()).toBeTruthy();

    expect(() => {
      hasMultilangProperStructure({
        yotpo: {
          langs: {
            de: {},
            it: {}
          }
        }
      });
    }).toThrow();
  });
});
