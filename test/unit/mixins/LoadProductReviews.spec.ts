import LoadProductReviews from "../../../inheritable/LoadProductReviews";
import { mountMixin } from "../../../../../../test/unit/utils";
import { KEY } from "../../../const";

jest.mock("@vue-storefront/core/helpers", () => ({
  once: a => {}
}));

const mountProperBase = () => {
  const $store = {
    dispatch: () => {}
  };

  const spy = jest.spyOn($store, "dispatch");
  const wrapper = mountMixin(LoadProductReviews, {
    mocks: {
      $store
    }
  });

  return {
    $store,
    spy,
    wrapper
  };
};

describe("LoadProductReviews", () => {
  it("fails if sku is not provided", async () => {
    const { wrapper } = mountProperBase();

    let error = null;
    try {
      await (<any>wrapper.vm).LoadProductReviews();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("dispatches action if sku is okay", async () => {
    const { spy, wrapper } = mountProperBase();
    const sku = 123;

    let error = null;
    try {
      await (<any>wrapper.vm).LoadProductReviews(sku);
    } catch (e) {
      error = e;
    }
    expect(spy).toHaveBeenCalledWith(`${KEY}/loadProductReviews`, {
      sku,
      additionalFields: {}
    });
  });
});
