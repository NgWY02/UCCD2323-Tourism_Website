AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
});

let allRestaurants = [];

// Function to fetch restaurants from the server
const getRestaurants = async (location, cuisine) => {
    try {
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const searchNearby = (request) => {
            return new Promise((resolve, reject) => {
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(results);
                    } else {
                        reject(new Error(`Places API error: ${status}`));
                    }
                });
            });
        };

        const request = {
            location: await getLocationCoordinates(location),
            radius: '5000',
            type: ['restaurant'],
            keyword: cuisine
        };

        const results = await searchNearby(request);

        return results.map(place => ({
            name: place.name,
            placeId: place.place_id,
            address: place.vicinity,
            rating: place.rating,
            cuisine: cuisine,
            image: place.photos ? place.photos[0].getUrl() : null
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


// Helper function to get coordinates for a location
const getLocationCoordinates = (locationName) => {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: locationName }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve(results[0].geometry.location);
            } else {
                reject(new Error(`Geocoding failed: ${status}`));
            }
        });
    });
};

// Function to handle filter changes and update the restaurant list
const handleFiltersChange = async () => {
    const location = document.getElementById('location').value;
    const cuisine = document.getElementById('cuisine').value;
    const sortBy = document.getElementById('sort').value;

    const restaurantList = document.getElementById('restaurantList');

    if (!location || !cuisine) {
        restaurantList.innerHTML = '<div class="col centered-message">Please select both a location and a cuisine.</div>';
        return;
    }

    try {
        restaurantList.innerHTML = '<div class="col centered-message">Loading restaurants...</div>';

        const restaurants = await getRestaurants(location, cuisine);
        allRestaurants = restaurants; // Store all restaurants

        displayRestaurants(restaurants, sortBy);
    } catch (error) {
        console.error('Error:', error);
        restaurantList.innerHTML = '<div class="col centered-message">An error occurred while fetching restaurants. Please try again later.</div>';
    }
};

//display restaurant
const displayRestaurants = (restaurants, sortBy) => {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';

    if (restaurants.length === 0) {
        restaurantList.innerHTML = '<div class="col centered-message">No restaurants found for the selected criteria.</div>';
        return;
    }

    if (sortBy === 'rating') {
        restaurants.sort((a, b) => b.rating - a.rating);
    }

    restaurants.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.classList.add('col');
        restaurantElement.innerHTML = `
            <div class="restaurant-card">
                <div class="favorite-icon" data-restaurant-id="${restaurant.placeId}">
                    <i class="far fa-heart"></i>
                </div>
                ${restaurant.image ? `<img src="${restaurant.image}" alt="${restaurant.name}">` : ''}
                <div class="restaurant-card-content">
                    <h3>${restaurant.name}</h3>
                    <p>Cuisine: ${restaurant.cuisine}</p>
                    <p>${restaurant.address}</p>
                    <p>Rating: ${restaurant.rating} / 5</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + restaurant.address)}&query_place_id=${restaurant.placeId}" class="btn btn-primary" target="_blank">View on Map</a>
                </div>
            </div>
        `;
        restaurantList.appendChild(restaurantElement);
        updateFavoriteIcon(restaurant.placeId);
    });
};

// Function to toggle favorite status
const toggleFavorite = (restaurantId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(restaurantId);

    if (index === -1) {
        favorites.push(restaurantId);
    } else {
        favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteIcon(restaurantId);
};

// Function to update favorite icon
const updateFavoriteIcon = (restaurantId) => {
    const icon = document.querySelector(`.favorite-icon[data-restaurant-id="${restaurantId}"] i`);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (icon) {
        if (favorites.includes(restaurantId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }
};

// Add this new function to fetch details for a single restaurant
const getRestaurantDetails = (placeId) => {
    return new Promise((resolve, reject) => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve({
                    name: place.name,
                    placeId: place.place_id,
                    address: place.vicinity,
                    rating: place.rating,
                    cuisine: place.types.includes('restaurant') ? place.types.find(type => type !== 'restaurant' && type !== 'food') : 'N/A',
                    image: place.photos ? place.photos[0].getUrl() : null
                });
            } else {
                reject(new Error(`Place Details API error: ${status}`));
            }
        });
    });
};

