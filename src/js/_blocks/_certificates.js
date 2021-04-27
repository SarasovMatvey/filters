(() => {
  const certificatesSlider = document.querySelector(
    ".certificates .swiper-container"
  );

  if (!certificatesSlider) return;

  const swiper = new Swiper(certificatesSlider, {
    slidesPerView: 1,
    spaceBetween: 35,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    centeredSlides: true,
    navigation: {
      prevEl: certificatesSlider.querySelector(".certificates__prev"),
      nextEl: certificatesSlider.querySelector(".certificates__next"),
    },
    breakpoints: {
      840: {
        slidesPerView: 4,
        centeredSlides: false,
      },
      700: {
        slidesPerView: 3,
        centeredSlides: false,
      },
      400: {
        slidesPerView: 1,
        centeredSlides: false,
      },
    },
  });
})();
