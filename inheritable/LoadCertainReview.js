export default {
  methods: {
    async LoadCertainReview(review_id) {
      if (isNaN(review_id) || !review_id) {
        throw new Error(
          'Yotpo - LoadCertainReview - Review_Id must be a number'
        );
      }
      await this.$store.dispatch('vsf-yotpo/loadCertainReview', {
        review_id
      });
    }
  }
};
