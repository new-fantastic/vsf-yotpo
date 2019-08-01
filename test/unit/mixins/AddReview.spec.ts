import AddReview from "../../../inheritable/AddReview";
import { mountMixin } from "../../../../../../test/unit/utils";
import { KEY } from "../../../const";

jest.mock("@vue-storefront/core/helpers", () => ({
  once: a => {}
}));

const mountProperBase = propsData => {
  const $store = {
    dispatch: () => {}
  };

  const spy = jest.spyOn($store, "dispatch");
  const wrapper = mountMixin(AddReview, {
    propsData,
    mocks: {
      $store
    }
  });

  (<any>wrapper.vm).title = "Wow";
  (<any>wrapper.vm).content = "I am so amazed";
  (<any>wrapper.vm).email = "john@gmail.com";
  (<any>wrapper.vm).name = "John Sho";
  (<any>wrapper.vm).score = 4;

  const payload = {
    sku: propsData.sku,
    product_title: propsData.productName,
    product_url: propsData.url,
    product_image_url: propsData.imageUrl,
    product_description: propsData.productDescription,
    display_name: (<any>wrapper.vm).name,
    email: (<any>wrapper.vm).email,
    review_content: (<any>wrapper.vm).content,
    review_title: (<any>wrapper.vm).title,
    review_score: (<any>wrapper.vm).score
  };

  return {
    $store,
    spy,
    wrapper,
    payload
  };
};

describe("AddReview", () => {
  const propsData = {
    sku: "random-sku",
    productName: "Socks",
    url: "http://localhost/some-socks",
    imageUrl: "http://localhost/some-socks/img",
    productDescription: "Best socks eu"
  };

  it("fails if proper data was not provided", async () => {
    const wrapper = mountMixin(AddReview, {
      propsData,
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    });

    await (<any>wrapper.vm).sendReview();
    expect((<any>wrapper.vm).status).toBeFalsy();
  });

  it("dispatches an action if everything is ok", async () => {
    const { payload, wrapper, spy } = mountProperBase(propsData);

    await (<any>wrapper.vm).sendReview();
    expect((<any>wrapper.vm).status).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(`${KEY}/addReview`, payload);
  });

  it("properly adds optional attributes", async () => {
    const customParams = {
      signature: "abc",
      time_stamp: "bcd",
      reviewer_type: "abc",
      order_metedata: {},
      product_metadata: {},
      customer_metadata: {}
    };

    const { payload, wrapper, spy } = mountProperBase({
      ...propsData,
      ...customParams
    });
    const optionalFields = [
      "signature",
      "time_stamp",
      "reviewer_type",
      "order_metadata",
      "product_metadata",
      "customer_metadata"
    ];

    for (let field of optionalFields) {
      if ((<any>wrapper.vm)[field]) {
        payload[field] = (<any>wrapper.vm)[field];
      }
    }

    await (<any>wrapper.vm).sendReview();
    expect((<any>wrapper.vm).status).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(`${KEY}/addReview`, payload);
  });

  it("resets form after send", async () => {
    const { payload, wrapper, spy } = mountProperBase(propsData);

    await (<any>wrapper.vm).sendReview();
    expect((<any>wrapper.vm).title).toBe("");
    expect((<any>wrapper.vm).content).toBe("");
    expect((<any>wrapper.vm).email).toBe("");
    expect((<any>wrapper.vm).name).toBe("");
    expect((<any>wrapper.vm).score).toBeNull();
  });
});
