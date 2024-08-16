document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.faq-section, .feedback-section');
    const feedbackForm = document.getElementById('feedbackForm');

    // Function to check section visibility on scroll
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

    // Feedback form submission handling
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const feedbackName = document.getElementById('feedbackName').value;
        const feedbackEmail = document.getElementById('feedbackEmail').value;
        const feedbackMessage = document.getElementById('feedbackMessage').value;

        // Create a feedback object
        const feedbackData = {
            name: feedbackName,
            email: feedbackEmail,
            message: feedbackMessage
        };
        // Get existing feedback from sessionStorage
        let feedbackList = JSON.parse(sessionStorage.getItem('userFeedback')) || [];

        // Add new feedback to the list
        feedbackList.push(feedbackData);

        // Store feedback data in session storage
        sessionStorage.setItem('userFeedback', JSON.stringify(feedbackList));

        // Display a success message
        alert('Submitted succesfully! Thank you for your feedback ^-^');

        // Clear the form
        feedbackForm.reset();
    });


});
