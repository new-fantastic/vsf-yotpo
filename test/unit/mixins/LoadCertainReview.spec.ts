import LoadCertainReview from "../../../inheritable/LoadCertainReview";
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
  const wrapper = mountMixin(LoadCertainReview, {
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

describe("LoadCertainReview", () => {
  it("fails if review_id is not a number", async () => {
    const { wrapper } = mountProperBase();

    let error = null;
    try {
      await (<any>wrapper.vm).loadCertainReview();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("dispatches action if review_id is okay", async () => {
    const { spy, wrapper } = mountProperBase();
    const review_id = 123;

    let error = null;
    try {
      await (<any>wrapper.vm).loadCertainReview(review_id);
    } catch (e) {
      error = e;
    }
    expect(spy).toHaveBeenCalledWith(`${KEY}/loadCertainReview`, {
      review_id
    });
  });
});
