<template>


  <div v-if="screenWidth>700">
    <home-desktop/>
  </div>
  <div v-else>
    <home-mobile/>
  </div>

</template>

<script>
import HomeDesktop from "@/components/HomeDesktop";
import HomeMobile from "@/components/HomeMobile";
export default {
  components: {HomeMobile, HomeDesktop},
  data: () => ({
    screenWidth: window.innerWidth,
  }),
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>