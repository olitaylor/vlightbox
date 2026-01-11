import { shallowMount } from '@vue/test-utils';
import Lightbox from '../src/components/Lightbox.vue';

describe('Lightbox Component', () => {
    const mockImages = [
        { id: 1, src: '/path/to/image1.jpg', caption: 'Image 1 Caption' },
        { id: 2, src: '/path/to/image2.jpg', caption: 'Image 2 Caption' },
        { id: 3, src: '/path/to/image3.jpg' }
    ];

    const createWrapper = (props = {}) => {
        return shallowMount(Lightbox, {
            propsData: {
                images: mockImages,
                currentImage: 0,
                overlayActive: true,
                ...props
            }
        });
    };

    describe('Rendering', () => {
        it('renders the component', () => {
            const wrapper = createWrapper();
            expect(wrapper.exists()).toBe(true);
        });

        it('renders the overlay when overlayActive is true', () => {
            const wrapper = createWrapper({ overlayActive: true });
            expect(wrapper.find('.lightbox-overlay').exists()).toBe(true);
        });

        it('does not render the overlay when overlayActive is false', () => {
            const wrapper = createWrapper({ overlayActive: false });
            expect(wrapper.find('.lightbox-overlay').exists()).toBe(false);
        });

        it('displays the current image', () => {
            const wrapper = createWrapper({ currentImage: 0 });
            const img = wrapper.find('.holder img');
            expect(img.attributes('src')).toBe('/path/to/image1.jpg');
        });

        it('displays navigation when nav prop is true', () => {
            const wrapper = createWrapper({ nav: true });
            expect(wrapper.find('.nav').exists()).toBe(true);
        });

        it('hides navigation when nav prop is false', () => {
            const wrapper = createWrapper({ nav: false });
            expect(wrapper.find('.nav').exists()).toBe(false);
        });

        it('displays caption when caption prop is true and image has caption', () => {
            const wrapper = createWrapper({ currentImage: 0, caption: true });
            expect(wrapper.find('.holder p').exists()).toBe(true);
            expect(wrapper.find('.holder p').text()).toBe('Image 1 Caption');
        });

        it('does not display caption when caption prop is false', () => {
            const wrapper = createWrapper({ currentImage: 0, caption: false });
            expect(wrapper.find('.holder p').exists()).toBe(false);
        });

        it('does not display caption when image has no caption property', () => {
            const wrapper = createWrapper({ currentImage: 2, caption: true });
            expect(wrapper.find('.holder p').exists()).toBe(false);
        });
    });

    describe('Navigation', () => {
        it('emits update:currentImage with next index when nextImage is called', async () => {
            const wrapper = createWrapper({ currentImage: 0 });
            await wrapper.find('.next').trigger('click');
            expect(wrapper.emitted('update:currentImage')).toBeTruthy();
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([1]);
        });

        it('emits update:currentImage with prev index when prevImage is called', async () => {
            const wrapper = createWrapper({ currentImage: 1 });
            await wrapper.find('.prev').trigger('click');
            expect(wrapper.emitted('update:currentImage')).toBeTruthy();
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([0]);
        });

        it('loops to first image from last when loop is true', async () => {
            const wrapper = createWrapper({ currentImage: 2, loop: true });
            await wrapper.find('.next').trigger('click');
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([0]);
        });

        it('loops to last image from first when loop is true', async () => {
            const wrapper = createWrapper({ currentImage: 0, loop: true });
            await wrapper.find('.prev').trigger('click');
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([2]);
        });

        it('does not loop when loop is false - at end', async () => {
            const wrapper = createWrapper({ currentImage: 2, loop: false });
            await wrapper.find('.next').trigger('click');
            expect(wrapper.emitted('update:currentImage')).toBeFalsy();
        });

        it('does not loop when loop is false - at start', async () => {
            const wrapper = createWrapper({ currentImage: 0, loop: false });
            await wrapper.find('.prev').trigger('click');
            expect(wrapper.emitted('update:currentImage')).toBeFalsy();
        });
    });

    describe('Close Functionality', () => {
        it('emits update:overlayActive with false when closing', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.close').trigger('click');
            expect(wrapper.emitted('update:overlayActive')).toBeTruthy();
            expect(wrapper.emitted('update:overlayActive')[0]).toEqual([false]);
        });

        it('emits close event when closing', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.close').trigger('click');
            expect(wrapper.emitted('close')).toBeTruthy();
        });

        it('closes when clicking on overlay background', async () => {
            const wrapper = createWrapper();
            await wrapper.find('.lightbox-overlay').trigger('click');
            expect(wrapper.emitted('update:overlayActive')).toBeTruthy();
            expect(wrapper.emitted('update:overlayActive')[0]).toEqual([false]);
        });
    });

    describe('Keyboard Navigation', () => {
        it('calls nextImage on right arrow key', () => {
            const wrapper = createWrapper({ currentImage: 0 });
            const event = new KeyboardEvent('keydown', { keyCode: 39 });
            wrapper.vm.handleGlobalKeyDown(event);
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([1]);
        });

        it('calls prevImage on left arrow key', () => {
            const wrapper = createWrapper({ currentImage: 1 });
            const event = new KeyboardEvent('keydown', { keyCode: 37 });
            wrapper.vm.handleGlobalKeyDown(event);
            expect(wrapper.emitted('update:currentImage')[0]).toEqual([0]);
        });

        it('calls closeOverlay on escape key', () => {
            const wrapper = createWrapper();
            const event = new KeyboardEvent('keydown', { keyCode: 27 });
            wrapper.vm.handleGlobalKeyDown(event);
            expect(wrapper.emitted('update:overlayActive')[0]).toEqual([false]);
        });
    });

    describe('Props', () => {
        it('has default resetstyles value of false', () => {
            const wrapper = createWrapper();
            expect(wrapper.props('resetstyles')).toBe(false);
        });

        it('applies vue-lightbox class when resetstyles is false', () => {
            const wrapper = createWrapper({ resetstyles: false });
            expect(wrapper.find('.vue-lightbox').exists()).toBe(true);
        });

        it('does not apply vue-lightbox class when resetstyles is true', () => {
            const wrapper = createWrapper({ resetstyles: true });
            expect(wrapper.find('.vue-lightbox').exists()).toBe(false);
        });

        it('has default loop value of true', () => {
            const wrapper = createWrapper();
            expect(wrapper.props('loop')).toBe(true);
        });

        it('has default nav value of true', () => {
            const wrapper = createWrapper();
            expect(wrapper.props('nav')).toBe(true);
        });

        it('has default caption value of true', () => {
            const wrapper = createWrapper();
            expect(wrapper.props('caption')).toBe(true);
        });
    });

    describe('Lifecycle', () => {
        it('adds keydown event listener on mount', () => {
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
            createWrapper();
            expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
            addEventListenerSpy.mockRestore();
        });

        it('removes keydown event listener on destroy', () => {
            const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
            const wrapper = createWrapper();
            wrapper.destroy();
            expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
            removeEventListenerSpy.mockRestore();
        });
    });

    describe('Slot', () => {
        it('renders slot content', () => {
            const wrapper = shallowMount(Lightbox, {
                propsData: {
                    images: mockImages,
                    currentImage: 0,
                    overlayActive: false
                },
                slots: {
                    default: '<div class="test-slot-content">Test Content</div>'
                }
            });
            expect(wrapper.find('.test-slot-content').exists()).toBe(true);
        });
    });

    describe('Download Feature', () => {
        it('does not show download button by default', () => {
            const wrapper = createWrapper();
            expect(wrapper.find('.download').exists()).toBe(false);
        });

        it('shows download button when download prop is true', () => {
            const wrapper = createWrapper({ download: true });
            expect(wrapper.find('.download').exists()).toBe(true);
        });

        it('hides download button when download prop is false', () => {
            const wrapper = createWrapper({ download: false });
            expect(wrapper.find('.download').exists()).toBe(false);
        });

        it('shows download button for specific image with downloadable: true', () => {
            const imagesWithDownload = [
                { id: 1, src: '/path/to/image1.jpg', downloadable: true },
                { id: 2, src: '/path/to/image2.jpg', downloadable: false }
            ];
            const wrapper = shallowMount(Lightbox, {
                propsData: {
                    images: imagesWithDownload,
                    currentImage: 0,
                    overlayActive: true,
                    download: false // global is false
                }
            });
            // Per-image downloadable overrides global
            expect(wrapper.find('.download').exists()).toBe(true);
        });

        it('hides download button for image with downloadable: false even if global is true', () => {
            const imagesWithDownload = [
                { id: 1, src: '/path/to/image1.jpg', downloadable: false }
            ];
            const wrapper = shallowMount(Lightbox, {
                propsData: {
                    images: imagesWithDownload,
                    currentImage: 0,
                    overlayActive: true,
                    download: true // global is true
                }
            });
            expect(wrapper.find('.download').exists()).toBe(false);
        });

        it('emits download event when download button is clicked', async () => {
            const wrapper = createWrapper({ download: true });

            // Mock createElement to prevent actual download
            const originalCreateElement = document.createElement.bind(document);
            document.createElement = jest.fn((tag) => {
                const el = originalCreateElement(tag);
                if (tag === 'a') {
                    el.click = jest.fn();
                }
                return el;
            });

            await wrapper.find('.download').trigger('click');

            expect(wrapper.emitted('download')).toBeTruthy();
            expect(wrapper.emitted('download')[0][0]).toEqual({
                index: 0,
                image: mockImages[0]
            });

            document.createElement = originalCreateElement;
        });

        it('uses downloadUrl if specified', () => {
            const imagesWithDownloadUrl = [
                { id: 1, src: '/path/to/image1.jpg', downloadUrl: '/high-res/image1.jpg' }
            ];
            const wrapper = shallowMount(Lightbox, {
                propsData: {
                    images: imagesWithDownloadUrl,
                    currentImage: 0,
                    overlayActive: true,
                    download: true
                }
            });
            expect(wrapper.vm.currentDownloadUrl).toBe('/high-res/image1.jpg');
        });

        it('falls back to src if downloadUrl not specified', () => {
            const wrapper = createWrapper({ download: true });
            expect(wrapper.vm.currentDownloadUrl).toBe('/path/to/image1.jpg');
        });

        it('has default download prop value of false', () => {
            const wrapper = createWrapper();
            expect(wrapper.props('download')).toBe(false);
        });
    });
});
