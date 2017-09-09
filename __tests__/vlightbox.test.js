import { Lightbox } from '../src';
import Vue from 'vue/dist/vue.js';

describe('ExampleComponent', () => {
    Vue.component('lightbox', Lightbox);

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="app">
                <lightbox></lightbox>
            </div>
        `;
    });

    it('can mount', async () => {
        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('check all props at once', async () => {
        
        document.body.innerHTML = `
        <div id="app">
            <lightbox :resetStyles="false" title="Demo Gallery" :images="images" :loop="true" :nav="true" :caption="true"></lightbox>
        </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can accept child gallery item', async () => {
        
        document.body.innerHTML = `
        <div id="app">
            <lightbox :images="images"></lightbox>
        </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });

    it('can accept empty images array', async () => {

        document.body.innerHTML = `
        <div id="app">
            <lightbox :images="emptyImages"></lightbox>
        </div>
        `;

        await createVm();

        expect(document.body.innerHTML).toMatchSnapshot();
    });
});

async function createVm() {
    const vm = new Vue({
        el: '#app',
        data: {
            images: [
                {
                    src: 'https://unsplash.it/500',
                    caption: 'Image 1',
                },
                {
                    src: 'https://unsplash.it/501',
                },
            ],
            emptyImages: []
        }
    });

    await Vue.nextTick(() => {});

    return { app: vm, component: vm.$children[0] };
}
