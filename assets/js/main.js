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

// document.addEventListener('DOMContentLoaded', function(){
Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    closeButton: false,
    autoFocus: false,
    // defaultType: 'inline',
    // hideScrollbar: false
});
const sliderHero = new Splide('.header-frame__core-slider-root', {
    type: "fade",
    heightRatio: 0.675,
    pagination: false,
    arrows: false,
}).mount();
// const sliderHeroPrev = document.querySelector('.');
// const sliderHeroNext = document.querySelector('.');
// sliderHeroPrev.addEventListener('click', function(){
//     sliderHero.go('<');
// });
// sliderHeroNext.addEventListener('click', function(){
//     sliderHero.go('>');
// });

const sliderIntroMain = new Splide('.intro-slider__main', {
    type: 'fade',
    width: '40.625vw',
    height: '37.5vw',
    arrows: false,
    pagination: false,
    breakpoints: {
        600: {
            width: '75vw',
            height: '69.792vw',
        }
    }
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
                    const button = li.querySelector('button');
                    if (button) {
                        button.click();
                    }
                }
            }, true);
        }
    });
    placesSlider.mount();
});

document.querySelectorAll('.places-place__slider').forEach(slider => {
    const pagination = slider.querySelector('.splide__pagination');
    if (pagination) {
        pagination.addEventListener('mouseenter', e => {
            const li = e.target.closest('li');
            if (li && pagination.contains(li)) {
                const btn = li.querySelector('button');
                if (btn) btn.click();
            }
        }, true);
    }
});

const modalSliders = document.querySelectorAll('.modal-place__slider');
modalSliders.forEach((element, index) => {
    const modalSlider = new Splide(`.modal-place__slider_${index}`, {
        type: 'fade',
        arrows: false,
        // classes: {
        //     pagination: 'splide__pagination places-place__slider-pagination',
        //     page      : 'splide__pagination__page places-place__slider-pagination-page',
        // },
    }).mount();
});

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

