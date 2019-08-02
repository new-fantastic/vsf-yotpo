import { getters } from "../../../store/getters";

describe("Getters", () => {
  it("reviewById", () => {
    const review_id = 1234;
    const review_content = "content";
    // console.log(getters.reviewById(review_id));

    const value = getters.reviewById(
      {
        reviews: {
          [review_id]: review_content
        }
      },
      {},
      {},
      {}
    )(review_id);

    expect(value).toBe(review_content);
  });
});
