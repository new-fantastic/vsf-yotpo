export default {
  methods: {
    async LoadProductReviews(sku) {
      if (!sku) {
        throw new Error(
          "Yotpo - LoadProductReviews - Review_Id must be a number"
        );
      }
      await this.$store.dispatch("vsf-yotpo/loadProductReviews", {
        sku
      });
    }
  }
};