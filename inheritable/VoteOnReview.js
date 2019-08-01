import { KEY } from "../";

export default {
  methods: {
    async voteOnReview(review_id, updown) {
      await this.$store.dispatch(`${KEY}/voteOnReview`, {
        review_id,
        updown
      });
    }
  }
};
