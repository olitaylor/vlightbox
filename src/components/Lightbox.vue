<template>
  <div :class="{ 'vue-lightbox' : !resetstyles }">
    <h1 v-if="title">{{ title }}</h1>
    <ul>
      <li v-for="(image, index) in images">
          <img :src="image.src" :alt="image.caption" @click="clickImage(index)">
      </li>       
     </ul>
     <div class="lightbox-overlay" v-if="overlayActive" @click.self="closeOverlay">
      <div class="holder">
        <img :src="images[currentImage].src"/>
        <div class="nav" v-if="nav">
          <a class="close" nohref @click="closeOverlay"><span>&times;</span></a>
          <a class="prev" nohref @click="prevImage"><span>&#8592;</span></a>
          <a class="next" nohref @click="nextImage"><span>&#8594;</span></a>
        </div>
        <p v-if="caption && images[currentImage].caption">{{ images[currentImage].caption }}</p>
      </div>
     </div>
  </div>
</template>

<script>

export default {
  props: {
    resetstyles: {
      default: false,
      type: Boolean,
    },
    title: {
      type: String,
    },
    images: {
      type: Array,
    },
    loop: {
      default: true,
      type: Boolean,
    },
    nav: {
      default: true,
      type: Boolean,
    },
    caption: {
      deftault: true,
      type: Boolean,
    },
  },
  data() {
    return {
      currentImage: null,
      overlayActive: false,
    };
  },
  mounted() {
    const self = this;
    window.addEventListener('keydown', (e) => {
      self.handleGlobalKeyDown(e);
    });
  },
  methods: {
    clickImage(index) {
      this.currentImage = index;
      this.overlayActive = true;
    },
    nextImage() {
      if (this.currentImage === (this.images.length - 1)) {
        if (this.loop) {
          this.currentImage = 0;
        }
      } else {
        this.currentImage += 1;
      }
    },
    prevImage() {
      if (this.currentImage === 0) {
        if (this.loop) {
          this.currentImage = (this.images.length - 1);
        }
      } else {
        this.currentImage -= 1;
      }
    },
    closeOverlay() {
      this.overlayActive = false;
    },
    handleGlobalKeyDown(e) {
      switch (e.keyCode) {
        case 37: this.prevImage(); break;
        case 39: this.nextImage(); break;
        case 27: this.closeOverlay(); break;
        default: break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.vue-lightbox ul {
	list-style: none;
	margin: 0 auto;
	padding: 0;
	display: block;
	max-width: 780px;
	text-align: center;
	
	li {
		display: inline-block;
		padding: 5px;
		background: ghostwhite;
		margin: 10px;
	
        img {
            display: block;
            width: 200px;
        }
	}
}

.lightbox-overlay {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.9);
	text-align: center;
	padding: 20px;
    box-sizing: border-box;
	
	.holder {
		max-width: 600px;
		margin: 0 auto;
		position: relative;
        max-height: 100vh;
		
		img {
			width: 100%;
			max-width: 600px;
			cursor: pointer;
			box-sizing: border-box;
			display: block;
            max-height: 100vh;
		}
			
		p {
			color: #ffffff;
			margin: 0;
			background-color: rgba(0,0,0,0.4);
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			box-sizing: border-box;
			padding: 10px;
		}
		.nav {
			max-width: 600px;
			margin: 0 auto;
			font-size: 14px;

			a {
				color: white;
				opacity: 0.3;
				-webkit-user-select: none;    
				cursor: pointer;

				&:hover {
					opacity: 1;
				}
			}
			
			.next, .prev {
				position: absolute;
				top: 0;
				bottom: 0;
				padding: 10px;
				width: 50%;
				box-sizing: border-box;
				font-size: 40px;

				span {
					top: 50%;
					transform: translateY(50%);
					position: relative;
				}
			}

			.next {
				right: 0;
				text-align: right;
			}

			.prev {
				left: 0;
				text-align: left;
			}
			.close {
				right: 10px;
				top: 0;
				font-size: 30px;
  				opacity: 0.6;
				z-index: 1000000;
				position: absolute;
				text-align: left;
				box-sizing: border-box;
				
				&:hover {
					opacity: 1;
				}
			}
		}
	}
}
</style>