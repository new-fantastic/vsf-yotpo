<template>
  <div class="product-reviews" v-if="reviews">
    <div class="review" v-for="(review, index) in reviews" :key="index">
      <div>
        <b>Title:</b>
        <span>{{review.title}}</span>
      </div>
      <div>
        <b>Content:</b>
        <span>{{review.content}}</span>
      </div>
      <div>
        <b>Created At:</b>
        <span>{{review.created_at}}</span>
      </div>
      <div>
        <b>Author:</b>
        <span>{{review.user.display_name}}</span>
      </div>
      <div>
        <b>Author Type:</b>
        <span>{{review.user.user_type}}</span>
      </div>
      <div>
        <b>Votes up:</b>
        <span>{{review.votes_up}}</span>
        <button @click="VoteOnReview(review.id, 'up', sku)">+</button>
      </div>
      <div>
        <b>Votes down:</b>
        <span>{{review.votes_down}}</span>
        <button @click="VoteOnReview(review.id, 'down', sku)">-</button>
      </div>
    </div>
    <div>
      <h3>Bottomline:</h3>
      <div>
        <b>Total review:</b>
        <span>{{bottomline.total_review}}</span>
      </div>
      <div>
        <b>Average score:</b>
        <span>{{bottomline.average_score}}</span>
      </div>
      <div>
        <b>Total organic reviews:</b>
        <span>{{bottomline.total_organic_reviews}}</span>
      </div>
      <div>
        <b>Organic average score:</b>
        <span>{{bottomline.organic_average_score}}</span>
      </div>
      <div>
        <b>Star distribution:</b>
        <span>{{bottomline.star_distribution}}</span>
      </div>
    </div>
    <div>
      <h3>Photos</h3>
      <div v-for="i in images">Url: {{i}}</div>
      <h4 v-if="images === null">No photos found</h4>
    </div>
  </div>
</template>

<script>
import LoadProductReviews from "../inheritable/LoadProductReviews";
import LoadProductPhotos from "../inheritable/LoadProductPhotos";
import VoteOnReview from "../inheritable/VoteOnReview";

export default {
  props: {
    sku: {
      type: String | Number
    }
  },
  computed: {
    reviews() {
      return this.$store.getters["vsf-yotpo/productReviewsById"](this.sku);
    },
    bottomline() {
      return this.$store.getters["vsf-yotpo/productBottomlineById"](this.sku);
    },
    images() {
      return this.$store.getters["vsf-yotpo/productImages"](this.sku);
    }
  },
  mixins: [LoadProductReviews, VoteOnReview, LoadProductPhotos],
  async serverPrefetch() {
    try {
      await this.LoadProductReviews(this.sku);
      await this.LoadProductPhotos(this.sku);
    } catch (e) {
      console.log(e);
    }
  },
  async created() {
    try {
      if (!this.$store.getters["vsf-yotpo/productReviewsById"](this.sku))
        await this.LoadProductReviews(this.sku);
      if (!this.$store.getters["vsf-yotpo/productImages"](this.sku))
        await this.LoadProductPhotos(this.sku);
    } catch (e) {
      console.log(e);
    }
    console.log(this.$store.state)
  }
};
</script>

<style>
.review {
  padding: 20px;
}
.product-reviews {
  display: flex;
  flex-wrap: wrap;
}
</style>