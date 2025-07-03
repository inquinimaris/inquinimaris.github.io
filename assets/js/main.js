import './validation';
import Splide from '@splidejs/splide';
import { Fancybox } from '@fancyapps/ui';
window.Fancybox = Fancybox;
function splideArrows(splide, arrowPrev, arrowNext) {
    arrowPrev.addEventListener('click', function () {
        splide.go('<');
    });
    arrowNext.addEventListener('click', function () {
        splide.go('>');
    });
}
Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    closeButton: false,
    autoFocus: false,
    on: {
        "Carousel.ready Carousel.change": function () {
            const that = Fancybox.getSlide().el;
            IMask(that.querySelector('.input_tel:not([data-masked])'), {
                mask: '+7 (000) 000-00-00',
                lazy: false,
            });
        }
    }
});

const sliderHero = new Splide('.header-frame__core-slider-root', {
    type: "fade",
    heightRatio: 0.675,
    pagination: false,
    arrows: false,
})
const allCaptionsHero = document.querySelectorAll('.header-frame__navigation-list-item');
sliderHero.on('ready', () => {
    allCaptionsHero[sliderHero.index].classList.add('active');
});
sliderHero.on('move', (newIndex, prevIndex) => {
    allCaptionsHero[prevIndex].classList.remove('active');
    allCaptionsHero[newIndex].classList.add('active');
});
sliderHero.mount();
const sliderHeroPrev = document.querySelector('.header-frame__navigation-arrow_prev');
const sliderHeroNext = document.querySelector('.header-frame__navigation-arrow_next');
splideArrows(sliderHero, sliderHeroPrev, sliderHeroNext);

const sliderIntroMain = new Splide('.intro-slider__main', {
    type: 'fade',
    // width: '40.625vw',
    // height: '37.5vw',
    arrows: false,
    pagination: false,
    // breakpoints: {
    //     600: {
    //         width: '75vw',
    //         height: '69.792vw',
    //     }
    // }
});
const sliderIntroNav = new Splide('.intro-slider__nav', {
    pagination: false,
    isNavigation: true,
    arrows: false,
    cover: true,
    updateOnMove: true,
    perPage: 4,
    gap: '1.736vw',
    height: '5.556vw',
    breakpoints: {
        600: {
            perPage: 3,
            gap: '4.167vw',
            height: '12.5vw',
        }
    }
});
const allCaptions = document.querySelectorAll('.intro-slider__main-captions-item');
sliderIntroMain.on('ready', () => {
    allCaptions[sliderIntroMain.index].classList.add('active');
});
sliderIntroMain.on('move', (newIndex, prevIndex) => {
    allCaptions[prevIndex].classList.remove('active');
    allCaptions[newIndex].classList.add('active');
});
sliderIntroMain.sync(sliderIntroNav);
sliderIntroMain.mount();
sliderIntroNav.mount();
const sliderIntroMainPrev = document.querySelector('.intro-slider__main-arrow_prev');
const sliderIntroMainNext = document.querySelector('.intro-slider__main-arrow_next');
splideArrows(sliderIntroMain, sliderIntroMainPrev, sliderIntroMainNext);
const sliderIntroNavPrev = document.querySelector('.intro-slider__nav-arrow_prev');
const sliderIntroNavNext = document.querySelector('.intro-slider__nav-arrow_next');
splideArrows(sliderIntroNav, sliderIntroNavPrev, sliderIntroNavNext);

const placesSliders = document.querySelectorAll('.places-place__slider');
placesSliders.forEach((element, index) => {
    const placesSlider = new Splide(`.places-place__slider_${index}`, {
        type: 'fade',
        arrows: false,
        classes: {
            pagination: 'splide__pagination places-place__slider-pagination',
            page: 'splide__pagination__page places-place__slider-pagination-page',
        },
        // breakpoints: {
        //     600: {
        //     }
        // }
    });
    placesSlider.on('ready', () => {
        const pagination = placesSlider.root.querySelector('.splide__pagination');
        if (pagination) {
            pagination.addEventListener('mouseenter', event => {
                const li = event.target.closest('li');
                if (li && pagination.contains(li)) {
                    const index = [...pagination.children].indexOf(li);
                    if (index >= 0) {
                        placesSlider.go(index);
                    }
                }
            }, true);
            pagination.addEventListener('touchmove', event => {
                const touch = event.touches[0];
                const el = document.elementFromPoint(touch.clientX, touch.clientY);
                const li = el?.closest('li');

                if (li && pagination.contains(li)) {
                    const index = [...pagination.children].indexOf(li);
                    if (index >= 0 && index !== placesSlider.index) {
                        placesSlider.go(index);
                    }
                }
            }, { passive: true });
        }
    });
    placesSlider.mount();
});

