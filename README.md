[![Build Status](https://travis-ci.org/olitaylor/vlightbox.svg?branch=master)](https://travis-ci.org/olitaylor/vlightbox)

# vlightbox

> Simple native Vue.js lightbox component

## Demo
https://olitaylor.github.io/vlightbox/

---

## Compatibility

> **Vue 2.7.x** (final Vue 2 release)

> [!NOTE]
> Vue 2 reached End of Life on December 31, 2023. This package targets Vue 2.7.16, the final stable release. For long-term support, consider migrating to Vue 3.

---

## Installation

#### NPM
```bash
npm install vlightbox
```

#### Register the Component

**Global Registration:**
```js
import Vue from 'vue';
import lightbox from 'vlightbox';

Vue.use(lightbox);
```

**Local Registration:**
```js
import { Lightbox } from 'vlightbox';

export default {
  components: {
    Lightbox
  }
}
```

**TypeScript:**
```typescript
import { Lightbox, LightboxImage } from 'vlightbox';

const images: LightboxImage[] = [
  { id: 1, src: '/path/to/image.jpg', caption: 'My caption' }
];
```

---

## Usage

```html
<template>
  <lightbox 
    :images="images"
    :currentImage.sync="currentImage"
    :overlayActive.sync="overlayActive"
  >
    <div v-for="(image, index) in images" :key="image.id">
      <img :src="image.src" @click="openLightbox(index)">
    </div>
  </lightbox>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, src: 'path/to/image1.jpg', caption: 'First image' },
        { id: 2, src: 'path/to/image2.jpg', caption: 'Second image' },
        { id: 3, src: 'path/to/image3.jpg' }
      ],
      currentImage: 0,
      overlayActive: false
    }
  },
  methods: {
    openLightbox(index) {
      this.currentImage = index;
      this.overlayActive = true;
    }
  }
}
</script>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `Array` | `[]` | Array of image objects with `src` and optional `caption`, `downloadable`, `downloadUrl` |
| `currentImage` | `Number` | `0` | Index of the currently displayed image (supports `.sync`) |
| `overlayActive` | `Boolean` | `false` | Whether the lightbox overlay is visible (supports `.sync`) |
| `loop` | `Boolean` | `true` | Loop back to first/last image at gallery ends |
| `nav` | `Boolean` | `true` | Show next, prev, and close buttons |
| `caption` | `Boolean` | `true` | Display image captions |
| `download` | `Boolean` | `false` | Show download button for images |
| `resetstyles` | `Boolean` | `false` | Remove default gallery styling (overlay unaffected) |

---

## Image Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `src` | `String` | ✓ | URL of the image |
| `id` | `String/Number` | | Unique identifier |
| `caption` | `String` | | Caption text for the image |
| `downloadable` | `Boolean` | | Per-image download override (takes precedence over global `download` prop) |
| `downloadUrl` | `String` | | Alternative URL for downloading (e.g., high-res version) |

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:currentImage` | `Number` | Emitted when navigating between images |
| `update:overlayActive` | `Boolean` | Emitted when overlay opens/closes |
| `close` | - | Emitted when the lightbox is closed |
| `download` | `{ index, image }` | Emitted when download button is clicked |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` Left Arrow | Previous image |
| `→` Right Arrow | Next image |
| `Esc` | Close lightbox |

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm start

# Run tests
npm test

# Build for production
npm run build
```

---

## Security Considerations

When running `npm audit`, you may see vulnerabilities reported in Vue 2 ecosystem packages (`vue`, `vue-template-compiler`, `postcss`, `@vue/test-utils`). These are **development-only dependencies** and do not affect consumers of this package:

- ⚠️ These vulnerabilities exist in Vue 2 core, which reached EOL on December 31, 2023
- ✅ The published npm package does **not** include these dev dependencies
- ✅ Users installing `vlightbox` via npm only receive the compiled bundle
- ℹ️ Fixing these would require migrating to Vue 3 (breaking change)

If your project requires zero vulnerabilities, consider using a Vue 3-compatible lightbox alternative.

---

## Changelog

### v3.0.1
- **Converted to TypeScript** with full type definitions
- **Updated to Vue 2.7.16** (final Vue 2 release)
- **Updated build tooling**: Webpack 5, Babel 7, Jest 29
- **Fixed memory leak**: Event listeners now properly removed on component destroy
- **Improved prop handling**: All props now have proper types and defaults
- **Added events**: Components now emit events for parent synchronization
- **Security updates**: All dependencies updated to fix known vulnerabilities
- **Added comprehensive unit tests** with @vue/test-utils
- **Exported `LightboxImage` interface** for TypeScript users

### v2.0.1
- Initial stable release for Vue 2.3+

---

## License

MIT © [Oliver Taylor](https://github.com/olitaylor)
