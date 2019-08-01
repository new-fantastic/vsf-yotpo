import { KEY } from "../const";

export default {
  methods: {
    async voteOnReview(review_id, updown) {
      try {
        if (isNaN(review_id) || typeof review_id !== "number") {
          throw new Error(
            "Yotpo - VoteOnReview - " +
              (review_id ? review_id : "[Empty]") +
              " - is bad value for review_id"
          );
        }
        if (updown !== "up" && updown !== "down") {
          throw new Error(
            "Yotpo - VoteOnReview - " + updown + " - is bad value for `updown`"
          );
        }

        await this.$store.dispatch(`${KEY}/voteOnReview`, {
          review_id,
          updown
        });
      } catch (e) {
        console.error(e.message);
      }
    }
  }
};
