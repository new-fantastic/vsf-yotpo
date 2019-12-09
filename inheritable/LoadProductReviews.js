export default {
  methods: {
    async LoadProductReviews (sku, additionalFields = {}) {
      if (!sku) {
        throw new Error('Yotpo - LoadProductReviews - SKU must be provided');
      }
      await this.$store.dispatch('vsf-yotpo/loadProductReviews', {
        sku,
        ...additionalFields
      });
    }
  }
};
