document.addEventListener('DOMContentLoaded', function() {

    const deals = [
        {
            id: 0,
            title: "Sunway Lagoon All Day Pass",
            description: "Thrill-seekers can enjoy a full day of fun at Sunway Lagoon's water slides, amusement rides, and more.",
            price: 80,
            category: "theme park",
            state: "Kuala Lumpur",
            section: "trending",
            image: "lagoon.jpeg"
        },
        {
            id: 1,
            title: "Semporna Island Tour",
            description: "Explore Semporna's stunning marine life with guided tours and snorkeling.",
            price: 1450,
            category: "nature",
            state: "Sabah",
            section: "valuable",
            image: "semporna3.jpg"
        },
        {
            id: 2,
            title: "Cameron Highland Tour",
            description: "Escape to Cameron Highlands for a refreshing 2-day retreat among tea plantations and gardens.",
            price: 400,
            category: "nature",
            state: "Pahang",
            section: "trending",
            image: "cameron1.jpeg"
        },
        {
            id: 3,
            title: "Kekloksi and Penang Hill Day Tour",
            description: "Discover Penang's rich culture and beautiful beaches with this immersive tour.",
            price: 220,
            category: "family fun",
            state: "Penang",
            section: "special",
            image: "kekloksi.jpg"
        },
        {
            id: 4,
            title: "MIICO Hotel: Comfort & Luxury",
            description: "Enjoy a luxurious stay at MIICO Hotel with top-notch amenities.",
            price: 230,
            category: "accommodations",
            state: "Johor",
            section: "valuable",
            image: "johorhotel2.jpeg.avif"
        },
        {
            id: 5,
            title: "Kundasang Scenic Retreat",
            description: "Relax and explore the beautiful landscapes of Kundasang over four days.",
            price: 1036,
            category: "nature",
            state: "Sabah",
            section: "special",
            image: "sabah3.jpg"
        },
        {
            id: 6,
            title: "Genting Highlands Skyworlds Theme Park",
            description: "Experience thrilling rides and attractions at Genting Skyworlds Theme Park.",
            price: 129,
            category: "theme park",
            state: "Pahang",
            section: "trending",
            image: "genting11.jpg"
        },
        {
            id: 7,
            title: "Port Dickson Tour Package",
            description: "Enjoy a relaxing and fun-filled 3-day, 2-night stay in Port Dickson.",
            price: 299, 
            category: "beaches",
            state: "Negeri Sembilan",
            section: "special",
            image: "PortDickson1.jpeg" 
        }
        
    ];

    // Function to insert deals into the HTML container based on section
    function insertDealsBySection(section, containerId) {
        console.log(`Inserting deals into section: ${section}`);
        const container = document.getElementById(containerId);
        container.innerHTML = '';  // Clear previous content

        const filteredDeals = deals.filter(deal => deal.section === section);
        filteredDeals.forEach((deal) => {
            const dealCard = document.createElement('div');
            dealCard.className = 'col-md-4 deal-card';
            dealCard.dataset.price = deal.price;
            dealCard.dataset.category = deal.category;
            dealCard.dataset.state = deal.state;
            dealCard.dataset.section = section; // Track which section the deal belongs to
            dealCard.innerHTML = `
                <a href="dealdetails.html?id=${deal.id}" class="card-link">
                    <div class="card mb-4 shadow-sm">
                        <img src="../images/wh/${deal.image}" class="card-img-top" alt="${deal.title}">
                        <div class="card-body">
                            <h5 class="card-title">${deal.title}</h5>
                            <p class="card-text">${deal.description}</p>
                         <p class="card-text"><strong>Price:</strong> RM${deal.price}</p>
                        </div>
                    </div>
                </a>
            `;
            container.appendChild(dealCard);
        });

        handleScroll(); // Trigger fade-in effect after inserting deals
    }

    // Function to handle scroll and fade-in effect
    function handleScroll() {
        const cards = document.querySelectorAll('.card');
        const triggerBottom = window.innerHeight * 0.9;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    // Function to filter deals by category
    function filterDealsByCategory(category) {
        console.log(`Filtering deals by category: ${category}`);
        const allDeals = document.querySelectorAll('.deal-card');
        allDeals.forEach(deal => {
            if (category === "all" || deal.dataset.category.includes(category.toLowerCase())) {
                deal.style.display = 'block';
            } else {
                deal.style.display = 'none';
            }
        });
    }
    // Search bar functionality
    const searchBar = document.getElementById('searchBar');

    searchBar.addEventListener('input', function(e) {
        const searchQuery = e.target.value.toLowerCase();
        const allDeals = document.querySelectorAll('.deal-card');

        allDeals.forEach(deal => {
            const title = deal.querySelector('.card-title').textContent.toLowerCase();
            const description = deal.querySelector('.card-text').textContent.toLowerCase();

            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                deal.style.display = 'block';
            } else {
                deal.style.display = 'none';
            }
        });
    });
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const allDeals = document.querySelectorAll('.deal-card');

            for (let deal of allDeals) {
                if (deal.style.display === 'block') {
                    deal.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    break;
                }
            }
        }
    });

    // Initial load of all deals
    function displayAllDeals() {
        insertDealsBySection('trending', 'trending-now');
        insertDealsBySection('valuable', 'valuable-deals');
        insertDealsBySection('special', 'special-offers');
    }

    // Make sure everything is loaded correctly on initial load
    window.addEventListener('load', () => {
        displayAllDeals();
    });

    // Event listeners for filtering by category
    document.querySelectorAll('.sort-category').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.sort-category').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.textContent.trim().toLowerCase();
            filterDealsByCategory(category);
        });
    });

    // Sort by price function
    function sortDealsByPrice(order) {
        const allDeals = Array.from(document.querySelectorAll('.deal-card'));
        allDeals.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            return order === 'low-to-high' ? priceA - priceB : priceB - priceA;
        });
        allDeals.forEach(deal => deal.parentNode.appendChild(deal));
    }

    // Filter by state function
    function filterDealsByState(state) {
        const allDeals = document.querySelectorAll('.deal-card');
        allDeals.forEach(deal => {
            if (state === "" || deal.dataset.state === state) {
                deal.style.display = 'block';
            } else {
                deal.style.display = 'none';
            }
        });
    }

    // Event listeners for sorting by price and filtering by state
    document.getElementById('sortPrice').addEventListener('change', function() {
        sortDealsByPrice(this.value);
    });

    document.getElementById('sortState').addEventListener('change', function() {
        filterDealsByState(this.value);
    });
    

});
