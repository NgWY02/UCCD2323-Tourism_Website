document.addEventListener('DOMContentLoaded', function() {
    // Carousel initialization
    var myCarousel = document.querySelector('#carouselExampleCaptions');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        wrap: true,
        pause: 'hover'
    });

});
