document.addEventListener('DOMContentLoaded', function() {
    // Carousel initialization
    var myCarousel = document.querySelector('#carouselExampleCaptions');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        wrap: true,
        pause: 'hover'
    });
});

$(document).ready(function() {
    const $slider = $('.blog-slider');
    const $container = $('.blog-flex-container');
    const $cards = $('.blog-card');
    const cardWidth = $cards.outerWidth(true); // Width including margin
    const maxItems = 7;
    let currentIndex = 0;
    let interval;

    // Clone cards to create a seamless loop
    const $cardsClone = $cards.slice(0, maxItems).clone();
    $container.append($cardsClone);

    // Update container width to accommodate all cards
    $container.css('width', `${cardWidth * ($cards.length + maxItems)}px`);

    function moveSlider(index) {
        $container.css('transform', `translateX(-${index * cardWidth}px)`);
        currentIndex = index;
    }

    function nextSlide() {
        if (currentIndex >= $cards.length) {
            $container.css('transition', 'none');
            $container.css('transform', `translateX(0px)`);
            currentIndex = 0;

            setTimeout(() => {
                $container.css('transition', 'transform 0.5s ease');
                moveSlider(currentIndex);
            }, 50);
        } else {
            currentIndex++;
            moveSlider(currentIndex);
        }
    }

    function prevSlide() {
        if (currentIndex === 0) {
            $container.css('transition', 'none');
            $container.css('transform', `translateX(-${($cards.length) * cardWidth}px)`);
            currentIndex = $cards.length - 1;

            setTimeout(() => {
                $container.css('transition', 'transform 0.5s ease');
                moveSlider(currentIndex);
            }, 50);
        } else {
            currentIndex--;
            moveSlider(currentIndex);
        }
    }

    $('.arrow-right').click(nextSlide);
    $('.arrow-left').click(prevSlide);

    function startAutoSlide() {
        interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    $slider.hover(stopAutoSlide, startAutoSlide);

    // Initialize
    startAutoSlide();
});

$(document).ready(function() {
    // Initialize the map
    const map = L.map('map').setView([3.139, 101.6869], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ensure the map resizes properly
    map.invalidateSize();

    let userLocationMarker = null;

    // Function to fetch nearby tourist attractions
    const fetchNearbyAttractions = (lat, lon) => {
        const query = `
            [out:json];
            (
              node["tourism"~"attraction|museum|artwork|landmark"](around:3000, ${lat}, ${lon});
              way["tourism"~"attraction|museum|artwork|landmark"](around:3000, ${lat}, ${lon});
              relation["tourism"~"attraction|museum|artwork|landmark"](around:3000, ${lat}, ${lon});
            );
            out body;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        $.getJSON(url)
            .done((data) => {
                // Remove existing markers
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker && layer !== userLocationMarker) {
                        map.removeLayer(layer);
                    }
                });

                if (data.elements.length === 0) {
                    alert('No nearby tourist attractions found.');
                } else {
                    data.elements.forEach(element => {
                        const lat = element.lat || element.center.lat;
                        const lon = element.lon || element.center.lon;
                        const name = element.tags.name || 'No name';

                        L.marker([lat, lon]).addTo(map)
                            .bindPopup(name);
                    });
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.error('Error fetching attractions:', textStatus, errorThrown);
            });
    };

    // Debounce function to limit rapid clicks
    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Handle map click to fetch nearby attractions
    const handleMapClick = debounce(function(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        // Add a marker for the clicked location
        L.marker([lat, lon]).addTo(map)
            .bindPopup('Clicked Location')
            .openPopup();

        // Fetch and display nearby attractions
        fetchNearbyAttractions(lat, lon);
    }, 500); // 500ms debounce delay

    map.on('click', handleMapClick);

    // Initial marker for user location (optional)
    userLocationMarker = L.marker([3.139, 101.6869]).addTo(map)
        .bindPopup('Default Location')
        .openPopup();

    // Trigger the resize event to make sure the map fits the container
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
    const elementsToFadeIn = document.querySelectorAll('section, img');

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is in view
        rootMargin: '0px 0px -20px 0px' // Adjust to trigger slightly before full visibility
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            } else {
                entry.target.classList.remove('fade-in-visible'); // Remove class when not in view to allow re-triggering
            }
        });
    }, observerOptions)

    elementsToFadeIn.forEach(element => {
        element.classList.add('fade-in'); // Add fade-in class to all selected elements
        fadeInObserver.observe(element);
    });
});