// Modify the showFavorites function
const showFavorites = async () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '<div class="col centered-message">Loading favorite restaurants...</div>';

    if (favorites.length === 0) {
        restaurantList.innerHTML = '<div class="col centered-message">No favorite restaurants found. Please choose a restaurant to save.</div>';
        return;
    }

    try {
        const favoriteRestaurants = await Promise.all(favorites.map(getRestaurantDetails));
        restaurantList.innerHTML = '';

        favoriteRestaurants.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.classList.add('col');
            restaurantElement.innerHTML = `
                <div class="restaurant-card">
                    <div class="favorite-icon" data-restaurant-id="${restaurant.placeId}">
                        <i class="fas fa-heart"></i>
                    </div>
                    ${restaurant.image ? `<img src="${restaurant.image}" alt="${restaurant.name}">` : ''}
                    <div class="restaurant-card-content">
                        <h3>${restaurant.name}</h3>
                        <p>Cuisine: ${restaurant.cuisine}</p>
                        <p>${restaurant.address}</p>
                        <p>Rating: ${restaurant.rating} / 5</p>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + restaurant.address)}&query_place_id=${restaurant.placeId}" class="btn btn-primary" target="_blank">View on Map</a>
                    </div>
                </div>
            `;
            restaurantList.appendChild(restaurantElement);
        });
    } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
        restaurantList.innerHTML = '<div class="col centered-message">An error occurred while fetching favorite restaurants. Please try again later.</div>';
    }
};

// Function to show all restaurants
const showAllRestaurants = () => {
    if (allRestaurants.length > 0) {
        const sortBy = document.getElementById('sort').value;
        displayRestaurants(allRestaurants, sortBy);
    } else {
        const restaurantList = document.getElementById('restaurantList');
        restaurantList.innerHTML = '<div class="col centered-message">No restaurants available. Please select a location and cuisine to view restaurants.</div>';
    }
};

// Function to initialize the page
const initializePage = () => {
    // Add event listeners
    document.getElementById('location').addEventListener('change', handleFiltersChange);
    document.getElementById('cuisine').addEventListener('change', handleFiltersChange);
    document.getElementById('sort').addEventListener('change', handleFiltersChange);

    // Add event listener for favorite icons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.favorite-icon')) {
            const restaurantId = e.target.closest('.favorite-icon').dataset.restaurantId;
            toggleFavorite(restaurantId);
        }
    });

    // Add "Favorites" button to filters
    const filtersContainer = document.querySelector('.filters');
    const favoritesButton = document.createElement('button');
    favoritesButton.textContent = 'Show Favorites';
    favoritesButton.classList.add('btn', 'btn-primary', 'ms-3');
    favoritesButton.addEventListener('click', showFavorites);
    filtersContainer.appendChild(favoritesButton);

    // Add "Show All" button to filters
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'Show All';
    showAllButton.classList.add('btn', 'btn-secondary', 'ms-3');
    showAllButton.addEventListener('click', showAllRestaurants);
    filtersContainer.appendChild(showAllButton);

    // Initialize favorites on page load
    initializeFavorites();
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length > 0) {
        showFavorites();
    } else {
        restaurantList.innerHTML = '<div class="col centered-message">Please select a location and cuisine to view restaurants.</div>';
    }

    // Initial load of restaurants (optional, depends on your UX preference)
    // handleFiltersChange();
};

// Function to initialize favorite state for all restaurant cards
const initializeFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const restaurantCards = document.querySelectorAll('.favorite-icon');

    restaurantCards.forEach(card => {
        const restaurantId = card.dataset.restaurantId;
        updateFavoriteIcon(restaurantId);
    });
};

// Call initializePage when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage,initializeFavorites);
