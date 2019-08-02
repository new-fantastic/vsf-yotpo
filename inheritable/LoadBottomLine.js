export default {
  methods: {
    async LoadBottomLine(sku) {
      if (!sku) {
        throw new Error("Yotpo - LoadBottomLine - Review_Id must be a number");
      }
      await this.$store.dispatch("vsf-yotpo/loadBottomLine", {
        sku
      });
    }
  }
};
