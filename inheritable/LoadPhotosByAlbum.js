export default {
  methods: {
    async LoadPhotosByAlbum(album_name, additionalFields = {}) {
      if (!album_name) {
        throw new Error(
          "Yotpo - LoadPhotosByAlbum - Review_Id must be a number"
        );
      }
      await this.$store.dispatch("vsf-yotpo/loadPhotosByAlbum", {
        album_name,
        additionalFields
      });
    }
  }
};
