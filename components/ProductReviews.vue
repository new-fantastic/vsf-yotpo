<template>
  <div class="product-reviews" v-if="customData">
    <div class="review" v-for="(review, index) in customData" :key="index">
      <div class="review__author">
        <div class="review__author-avatar">JL</div>
        <span class="review__author-name">
          {{review.user.display_name}}</span>
      </div>
      <div class="review__title">
        <span>{{review.title}}</span>
      </div>
      <div class="review__score">
        <star-rating
          :increment=0.5
          :read-only=true
          :star-size=18
          v-model=review.score
        />
        <span class="review__score-date">{{review.newDate[0]}}</span>
      </div>
      <div class="review__content">
        <span>{{review.content}}</span>
      </div>
    </div>


      <!-- <div>
        <b>Author Type:</b>
        <span>{{review.user.user_type}}</span>
      </div> -->
      <!-- <div>
        <b>Votes up:</b>
        <span>{{review.votes_up}}</span>
        <button @click="VoteOnReview(review.id, 'up', sku)">+</button>
      </div> -->
      <!-- <div>
        <b>Votes down:</b>
        <span>{{review.votes_down}}</span>
        <button @click="VoteOnReview(review.id, 'down', sku)">-</button>
      </div> -->
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script>
import LoadProductReviews from "../inheritable/LoadProductReviews";
import LoadProductPhotos from "../inheritable/LoadProductPhotos";
import VoteOnReview from "../inheritable/VoteOnReview";
import StarRating from 'vue-star-rating'

export default {
  props: {
    sku: {
      type: String | Number
    }
  },
  components: {
    StarRating
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
    },
    customData() {
      return this.reviews.map(v => {
        const reg = /\d{4}-\d{2}-\d{2}/gm
        const newDate = v.created_at.match(reg);

        return {
          ...v,
          newDate
        }
      });
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
  },
};
</script>

<style lang="scss">
.product-reviews {

  .review {
    @include margin($y: 30px);

    &__author {
      @include flex(
        $align-items: center
      );
      @include margin($bottom: 11px);

      &-avatar {
        @include flex(
          $justify-content: center,
          $align-items: center
        );
        @include margin($right: 12px);
        @include size(35px);
        @include font(
          $color: #8c8c8c, 
          $size: 18px, 
          $weight: bold
          );
        @include background($color: #d8d8d8);
        @include border(
          $width: 1px,
          $style: solid,
          $color: #979797
        );
        border-radius: 50%;
      }

      &-name {
        @include font(
          $color: #8c8c8c,
          $size: 18px,
          $letter-spacing: 2.57px
        );
      }
  }
    &__title,
    &__content {
      @include margin($left: 4px);
      @include font(
        $size: 16px,
        $color: #8c8c8c,
        $weight: bold
      );
    }

    &__score {
      @include margin($left: 4px);
      @include flex(
        $align-items: center
      );

      .vue-star-rating-rating-text {
        @include display(none);
      }

      &-date {
      @include margin($left: 5px);
      @include font(
        $size: 13px,
        $color: #8c8c8c,
        $letter-spacing: 1.86px
      );
      }
    }

    &__content {
      @include font($weight: 400);
    }
  }
}
</style>