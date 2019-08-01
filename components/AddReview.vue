<template>
  <div v-bind="$attrs" v-on="$listeners">
    Title:
    <input type="text" v-model="title" />
    Email:
    <input type="text" v-model="email" />
    Name:
    <input type="text" v-model="email" />
    Content:
    <textarea v-model="content" />
    Stars:
    <input type="number" v-model="score" min="1" max="5" />
    <button @click="sendReview">Send</button>
  </div>
</template>

<script>
import AddReview from "../inheritable/AddReview";
export default {
  mixins: [AddReview]
};
</script>