const modalSliders = document.querySelectorAll('.modal-place__slider');
modalSliders.forEach((element, index) => {
    const modalSlider = new Splide(`.modal-place__slider_${index}`, {
        type: 'fade',
        arrows: false,
        classes: {
            pagination: 'splide__pagination modal-place__slider-pagination',
            page: 'splide__pagination__page modal-place__slider-pagination-page',
        },
    }).mount();
    const sliderModalPrev = modalSlider.root.querySelector('.modal-place__slider-nav-arrow_prev');
    const sliderModalNext = modalSlider.root.querySelector('.modal-place__slider-nav-arrow_next');
    splideArrows(modalSlider, sliderModalPrev, sliderModalNext);
});

// modalSliders.mount();

function animationPhotographs() {
    const section = document.querySelector('.cta_photographer .cta-inner');
    const photos = [...document.querySelectorAll('.cta-images__photo')];

    let scrollY = window.scrollY;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    section.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    section.addEventListener('touchmove', e => {
        if (e.touches && e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });
    section.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        if (!touch) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const offsetX = (touch.clientX - centerX) * 0.03;
        const offsetY = (touch.clientY - centerY) * 0.04;
        photos.forEach(photo => {
            photo.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px) translateZ(0)`;
        });
    });

    // Intersection-based reveal
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                photos.forEach(photo => {
                    photo.classList.add('active');
                    photo.addEventListener('transitionend', (e) => {
                        if (e.propertyName === 'top' || e.propertyName === 'right' || e.propertyName === 'bottom' || e.propertyName === 'left') {
                            photo.style.transitionProperty = 'transform';
                            photo.classList.add('appearance-complete');
                        }
                    });
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);

    // Main loop
    const update = () => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const inView = scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight;
        if (!inView) {
            requestAnimationFrame(update);
            return;
        }

        const scrollProgress = (scrollY + window.innerHeight - sectionTop) / (sectionHeight + window.innerHeight);
        const scrollOffsetY = (scrollProgress - 1) * 40;
        const cursorOffsetX = (mouseX - centerX) * 0.03;
        const cursorOffsetY = (mouseY - centerY) * 0.04;

        photos.forEach(photo => {
            const translateX = cursorOffsetX;
            const translateY = scrollOffsetY + cursorOffsetY;
            photo.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(0)`;
        });

        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}
animationPhotographs();

function animationRotation_intro() {
    const rotatorLeft = document.querySelector('.intro-text__descr-decoration_left');
    const rotatorRight = document.querySelector('.intro-text__descr-decoration_right');
    const rotatorParent = document.querySelector('.intro-text__descr');

    const rotateOnScroll = () => {
        const scrollY = window.scrollY / 10;
        rotatorLeft.style.transform = `rotate(-${scrollY}deg)`;
        rotatorRight.style.transform = `rotate(${scrollY}deg)`;
    };

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            window.addEventListener('scroll', rotateOnScroll, { passive: true });
            rotateOnScroll();
        } else {
            window.removeEventListener('scroll', rotateOnScroll);
        }
    }, { threshold: 0 });

    observer.observe(rotatorParent);
}
animationRotation_intro();

