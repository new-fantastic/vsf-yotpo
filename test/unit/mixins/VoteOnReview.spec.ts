import VoteOnReview from "../../../inheritable/VoteOnReview";
import { mountMixin } from "../../../../../../test/unit/utils";
import { KEY } from "../../../const";

jest.mock("@vue-storefront/core/helpers", () => ({
  once: a => {}
}));

const factory = () => {
  const $store = {
    dispatch: () => {}
  };
  const wrapper = mountMixin(VoteOnReview, {
    mocks: {
      $store
    }
  });
  const spy = jest.spyOn($store, "dispatch");

  return { wrapper, spy };
};

describe("VoteOnReview", () => {
  it("dispatches an action for up vote", async () => {
    const { wrapper, spy } = factory();

    const review_id = 124;
    const updown = "up";

    await (<any>wrapper.vm).voteOnReview(review_id, updown);
    expect(spy).toHaveBeenCalledWith(`${KEY}/voteOnReview`, {
      review_id,
      updown
    });
  });

  it("dispatches an action for down vote", async () => {
    const { wrapper, spy } = factory();

    const review_id = 124;
    const updown = "down";

    await (<any>wrapper.vm).voteOnReview(review_id, updown);
    expect(spy).toHaveBeenCalledWith(`${KEY}/voteOnReview`, {
      review_id,
      updown
    });
  });

  it("does not dispatch an action if `updown` contains bad value", async () => {
    const { wrapper, spy } = factory();

    const review_id = 124;
    const updown = "upxxx";

    await (<any>wrapper.vm).voteOnReview(review_id, updown);
    expect(spy).not.toHaveBeenCalled();
  });

  it("does not dispatch an action if `review_id` contains bad value", async () => {
    const { wrapper, spy } = factory();

    let review_id = "abc";
    let updown = "up";

    await (<any>wrapper.vm).voteOnReview(review_id, updown);
    expect(spy).not.toHaveBeenCalled();

    review_id = "";
    updown = "up";

    await (<any>wrapper.vm).voteOnReview(review_id, updown);
    expect(spy).not.toHaveBeenCalled();
  });
});
