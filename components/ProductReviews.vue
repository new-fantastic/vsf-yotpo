<template>
  <div class="product-reviews" ref="reviews-wrapper" v-if="customData">
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
        <no-ssr>
          <star-rating
            :increment=0.5
            :read-only=true
            :star-size=18
            v-model=review.score
          />
        </no-ssr>
        <span class="review__score-date">{{review.newDate[0]}}</span>
      </div>
      <div class="review__content">
        <span>{{review.content}}</span>
      </div>
    </div>
    <div
      class="pagination"
      v-if="reviewsCounter"
    >
    <div 
      class="pagination__cta"
      :class="{'pagination__cta--center' : pagination.currentPage === totalPages || pagination.currentPage === 1}"
    >
      <ButtonFull
        class="pagination__button"
        :class="{'pagination__button--full' : pagination.currentPage === totalPages}"
        @click="loadPreviewsReviews"
        v-if="pagination.currentPage > 1"
      >
        {{ $t('Previous') }}
      </ButtonFull>
      <!-- <ButtonFull
        class="pagination__button"
        :class="{'pagination__button--full' : pagination.currentPage === 1}"
        @click="loadMoreReviews"
        v-if="pagination.currentPage !== totalPages"
      >
        {{ $t('Next') }}
      </ButtonFull> -->
    </div>
      <!-- <p 
        class="pagination__counter"
        v-if="totalPages > 1"
      > -->
        <!-- {{ $t('Page') + + $t('of')  }} -->
        <!-- Page {{ this.pagination.currentPage }} of {{ totalPages }}
      </p>
      <div 
        class="pagination__progress-bar"
        v-if="totalPages > 1"
      >
        <span
          class="pagination__progress-bar-inner"
          :style="`width: ${(this.pagination.currentPage / totalPages) * 100}%`"
        />
      </div> -->
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
import StarRating from 'vue-star-rating';
import NoSSR from 'vue-no-ssr';
import ButtonFull from 'theme/components/base/ButtonFull/ButtonFull.vue';

export default {
  data() {
    return {
      pagination: {
        current: 0,
        currentPage: 1,
      }
    }
  },
  props: {
    sku: {
      type: String | Number
    }
  },
  components: {
    StarRating,
    'no-ssr': NoSSR,
    ButtonFull
  },
  computed: {
    reviews() {
      return this.$store.getters["vsf-yotpo/productReviewsById"](this.sku);
    },

    images() {
      return this.$store.getters["vsf-yotpo/productImages"](this.sku);
    },
    customData() {
      return this.reviews ? this.reviews.map(v => {
        const reg = /\d{4}-\d{2}-\d{2}/gm
        const newDate = v.created_at.match(reg);

        return {
          ...v,
          newDate
        }
      }) : null
    },
    reviewsCounter() {
      return this.$store.getters["vsf-yotpo/productBottomlineById"](this.sku).total_review;
    },
    totalPages() {
      const PER_PAGE = 5
      return Math.ceil(this.reviewsCounter / PER_PAGE)
    },
  },
  methods: {
    async loadMoreReviews() {
      try {
        await this.LoadProductReviews(this.sku, { page: ++this.pagination.currentPage });
        this.$emit('scrollTo', this.$refs['reviews-wrapper'])
      } catch (e) {
        console.log(e)
      }
    },
    async loadPreviewsReviews () {
      try {
        await this.LoadProductReviews(this.sku, { page: --this.pagination.currentPage });
        this.$emit('scrollTo', this.$refs['reviews-wrapper'])
      } catch (e) {
        console.log(e)
      }
    }
  },
  mixins: [LoadProductReviews, VoteOnReview, LoadProductPhotos],
  async serverPrefetch() {
    try {
      await Promise.all([
        this.LoadProductReviews(this.sku, { page: this.pagination.currentPage }),
        this.LoadProductPhotos(this.sku)
      ])

      // await this.LoadProductReviews(this.sku);
    } catch (e) {
      console.log(e);
    }
  },
  async mounted() {
    try {
      if (!this.$store.getters["vsf-yotpo/productReviewsById"](this.sku))
        await this.LoadProductReviews(this.sku, { page: this.pagination.currentPage++ });
      if (!this.$store.getters["vsf-yotpo/productImages"](this.sku))
        await this.LoadProductPhotos(this.sku);
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.product-reviews {
  max-width: 400px;
  min-width: 400px;
  @include media('<=md') {
    @include size($max-x: 100%, $min-x: 100%);
  }

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
.pagination {
  @include margin($bottom: 250px, $top: 50px, $left: auto, $right: auto);
  @include text($align: center);
  @include media('<=md') {
    @include margin($top: 37px, $bottom: 58px);
  }

  &__cta {
    @include flex($justify-content: space-between);

    &--center {
      justify-content: center;
    }

  .pagination__button {
    @include size($max-x: 180px !important);
    @include media('<=ms') {
      @include size($max-x: 150px !important);
    }

    &--full {
      @include size($max-x: 350px !important);
    }
  }
  }

  &__counter {
    @include margin($bottom: 10px, $top: 90px);
    @include font(
      $size: 14px,
      $line-height: 14px,
      $letter-spacing: 0.6px,
      $color: $darkgrey
    );
    @include media('<=md') {
      @include margin($top: 10px);
    }
  }

  &__progress-bar {
    @include size($x: 100%, $max-x: 565px, $y: 12px);
    @include background($color: #f7f6f6);
    @include position(relative);
    @include margin(0 auto);
    @include overflow(hidden);
    border-radius: 6.5px;

    &-inner {
      @include size($y: 100%, $x: 0);
      @include position(
      $position: absolute,
      $left: 0,
      );
      @include z-index(1);
      @include background($color: $darkgrey);
      transition: width 0.2s;
    }
  }
}
</style>
