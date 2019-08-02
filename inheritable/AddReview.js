import { KEY } from "../const";

export default {
  data() {
    return {
      title: "",
      content: "",
      email: "",
      name: "",
      score: null,
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

        for (let key of Object.keys(payload)) {
          if (payload[key].length < 1) {
            throw new TypeError(
              "Yotpo - AddReview - " + key + " - cannot be empty"
            );
          }
        }

        for (let field of optionalFields) {
          if (this[field]) {
            payload[field] = this[field];
          }
        }

        await this.$store.dispatch(`${KEY}/addReview2`, payload);
        this.resetForm();
        this.status = true;
      } catch (e) {
        this.status = false;
        console.error(e.message);
      }
    },

    resetForm() {
      this.title = "";
      this.content = "";
      this.email = "";
      this.name = "";
      this.score = null;
    }
  }
};
