import { KEY } from "../";

export default {
  data() {
    return {
      title: "Yeah",
      content: "Wonderful!",
      email: "john@ab.pl",
      name: "John Smith",
      score: 1,
      status: null
    };
  },
  props: {
    sku: {
      required: true,
      type: [Number, String],
      validator(value) {
        return /^[a-zA-Z0-9_-]*$/.test(value);
      }
    },
    url: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productDescription: {
      type: String,
      required: true
    },
    // optional
    signature: String,
    time_stamp: String,
    reviewer_type: String,
    order_metadata: Object,
    product_metadata: Object,
    customer_metadata: Object
  },
  methods: {
    async sendReview() {
      try {
        const optionalFields = [
          "signature",
          "time_stamp",
          "reviewer_type",
          "order_metadata",
          "product_metadata",
          "customer_metadata"
        ];
        const payload = {
          sku: this.sku,
          product_title: this.productName,
          product_url: this.url,
          product_image_url: this.imageUrl,
          product_description: this.productDescription,
          display_name: this.name,
          email: this.email,
          review_content: this.content,
          review_title: this.title,
          review_score: this.score
        };

        for (let field of optionalFields) {
          if (this[field]) {
            payload[field] = this[field];
          }
        }

        await this.$store.dispatch(`${KEY}/addReview`, payload);

        this.resetForm();

        status = true;
      } catch (e) {
        console.error(e);
        status = false;
      }
    },

    resetForm() {
      this.title = "Yeah";
      this.content = "Wonderful!";
      this.email = "john@ab.pl";
      this.name = "John Smith";
      this.score = 1;
      this.status = null;
    }
  }
};
