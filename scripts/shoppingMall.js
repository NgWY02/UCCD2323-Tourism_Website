document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const query = document.getElementById('searchInput').value.toLowerCase(); // Get the search input value and convert to lowercase

    // Define a list of sections to scroll to
    const sections = {
        'kuala lumpur': 'kualaLumpur',
        'kl': 'kualaLumpur',
        'KL': 'kualaLumpur',
        'kuala': 'kualaLumpur',
        'selangor': 'selangor',
        'johor': 'johor',
        'penang': 'penang',
        'sabah': 'sabah',
        'sarawak': 'sarawak',
        'pahang': 'pahang',
        'perak': 'perak',
        'kelantan': 'kelantan',
        'putrajaya': 'putrajaya',
        'negeri sembilan': 'negeriSembilan',
        'negeri': 'negeriSembilan',
        'sembilan': 'negeriSembilan',
        'malacca': 'malacca',
        'melaka': 'malacca',
        'labuan': 'labuan'
    };

    const mallNames = {
    'suria klcc': 'kualaLumpur',
    'klcc': 'kualaLumpur',
    'suria': 'kualaLumpur',
    'pavilion': 'kualaLumpur',
    'mid valley': 'kualaLumpur',
    'midvalley': 'kualaLumpur',
    'mid': 'kualaLumpur',
    'valley': 'kualaLumpur',
    'berjaya times square': 'kualaLumpur',
    'times square': 'kualaLumpur',
    'berjaya': 'kualaLumpur',
    'the gardens': 'kualaLumpur',
    'gardens': 'kualaLumpur',
    'sunway pyramid': 'selangor',
    'sunway': 'selangor',
    '1 utama': 'selangor',
    'one utama': 'selangor',
    '1utama': 'selangor',
    '1u': 'selangor',
    'ioi city mall': 'selangor',
    'ioi': 'selangor',
    'setia city mall': 'selangor',
    'setia': 'selangor',
    'johor bahru city square': 'johor',
    'city square': 'johor',
    'aeon tebrau city': 'johor',
    'tebrau city': 'johor',
    'tebrau': 'johor',
    'paradigm mall': 'johor',
    'paradigm': 'johor',
    'r&f mall': 'johor',
    'r&f': 'johor',
    'gurney plaza': 'penang',
    'gurney': 'penang',
    'queensbay mall': 'penang',
    'queensbay': 'penang',
    '1st avenue mall': 'penang',
    'first avenue mall': 'penang',
    'first': 'penang',
    'avenue': 'penang',
    'suria sabah': 'sabah',
    'imago': 'sabah',
    'the spring': 'sarawak',
    'spring': 'sarawak',
    'vivacity megamall': 'sarawak',
    'vivacity': 'sarawak',
    'east coast mall': 'pahang',
    'east coast': 'pahang',
    'ipoh parade': 'perak',
    'parade': 'perak',
    'kb mall': 'kelantan',
    'kb': 'kelantan',
    'palm mall seremban': 'negeriSembilan',
    'palm mall': 'negeriSembilan',
    'palm': 'negeriSembilan',
    'dataran pahlawan': 'malacca',
    'dataran': 'malacca',
    'pahlawan': 'malacca',
    'mahkota parade': 'malacca',
    'mahkota': 'malacca',
    'financial park': 'labuan',
    'financial': 'labuan'
    };

    // Check for location match
    let sectionId = sections[query];

    // If no location match, check for mall name match
    if (!sectionId) {
        sectionId = mallNames[query];
    }


    if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            // Calculate the offset to scroll slightly below the element
            const offset = 100; // Adjust this value based on your navbar height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    
            // Smoothly scroll to the position
            window.scrollTo({ 
                top: elementPosition, 
                behavior: 'smooth' 
            });
    
            // Highlight matching mall cards
            const mallCards = element.querySelectorAll('.mall-card');
            mallCards.forEach(card => {
                const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
                if (cardTitle.includes(query)) {
                    card.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.7)';
                    card.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        card.style.boxShadow = '';
                        card.style.transform = '';
                    }, 3000); // Reset after 3 seconds
                }
            });
        } else {
            console.error(`Element with ID '${sectionId}' not found.`);
        }
    } else {
        alert('No matching section or mall found.');
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const mallCards = document.querySelectorAll('.mall-card');

    mallCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });

        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });

        card.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 300);
        });
    });
});

