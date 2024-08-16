const stateSelect = document.getElementById('state-select');
const durationRadios = document.querySelectorAll('input[name="duration"]');
const tripCards = document.querySelectorAll('.trip-card');
        
stateSelect.addEventListener('change', filterTrips);
durationRadios.forEach(radio => radio.addEventListener('change', filterTrips));
        
function filterTrips() {
    const selectedState = stateSelect.value;
    const selectedDuration = document.querySelector('input[name="duration"]:checked')?.value;
        
    tripCards.forEach(card => {
    const cardState = card.dataset.state;
    const cardDuration = card.dataset.duration;
        
    const stateMatch = selectedState === '' || cardState === selectedState;
    const durationMatch = selectedDuration === undefined || cardDuration === selectedDuration;
        
    if (stateMatch && durationMatch) {
        card.style.display = 'block';
    } else {
        card.style.display = 'none';
        }
    });
}
// Slideshow script
let slideIndex = 0;
showSlides();
        
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 4000); // Change image every 4 seconds
    }
        
    function plusSlides(n) {
        slideIndex += n - 1; // Adjust index manually
        showSlides();
    }
        
    // Modal script
    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }
        
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    // Toggle menu script
    function toggleMenu() {
        const menu = document.getElementById("menu");
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    }

document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navbar = document.querySelector('.navbar.custom-navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mediaQuery = window.matchMedia('(max-width: 991.98px)');
    let isMenuOpen = false;

    function handleNavbarToggle() {
        if (mediaQuery.matches) {
            isMenuOpen = !isMenuOpen;
            navbar.classList.toggle('menu-open', isMenuOpen);
        }
    }

    navbarToggler.addEventListener('click', handleNavbarToggle);

    // Handle hover effect for larger screens
    navbar.addEventListener('mouseenter', function() {
        if (!mediaQuery.matches) {
            navbar.classList.add('hover-effect');
        }
    });

    navbar.addEventListener('mouseleave', function() {
        if (!mediaQuery.matches) {
            navbar.classList.remove('hover-effect');
        }
    });

    // Remove menu-open class when resizing to larger screens
    mediaQuery.addListener(function(e) {
        if (!e.matches) {
            isMenuOpen = false;
            navbar.classList.remove('menu-open');
        }
    });

    // Scroll functionality to hide/show navbar
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Downscroll - hide the navbar
            navbar.style.top = '-100px';  // Adjust the value based on your navbar height
        } else {
            // Upscroll - show the navbar
            navbar.style.top = '0';
        }

        lastScrollTop = scrollTop;
    });

    const dropdown = document.querySelector('.nav-item.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu-custom');

    dropdown.addEventListener('mouseenter', function() {
        dropdownMenu.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', function() {
        dropdownMenu.style.display = 'none';
    });       

    
    var profileDropdown = document.getElementById("profileDropdown");
    var profileMenu = document.getElementById("profileMenu");

    // Show dropdown menu on hover
    profileDropdown.addEventListener("mouseover", function () {
        profileMenu.style.display = "block";
    });

    // Hide dropdown menu when mouse leaves the dropdown area
    profileDropdown.addEventListener("mouseout", function () {
        profileMenu.style.display = "none";
    });

    profileMenu.addEventListener("mouseover", function () {
        profileMenu.style.display = "block";
    });

    profileMenu.addEventListener("mouseout", function () {
        profileMenu.style.display = "none";
    });

    // Prevent dropdown menu items from blocking the link's default behavior
    profileDropdown.addEventListener("click", function (event) {
        // Ensure the default behavior happens (navigation to profile.html)
        event.preventDefault();
        window.location.href = "../templates/profile.html";
    });

    // Close dropdown if the user clicks outside of it
    document.addEventListener("click", function (event) {
        if (!profileDropdown.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.style.display = "none";
        }
    });   
    
    
});