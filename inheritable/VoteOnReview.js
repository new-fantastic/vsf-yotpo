import { KEY } from '../const';

export default {
  methods: {
    async VoteOnReview (review_id, updown, productSku = 0) {
      try {
        if (isNaN(review_id) || typeof review_id !== 'number') {
          throw new Error(
            'Yotpo - VoteOnReview - ' +
              (review_id || '[Empty]') +
              ' - is bad value for review_id'
          );
        }
        if (updown !== 'up' && updown !== 'down') {
          throw new Error(
            'Yotpo - VoteOnReview - ' + updown + ' - is bad value for `updown`'
          );
        }
        const payload = {
          review_id,
          updown
        };
        if (productSku !== 0) {
          payload.sku = productSku;
        }

        await this.$store.dispatch(`${KEY}/voteOnReview`, payload);
      } catch (e) {
        console.error(e.message);
      }
    }
  }
};
