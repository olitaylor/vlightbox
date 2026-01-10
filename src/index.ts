import { PluginObject, VueConstructor } from 'vue';
import Lightbox from './components/Lightbox.vue';

/**
 * Represents an image in the lightbox gallery
 */
export interface LightboxImage {
    /** Unique identifier for the image */
    id?: number | string;
    /** Path or URL to the image */
    src: string;
    /** Optional caption to display below the image */
    caption?: string;
}

export interface VLightboxPlugin extends PluginObject<never> {
    install: (Vue: VueConstructor) => void;
}

const plugin: VLightboxPlugin = {
    install(Vue) {
        Vue.component('Lightbox', Lightbox);
    }
};

export default plugin;
export { Lightbox };
