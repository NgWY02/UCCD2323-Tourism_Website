document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const infoCards = document.querySelectorAll('.info-card');
    const dealId = urlParams.get('id');
    const deals = [
        {
            id: 0,
            title: "Sunway Lagoon All Day Pass",
            description: "Water Parks in Kuala Lumpur",
            price: "From RM50",
            images: ["lagoon.jpeg", "lagoon2.jpg", "lagoon3.jpeg"],
            backgroundImage: "headerlagoon.png",
            included: [
                "Make your way to Sunway Lagoon and spend your day splashing in the water or on an extreme adventure",
                "Enjoy up to 90 rides and attractions, including the popular Vuvuzela, Monsoon 360, Jungle Fury, Pirates Revenge, and more!",
                "Explore all 6 themed zones: Amusement Park, Scream Park, Water Park, Sunway Lost Lagoon, Wildlife Park, and X Park",
                "Meet over 150 animal species and explore their different habitats at the Wildlife Park",
                "Avail the Quack Xpress during Peak Season to have skip-the-line access to selected rides and attractions"
            ],
            bookingLink: "https://www.klook.com/en-MY/activity/1303-sunway-lagoon-kuala-lumpur/"
        },
        {
            id: 1,
            title: "5D4N Semporna Island Tour",
            description: "Experience Sabah's beauty with guided island tours and snorkeling.",
            price: "RM1450",
            images: ["semporna4.jpg", "semporna2.jpg", "semporna3.jpg", "semporna1.jpg"],
            backgroundImage: "semporna4.jpg",
            included: [
                "Duration: 5 days, 4 nights stay",
                "Accommodation: Comfortable stays with scenic views",
                "Meals: Full-board meals included (breakfast, lunch, and dinner)",
                "Transfers: Round-trip airport transfers and local transportation",
                "Activities: Guided island tours, snorkeling excursions, and ample leisure time to explore on your own"
            ],
            itinerary: [
                "Day 1: Arrival in Semporna, hotel check-in, and free time to explore the local area.",
                "Day 2: Full-day island hopping tour with snorkeling at top spots like Mataking Island, Timba Timba, and Pom Pom Island.",
                "Day 3: Leisure day at your own pace, optional activities like scuba diving or exploring the town.",
                "Day 4: Guided tour of Mabul Island, including visits to local villages and a chance to witness marine life.",
                "Day 5: Departure - check out from the hotel and transfer to the airport."
            ],
            bookingLink: "https://www.kkday.com/en-my/product/130990-semporna-snorkelling-island-hopping-package-sabah-malaysia"
        },
        {
            id: 2,
            title: "Cameron Highlands Tour",
            description: "A 2-day escape to Cameron Highlands with visits to tea plantations and strawberry farms.",
            price: "RM400",
            images: ["cameron2.jpeg", "cameron1.jpeg", "cameron3.jpeg", "cameron4.jpeg"],
            backgroundImage: "strawberry.png",
            included: [
                "Duration: 2 days, 1 night stay",
                "Accommodation: 1 night stay at a charming hotel in Cameron Highlands",
                "Meals: Breakfast included",
                "Activities: Tea plantation visit, strawberry picking, and local sightseeing"
            ],
            itinerary: [
                "Day 1: Arrival in Cameron Highlands, visit to Strawberry farm, lunch at Ferm Nyonya Restaurant, shopping at Kea Farm Market and have dinner at Singh Chapati Cameron Highlands. After that, check in hotel and rest.",
                "Day 2: Breakfast in the hotel, visiting BOH Tea Plantation and Lavender garden. Lunch at Restaurant Tuan Yuan and after that will visit Orang Asli Village."
            ],
            bookingLink: "https://www.ontourmalaysia.com/2-days-1-night-cameron-highlands-package/"
        },
        {
            id: 3,
            title: "Penang Hill and Temple Family Day Trip",
            description: "A family-friendly day trip exploring Kek Lok Si Temple and Penang Hill.",
            price: "RM220",
            images: ["pnghill2.jpg", "pnghill1.jpg", "pnghill3.jpg", "kekloksi.jpg", "kekeloksi2.png"],
            backgroundImage: "kekloksi.jpg",
            included: [
                "This family day trip offers an enriching cultural experience in Penang. Start your adventure with a visit to Kek Lok Si Temple, one of Southeast Asia's largest temples, where you can admire the towering Pagoda of Ten Thousand Buddhas and the grand bronze statue of Guanyin. Afterward, take a funicular train ride up Penang Hill, where you'll enjoy stunning panoramic views of the island. The day concludes with a leisurely stroll through the beautiful hilltop gardens, making it a perfect outing for the entire family."
            ],
            itinerary: [
                "Morning: Pick-up from your hotel and visit Kek Lok Si Temple. Explore the temple complex, including the Pagoda and the Guanyin statue.",
                "Midday: Enjoy a local lunch (at your own expense) at a nearby food market, savoring Penang's famous street food.",
                "Afternoon: Take a funicular train ride to the top of Penang Hill, where you can explore the hilltop gardens and enjoy the breathtaking views.",
                "Late Afternoon: Relax and enjoy some family time at the summit before descending and returning to your hotel."
            ],
            bookingLink: "https://www.klook.com/activity/1871-penang-temple-sightseeing-penang/?spm=SearchResult.SearchResult_LIST&clickId=0e62bf6860"
        },
        {
            id: 4,
            title: "MIICO Hotel: Comfort & Luxury",
            description: "A luxurious stay at MIICO Hotel with top-notch amenities.",
            price: "RM230",
            images: ["johor6.jpeg.avif", "johorhotel1.jpeg.avif", "johorhotel3.jpeg.webp", "johorhotel4.jpeg.avif","johorhotel5.jpeg.webp"],
            backgroundImage: "johorhotel7.jpeg.avif",
            included: [
                "Complimentary breakfast",
                "Free Wi-Fi",
                "Access to fitness center and spa",
                "Concierge services",
                "24-hour room service",
                "Luxurious toiletries and amenities"
            ],
            bookingLink: "https://booking.com/hotel/my/check-in-mount-austin.en-gb.html?aid=311984&label=check-in-mount-austin-OC1%2AO6xzcxhjRX3WeNxsDwS541008954370%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-827305541496%3Alp1029512%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9Ydj4ck6nIj5YLGqhyz5Ttx8&sid=4afee20183f81471bdecb8c491825d94&dest_id=-2405456;dest_type=city;dist=0;group_adults=2;group_children=0;hapos=1;hpos=1;no_rooms=1;req_adults=2;req_children=0;room1=A%2CA;sb_price_type=total;sr_order=popularity;srepoch=1723697135;srpvid=0b5c2172fcee007a;type=total;ucfs=1&"
        },
        {
            id: 5,
            title: "Kundasang 4D3N Scenic Retreat",
            description: "A tranquil 4-day retreat in Kundasang with breathtaking views.",
            price: "From RM1036 per person",
            images: ["sabah1.jpg", "sabah2.jpg", "sabah3.jpg", "sabah4.jpg"],
            backgroundImage: "sabah4.jpg",
            included: [
                "3 nights accommodation at Mountain Valley Resort with breathtaking views of Mount Kinabalu",
                "Daily breakfast featuring a mix of local and international dishes",
                "Welcome drinks upon arrival",
                "Free Wi-Fi throughout your stay",
                "Guided tour of Kundasang War Memorial and Kinabalu Park",
                "Visit to Desa Dairy Farm with complimentary milk tasting",
                "Round-trip airport transfers"
            ],
            itinerary: [
                "Day 1: Arrival in Kundasang - Check-in at Mountain Valley Resort, enjoy a welcome drink, and relax with stunning views of Mount Kinabalu. Spend the rest of the day exploring the nearby town or relaxing at the resort.",
                "Day 2: Guided Tour - Start your day with a hearty breakfast before setting off on a guided tour of Kundasang War Memorial. Afterward, visit Kinabalu Park, a UNESCO World Heritage Site, and enjoy a nature walk to explore the diverse flora and fauna. Return to the resort in the evening for relaxation.",
                "Day 3: Desa Dairy Farm Visit - After breakfast, visit Desa Dairy Farm, often referred to as the 'Little New Zealand' of Sabah. Experience the dairy production process, enjoy complimentary milk tasting, and take in the scenic surroundings. Spend the rest of the day at leisure, either exploring more of Kundasang or relaxing at the resort.",
                "Day 4: Departure - Enjoy your final breakfast at the resort before checking out. Depending on your flight schedule, you may have some free time to explore the local market or relax at the resort. Transfer to the airport for your departure."
            ],
            bookingLink: "https://cuticutibajet.com/en/sabah-package-include-flight-ticket/?gad_source=1&gclid=Cj0KCQjwq_G1BhCSARIsACc7NxpMy__WNm08J7mnvltmK846_qj2tyPEP7F7Y2rKZ7z5ba30jB1Y6IQaAngkEALw_wcB"
        },
        {
            id: 6,
            title: "Genting Highlands Skyworlds Theme Park",
            description: "A thrilling day at Genting Skyworlds with exciting rides and attractions.",
            price: "From RM129",
            images: ["genting1.jpg", "genting2.jpg", "genting3.jpg", "genting11.jpg", "genting4.jpg"],
            backgroundImage: "genting11.jpg",
            included: [
                "Admission to: Genting Skyworlds (Malaysian Low Period Ticket - Sun to Thursday) unavailable for eve of public holiday, public holidays",
                "Complimentary up to 3 Virtual Queue Reservations (only via download Genting SkyWorlds App)"
            ],
            bookingLink: "https://www.klook.com/activity/119943-genting-skyworlds-theme-park-tickets/?spm=SearchResult.SearchResult_LIST&clickId=5e5a00d5d5"
        },
        {
            id: 7,
            title: "3D2N AMAZING PORT DICKSON TOUR PACKAGE",
            description: "Enjoy a 3-day, 2-night stay at Port Dickson, complete with visits to the PD Ostrich Farm and Night Sky Observatory.",
            price: "RM299",
            images: ["PortDickson1.jpeg", "PortDickson2.jpeg", "PortDickson4.png", "PortDickson5.jpeg"], 
            backgroundImage: "PortDickson4.png", 
            included: [
                "02 Nights at Klana Beach Resort (Superior Room)",
                "Daily Breakfast",
                "Entrance Fee to Nights Sky Observatory",
                "Entrance Fee to PD Ostrich Farm"
            ],
            itinerary: [
                "Day 1: Arrival at Port Dickson - Check-in at Klana Beach Resort, where you'll be welcomed with the calming ambiance of the seaside. Spend the rest of the day relaxing on the beach or exploring the nearby attractions at your leisure. Overnight stay at the resort.",
                "Day 2: Free & Easy (Breakfast) - Begin your day with a delicious breakfast at the resort. The rest of the day is yours to explore Port Dickson's many attractions. You can visit the PD Ostrich Farm, where entrance is included in your package, or take in the stars at the Night Sky Observatory in the evening, which is also included. Overnight stay at the resort.",
                "Day 3: Check Out (Breakfast) - Enjoy a leisurely breakfast at the resort. After breakfast, you'll have some free time to soak in the last moments at the beach or explore more of Port Dickson before checking out at noon. Depart for your onward journey."
            ],
            bookingLink: "https://www.dasiatravels.com/tour-package/3d2n-amazing-port-dickson-tour-package"
        }
        
    ];
    

    const deal = deals.find(d => d.id == dealId);
    if (deal) {
        document.getElementById('dealTitle').textContent = deal.title;
        document.getElementById('dealDescription').textContent = deal.description;
        document.getElementById('dealPrice').textContent = deal.price;
        

        // Set background image of the header
        document.querySelector('.deal-header').style.backgroundImage = `url('../images/wh/${deal.backgroundImage}')`;

        // Handle slideshow images
        const carouselImages = document.getElementById('carouselImages');
        const indicators = document.querySelector('.carousel-indicators');
        deal.images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `<img src="../images/wh/${image}" class="d-block w-100" alt="${deal.title} image ${index + 1}">`;
            carouselImages.appendChild(carouselItem);

            // Create indicator
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#dealCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            if (index === 0) {
                indicator.className = 'active';
            }
            indicators.appendChild(indicator);
        });
        
        // Display included items
        const includedList = document.getElementById('dealIncluded');
        deal.included.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            includedList.appendChild(listItem);
        });
        // Display itinerary if available
        if (deal.itinerary) {
            const itineraryList = document.getElementById('dealItinerary');
            deal.itinerary.forEach(day => {
                const listItem = document.createElement('li');
                listItem.textContent = day;
                itineraryList.appendChild(listItem);
            });
        }

        // Set the booking link
        document.getElementById('bookingLink').setAttribute('href', deal.bookingLink);
    }
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else{
                entry.target.classList.add('animate');
            }
        });
    };

    // Set up the intersection observer
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1 // Trigger animation when 10% of the element is visible
    });

    // Observe each element
    infoCards.forEach(card => {
        observer.observe(card);
    });
});

 