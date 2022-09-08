<template>



    <home-desktop :cloudItems="cloudItems"/>


</template>

<script>
import HomeDesktop from "@/components/HomeDesktop";
export default {
  components: { HomeDesktop},
  data: () => ({
    screenWidth: window.innerWidth,
    cloudItems: [
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
      {date: '2022-01-02',
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        size: 6
      },
      {
        date: '2022-01-02',
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        size: 6
      },
    ],
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