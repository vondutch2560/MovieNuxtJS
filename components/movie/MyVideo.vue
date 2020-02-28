<template>
  <div class="row vid">
    <div ref="myvideo" class="my-video">
      <video controls="controls" autoplay="autoplay">
        <source :src="linkMovie + '.mp4'" type="video/mp4" />
        <track
          :src="linkMovie + '.vtt'"
          label="Vietnam"
          kind="subtitles"
          srclang="vi"
          default="default"
        />
      </video>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentMovie: { type: [String], default: '' }
  },

  computed: {
    linkMovie() {
      const currentMovie = this.currentMovie.trim().replace(/\s/g, '%20')
      this.resizeVideo()
      return currentMovie !== ''
        ? `http://vonvon.xyz:5000/${currentMovie}/${currentMovie}`
        : this.currentMovie
    }
  },

  methods: {
    resizeVideo() {
      console.log(this.$refs.myvideo)
    }
  }
}
</script>

<style></style>