function animationRotation_cards() {
    const rotatorMiddle = document.querySelector('.cards-decoration_middle');
    const rotatorBottom = document.querySelector('.cards-decoration_bottom');
    const rotatorParent = document.querySelector('.cards_0');

    const rotateOnScroll = () => {
        const scrollY = window.scrollY / 20;
        rotatorMiddle.style.transform = `rotate(-${scrollY}deg)`;
        rotatorBottom.style.transform = `rotate(${scrollY}deg)`;
    };

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            window.addEventListener('scroll', rotateOnScroll, { passive: true });
            rotateOnScroll();
        } else {
            window.removeEventListener('scroll', rotateOnScroll);
        }
    }, { threshold: 0 });

    observer.observe(rotatorParent);
}
animationRotation_cards();

function gal_appearance() {
    const parent = document.querySelector('.cards_0');
    const target = document.querySelector('.cards-observer-trigger');
    if (!parent || !target) {
        return
    }
    const observer = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
            parent.classList.add('active');
            observer.unobserve(entry.target);
        }
    }, { threshold: 1 });
    observer.observe(target);
}
gal_appearance();

function another_gal_appearance() {
    const parent = document.querySelector('.contacts__content');
    const target = document.querySelector('.contacts__content');
    if (!parent || !target) {
        return
    }
    const observer = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
            parent.classList.add('active');
            observer.unobserve(entry.target);
        }
    }, { threshold: 1 });
    observer.observe(target);
}
another_gal_appearance();

function setupShakeOnTrigger() {
    const trigger = document.querySelector('.cards_2 .cards-observer-trigger');
    const target = document.querySelector('.cards-decoration_salt');
    if (!trigger || !target) {
        return;
    }
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            target.classList.add('shake');
        } else {
            target.classList.remove('shake');
        }
    }, { threshold: 1 });
    observer.observe(trigger);
}
setupShakeOnTrigger();

function setupHorizontalScroll() {
    const el = document.querySelector('.places-heading__image_couple');
    if (!el) return;
    const vw = window.innerWidth;
    let start = null;
    let end = null;
    // Update start/end boundaries of the element in viewport Y coordinates
    function updateBounds() {
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY;
        start = scrollY + rect.top;      // element top from document top
        end = start + rect.height + window.innerHeight; // enough scroll range for animation
    }
    // Calculate translateX based on progress 0..1
    function onScroll() {
        if (start === null || end === null) return;
        const scrollY = window.scrollY + window.innerHeight; // bottom of viewport
        const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
        // Map progress 0..1 to 150% .. -150%
        const translatePercent = 150 - progress * 300;
        el.style.transform = `translateX(${translatePercent}%)`;
    }
    // Init
    updateBounds();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        updateBounds();
        onScroll();
    });
    onScroll();
}
setupHorizontalScroll();


const section = document.querySelector('.seo-inner');
const box = document.querySelector('.seo__image');

let sectionTop = 0;
let sectionHeight = 0;
let boxHeight = 0;

function updateMetrics() {
    const rect = section.getBoundingClientRect();
    sectionTop = window.scrollY + rect.top;
    sectionHeight = section.offsetHeight;
    boxHeight = box.offsetHeight;
}

function updatePosition() {
    const scrollY = window.scrollY;
    const maxTranslate = sectionHeight - boxHeight;
    let offset = scrollY - sectionTop;

    if (offset < 0) offset = 0;
    if (offset > maxTranslate) offset = maxTranslate;

    box.style.transform = `translateY(${offset}px)`;
}

function initStickyScroll() {
    updateMetrics();
    updatePosition();
}

window.addEventListener('scroll', updatePosition, { passive: true });

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateMetrics();
        updatePosition();
    }, 150);
}, { passive: true });

window.addEventListener('DOMContentLoaded', initStickyScroll);


const btnFreedom = document.getElementById('switch_to_freedom');
const btnForest = document.getElementById('switch_to_forest');
const mapFreedom = document.getElementById('map_freedom');
const mapForest = document.getElementById('map_forest');

function switchMap(showFreedom) {
    mapFreedom.classList.toggle('active', showFreedom);
    mapForest.classList.toggle('active', !showFreedom);
    btnFreedom.classList.toggle('active', showFreedom);
    btnForest.classList.toggle('active', !showFreedom);
}

btnFreedom.addEventListener('click', () => switchMap(true));
btnForest.addEventListener('click', () => switchMap(false));