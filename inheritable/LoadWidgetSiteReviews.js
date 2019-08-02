export default {
  methods: {
    async LoadWidgetSiteReviews(additionalFields = {}) {
      await this.$store.dispatch(
        "vsf-yotpo/loadWidgetSiteReviews",
        additionalFields
      );
    }
  }
};
