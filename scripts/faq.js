document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.faq-section, .feedback-section');

    function checkVisibility() {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3; // Trigger when the section is about 1/3 from the top

            if (sectionPosition < screenPosition) {
                section.classList.add('section-visible');
            } else {
                section.classList.remove('section-visible'); // Remove the class when scrolling up
            }
        });
    }

    // Add event listener for scrolling
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Run on load in case the sections are already visible
});
