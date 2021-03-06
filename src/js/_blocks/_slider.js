(() => {
  const sliders = document.querySelectorAll(".slider");

  if (!sliders) return

  for (const slider of sliders) {
    const swiper = new Swiper(slider.querySelector(".swiper-container"), {
      speed: 400,
      spaceBetween: 100,
      navigation: {
        prevEl: slider.querySelector(".slider__prev"),
        nextEl: slider.querySelector(".slider__next"),
      },
    });
  }
})();
