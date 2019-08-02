import LoadWidgetSiteReviews from "../../../inheritable/LoadWidgetSiteReviews";
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
  const wrapper = mountMixin(LoadWidgetSiteReviews, {
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

describe("LoadWidgetSiteReviews", () => {
  it("dispatches action", async () => {
    const { spy, wrapper } = mountProperBase();
    await (<any>wrapper.vm).LoadWidgetSiteReviews();

    expect(spy).toHaveBeenCalledWith(`${KEY}/loadWidgetSiteReviews`, {
      additionalFields: {}
    });
  });
});
