<template>
  <div id="app">
    <intro></intro>
    <div class="demo">
      <lightbox :resetStyles="false" title="Demo Gallery" :images="images" :loop="true" :nav="true" :caption="true"></lightbox>
    </div>
  </div>
</template>

<script>
import Intro from './components/Intro';
import Lightbox from './components/vlightbox';

export default {
  name: 'app',
  components: {
    Intro, Lightbox,
  },
  data() {
    return {
      images: [
        {
          src: 'https://unsplash.it/500',
          caption: 'Image 1',
        },
        {
          src: 'https://unsplash.it/501',
          caption: 'Image 2',
        },
        {
          src: 'https://unsplash.it/502',
          caption: 'Image 3',
        },
        {
          src: 'https://unsplash.it/503',
          caption: 'Image 4',
        },
        {
          src: 'https://unsplash.it/504',
          caption: 'Image 5',
        },
        {
          src: 'https://unsplash.it/505',
          caption: 'Image 6',
        },
      ],
    };
  },
};
</script>

<style>
body, html {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.demo {
    background-color: #939393;
    padding: 10px 10px 30px 10px;
    color: #ffffff;
}
</style>
