export interface YotpoState {
  reviews?: object;
  productReviews?: object;
  widgetSiteReviews?: any;
  albums?: object;
  totals: {
    total_reviews: number;
    average_rating: number;
  } | null;
  reviewsPerStoreCounter?: object,
  reviewsPerStore?: any
}
