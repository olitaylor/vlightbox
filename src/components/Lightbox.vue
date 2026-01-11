<template>
  <div :class="{ 'vue-lightbox' : !resetstyles }">
    <slot></slot>
    <div class="lightbox-overlay" v-if="overlayActive" @click.self="closeOverlay">
      <div class="holder">
        <img :src="images[currentImage].src">
        <div class="nav" v-if="nav">
          <a class="close" @click="closeOverlay">
            <span>&times;</span>
          </a>
          <a 
            v-if="showDownloadButton" 
            class="download" 
            @click="downloadImage"
            title="Download image"
          >
            <span class="download-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </span>
          </a>
          <a class="prev" @click="prevImage">
            <span>&#8592;</span>
          </a>
          <a class="next" @click="nextImage">
            <span>&#8594;</span>
          </a>
        </div>
        <p v-if="caption && images[currentImage].caption">{{ images[currentImage].caption }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export interface LightboxImage {
  /** Unique identifier for the image */
  id?: number | string;
  /** Path or URL to the image */
  src: string;
  /** Optional caption to display below the image */
  caption?: string;
  /** Whether this specific image can be downloaded (overrides global download prop) */
  downloadable?: boolean;
  /** Optional different URL for downloading (e.g., high-res version) */
  downloadUrl?: string;
}

export default Vue.extend({
  name: 'Lightbox',

  props: {
    resetstyles: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    images: {
      type: Array as PropType<LightboxImage[]>,
      default: (): LightboxImage[] => []
    },
    loop: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    nav: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    caption: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    download: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    currentImage: {
      type: Number as PropType<number>,
      default: 0
    },
    overlayActive: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  data() {
    return {
      _keydownHandler: null as ((e: KeyboardEvent) => void) | null
    };
  },

  computed: {
    /**
     * Determines if download button should be shown for current image
     * Per-image downloadable property takes precedence over global download prop
     */
    showDownloadButton(): boolean {
      const currentImg = this.images[this.currentImage];
      if (!currentImg) return false;
      
      // If image has explicit downloadable property, use it
      if (typeof currentImg.downloadable === 'boolean') {
        return currentImg.downloadable;
      }
      
      // Otherwise use global download prop
      return this.download;
    },

    /**
     * Gets the download URL for current image
     * Uses downloadUrl if specified, otherwise falls back to src
     */
    currentDownloadUrl(): string {
      const currentImg = this.images[this.currentImage];
      if (!currentImg) return '';
      return currentImg.downloadUrl || currentImg.src;
    }
  },

  mounted(): void {
    this._keydownHandler = (e: KeyboardEvent): void => {
      this.handleGlobalKeyDown(e);
    };
    window.addEventListener('keydown', this._keydownHandler);
  },

  beforeDestroy(): void {
    if (this._keydownHandler) {
      window.removeEventListener('keydown', this._keydownHandler);
    }
  },

  methods: {
    nextImage(): void {
      let newIndex: number;
      if (this.currentImage === this.images.length - 1) {
        if (this.loop) {
          newIndex = 0;
        } else {
          return;
        }
      } else {
        newIndex = this.currentImage + 1;
      }
      this.$emit('update:currentImage', newIndex);
    },

    prevImage(): void {
      let newIndex: number;
      if (this.currentImage === 0) {
        if (this.loop) {
          newIndex = this.images.length - 1;
        } else {
          return;
        }
      } else {
        newIndex = this.currentImage - 1;
      }
      this.$emit('update:currentImage', newIndex);
    },

    closeOverlay(): void {
      this.$emit('update:overlayActive', false);
      this.$emit('close');
    },

    /**
     * Downloads the current image
     * Creates a temporary anchor element to trigger the download
     */
    downloadImage(): void {
      const url = this.currentDownloadUrl;
      if (!url) return;

      // Emit download event for tracking/analytics
      this.$emit('download', {
        index: this.currentImage,
        image: this.images[this.currentImage]
      });

      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = this.getFilenameFromUrl(url);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    /**
     * Extracts filename from URL for download
     */
    getFilenameFromUrl(url: string): string {
      try {
        const pathname = new URL(url, window.location.origin).pathname;
        const filename = pathname.split('/').pop() || 'image';
        return filename;
      } catch {
        return 'image';
      }
    },

    handleGlobalKeyDown(e: KeyboardEvent): void {
      switch (e.keyCode) {
        case 37: // Left arrow
          this.prevImage();
          break;
        case 39: // Right arrow
          this.nextImage();
          break;
        case 27: // Escape
          this.closeOverlay();
          break;
        default:
          break;
      }
    }
  }
});
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
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
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
      background-color: rgba(0, 0, 0, 0.4);
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

      .next,
      .prev {
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

      .download {
        left: 10px;
        top: 0;
        opacity: 0.6;
        z-index: 1000000;
        position: absolute;
        text-align: left;
        box-sizing: border-box;
        padding: 2px;
        transition: opacity 0.2s ease, transform 0.2s ease;

        &:hover {
          opacity: 1;
          transform: translateY(2px);
        }

        .download-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
