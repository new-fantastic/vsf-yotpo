import { hasSinglelangProperStructure } from "../../helpers/Singlelang";

// To do
// Mock bad config

jest.mock("config", () => ({
  yotpo: {
    app_key: "abc",
    account_id: "123"
  }
}));

describe("Singlelang", () => {
  it("checks structure of config", () => {
    expect(hasSinglelangProperStructure()).toBeTruthy();
  });
});
