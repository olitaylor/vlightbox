import { PluginObject } from 'vue';
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
    /** Whether this specific image can be downloaded (overrides global download prop) */
    downloadable?: boolean;
    /** Optional different URL for downloading (e.g., high-res version) */
    downloadUrl?: string;
}

export interface VLightboxPlugin extends PluginObject<never> {
    install: (Vue: any) => void;
}

const plugin: VLightboxPlugin = {
    install(Vue) {
        Vue.component('Lightbox', Lightbox);
    }
};

export default plugin;
export { Lightbox };
