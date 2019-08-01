import { KEY } from "../";

export default {
  methods: {
    voteOnReview(review_id, updown) {
      this.$store.dispatch(`${KEY}/voteOnReview`, {
        review_id,
        updown
      });
    }
  }
};
