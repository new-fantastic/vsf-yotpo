<template>
  <div>
    <h2>Add Review</h2>
    <div v-bind="$attrs" v-on="$listeners" v-if="status == null">
      Title:
      <input type="text" v-model="title" />
      <br />Email:
      <input type="text" v-model="email" />
      <br />Name:
      <input type="text" v-model="name" />
      <br />Content:
      <textarea v-model="content" />
      <br />Stars:
      <input type="number" v-model="score" min="1" max="5" />
      <br />
      <button @click="sendReview">Send</button>
    </div>
    <div v-else-if="status === true">Success!</div>
    <div v-else>Something went wrong, sorry :/</div>
  </div>
</template>

<script>
import AddReview from "../inheritable/AddReview";
export default {
  mixins: [AddReview]
};
</script>