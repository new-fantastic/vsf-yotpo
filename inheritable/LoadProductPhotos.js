export default {
  methods: {
    async LoadProductPhotos(sku, additionalFields = {}) {
      if (!sku) {
        throw new Error("Yotpo - LoadProductPhotos - SKU must be provided");
      }
      await this.$store.dispatch("vsf-yotpo/loadProductsImages", {
        sku,
        additionalFields
      });
    }
  }
};
