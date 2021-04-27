(() => {
  const serviceInfoSlider = document.querySelector(
    ".service-info .swiper-container"
  );

  if (!serviceInfoSlider) return;

  const swiper = new Swiper(serviceInfoSlider, {
    slidesPerView: 1,
    spaceBetween: 35,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    centeredSlides: true,
    navigation: {
      prevEl: serviceInfoSlider.querySelector(".service-info__prev"),
      nextEl: serviceInfoSlider.querySelector(".service-info__next"),
    },
    breakpoints: {
      870: {
        slidesPerView: 3,
        centeredSlides: false,
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    },
  });
})();
