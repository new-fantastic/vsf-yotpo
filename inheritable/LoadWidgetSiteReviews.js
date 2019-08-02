export default {
  methods: {
    async LoadWidgetSiteReviews() {
      await this.$store.dispatch("vsf-yotpo/loadWidgetSiteReviews");
    }
  }
};
