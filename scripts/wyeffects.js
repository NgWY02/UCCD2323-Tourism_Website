document.addEventListener('DOMContentLoaded', function () {

    // Parallax effect for header section background
    const headerSections = document.querySelectorAll('.header-section');
    window.addEventListener('scroll', function () {
        headerSections.forEach(section => {
            let scrollPosition = window.pageYOffset;
            section.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    });

    // Slide-in and Fade-in effect for content sections and other elements
    const contentSections = document.querySelectorAll('.content-section, .video-section, .twin-building-section, .construction-section, .tour-section, .step,#map.map-section.py-5.text-center,#about.section.bg-light,.section.bg-light,.section,.img');
    const images = document.querySelectorAll('.img-section img');

    const options = {
        threshold: 0.1, // Adjusted threshold for better triggering
        rootMargin: '0px 0px -20px 0px' // Adjusted root margin
    };

    const fadeInOnScroll = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in'); // Remove class when not in view
            }
        });
    }, options);

    const slideInOnScroll = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            } else {
                entry.target.classList.remove('slide-in'); // Remove class when not in view
            }
        });
    }, options);

    contentSections.forEach(section => {
        fadeInOnScroll.observe(section);
    });

    images.forEach(image => {
        slideInOnScroll.observe(image);
    });

});
