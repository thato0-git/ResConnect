
let slideIndex = 0;
let slides = [];
let intervalId;

function showNextSlide() {
    if (slides.length === 0) return;
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    slides = document.querySelectorAll(".carouselSlide");
    if (slides.length > 0) {
        slides.forEach((slide) => slide.classList.remove("active"));
        slideIndex = 0;
        slides[slideIndex].classList.add("active");
        intervalId = setInterval(showNextSlide, 4000);
    }
});
