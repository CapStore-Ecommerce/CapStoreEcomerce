document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".team-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 3000, // 3 segundos
             smartSpeed: 1000,       // an
            disableOnInteraction: false, // sigue auto moviéndose aunque el usuario toque
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
});
