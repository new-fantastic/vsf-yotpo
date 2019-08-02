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

  it("productReviewsById", () => {
    const product_id = 1234;
    const productReview = "content";

    const value = getters.productReviewsById(
      {
        productReviews: {
          [product_id]: {
            reviews: [productReview]
          }
        }
      },
      {},
      {},
      {}
    )(product_id);

    expect(value).toEqual([productReview]);
  });

  it("productDataById", () => {
    const product_id = 1234;
    const product = "content";

    const value = getters.productDataById(
      {
        productReviews: {
          [product_id]: {
            products: [product]
          }
        }
      },
      {},
      {},
      {}
    )(product_id);

    expect(value).toEqual([product]);
  });
});
