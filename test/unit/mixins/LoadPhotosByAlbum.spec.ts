import LoadPhotosByAlbum from "../../../inheritable/LoadPhotosByAlbum";
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
  const wrapper = mountMixin(LoadPhotosByAlbum, {
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

describe("LoadPhotosByAlbum", () => {
  it("fails if album_name is not provided", async () => {
    const { wrapper } = mountProperBase();

    let error = null;
    try {
      await (<any>wrapper.vm).LoadPhotosByAlbum();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
  });

  it("dispatches action if album_name is okay", async () => {
    const { spy, wrapper } = mountProperBase();
    const album_name = 123;

    let error = null;
    try {
      await (<any>wrapper.vm).LoadPhotosByAlbum(album_name);
    } catch (e) {
      error = e;
    }
    expect(spy).toHaveBeenCalledWith(`${KEY}/loadProductReviews`, {
      album_name
    });
  });
});
