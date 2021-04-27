(() => {
  const reviewsSlider = document.querySelector(
    ".reviews .swiper-container"
  );

  if (!reviewsSlider) return


  const swiper = new Swiper(reviewsSlider, {
    slidesPerView: 1,
    spaceBetween: 35,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    centeredSlides: true,
    navigation: {
      prevEl: reviewsSlider.querySelector(".reviews__prev"),
      nextEl: reviewsSlider.querySelector(".reviews__next"),
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