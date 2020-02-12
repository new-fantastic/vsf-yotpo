export default {
  methods: {
    async LoadPhotosByAlbum(album_name, additionalFields = {}) {
      if (!album_name) {
        throw new Error(
          "Yotpo - LoadPhotosByAlbum - album_name must be provided"
        );
      }
      try {
        await this.$store.dispatch("vsf-yotpo/loadPhotosByAlbum", {
          album_name,
          additionalFields
        });
      } catch (err) {
        console.log('Yotpo ', err)
      }
    }
  }
};
