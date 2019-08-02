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

  it("siteReviews", () => {
    const content = "content";

    const value = getters.siteReviews(
      {
        widgetSiteReviews: {
          reviews: [content]
        }
      },
      {},
      {},
      {}
    );

    expect(value).toEqual([content]);
  });

  it("siteProducts", () => {
    const content = "content";

    const value = getters.siteProducts(
      {
        widgetSiteReviews: {
          products: [content]
        }
      },
      {},
      {},
      {}
    );

    expect(value).toEqual([content]);
  });

  it("siteBottomline", () => {
    const content = "content";

    const value = getters.siteBottomline(
      {
        widgetSiteReviews: {
          bottomline: [content]
        }
      },
      {},
      {},
      {}
    );

    expect(value).toEqual([content]);
  });

  it("sitePagination", () => {
    const content = "content";

    const value = getters.sitePagination(
      {
        widgetSiteReviews: {
          pagination: [content]
        }
      },
      {},
      {},
      {}
    );

    expect(value).toEqual([content]);
  });
});
