[![Build Status](https://travis-ci.org/olitaylor/vlightbox.svg?branch=master)](https://travis-ci.org/olitaylor/vlightbox)


# vlightbox

> Simple native Vue.js lightbox

## Demo
https://olitaylor.github.io/vlightbox/

## Install

###### Vue Compatibility
> Compatible with Vue 2.0

#### NPM
```bash
$ npm install vlightbox
```

Register the component

```js
import lightbox from 'vlightbox';
Vue.use(lightbox);
```

Basic markup should look like this

```html
<lightbox :currentImage="currentImageFather"
          :overlayActive="overlayActiveFather"
          >
          <div v-for="(image, index) in images" :key="image.id">
                <img src="image.src" v-on:click="clickImage(index)">
          </div>
</lightbox>

<script>
export default {
    data () {
        return {
             images: [
                {
                    id: 1,
                    src:"path/to/image"
                },
            ],
            currentImageFather: null,
            overlayActiveFather: false,
        }
    },
    methods: {
        clickImage(index) {
            this.currentImageFather = index
            this.overlayActiveFather = true
        }
    }
}
</script>
```



Other options are;

Remove all styles to the image gallery, overlay not included
- Default: false
```js
:resetstyles="false" 
```

Loop back to the first image when at the end of the gallery
- Default: true
```js
:loop="true" 
```

Show next, back and close buttons on overlay
- Default: true
```js
:nav="true" 
```

Show captions on images with the caption property
- Default: true
```js
:caption="true"
```

## More features coming soon!
