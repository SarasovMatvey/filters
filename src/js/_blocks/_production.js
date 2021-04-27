(() => {
  const productionSlider = document.querySelector(
    ".production .swiper-container"
  );

  if (!productionSlider) return;

  const swiper = new Swiper(productionSlider, {
    slidesPerView: 1,
    spaceBetween: 35,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    centeredSlides: true,
    navigation: {
      prevEl: productionSlider.querySelector(".production__prev"),
      nextEl: productionSlider.querySelector(".production__next"),
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
