// Anime Database
const animeDatabase = [
    {
        id: 1,
        title: "Attack on Titan",
        genre: "action",
        rating: 4.9,
        votes: 1250,
        image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=600&fit=crop",
        description: "In a world where humanity resides within enormous walled cities to protect themselves from gigantic man-eating humanoids, Eren Yeager joins the fight."
    },
    {
        id: 2,
        title: "Death Note",
        genre: "drama",
        rating: 4.8,
        votes: 1800,
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
        description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name, leading to a cat-and-mouse game with a detective."
    },
    {
        id: 3,
        title: "Demon Slayer",
        genre: "action",
        rating: 4.9,
        votes: 2100,
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
        description: "A young boy becomes a demon slayer to avenge his family and cure his sister who has been turned into a demon."
    },
    {
        id: 4,
        title: "Fullmetal Alchemist",
        genre: "adventure",
        rating: 4.9,
        votes: 1650,
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
        description: "Two brothers search for the Philosopher's Stone to restore what they've lost through forbidden alchemy."
    },
    {
        id: 5,
        title: "Steins;Gate",
        genre: "drama",
        rating: 4.8,
        votes: 980,
        image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&h=600&fit=crop",
        description: "A self-proclaimed mad scientist accidentally creates a time machine and must prevent a devastating future."
    },
    {
        id: 6,
        title: "My Hero Academia",
        genre: "action",
        rating: 4.7,
        votes: 1950,
        image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&h=600&fit=crop",
        description: "In a world where almost everyone has superpowers, a powerless boy dreams of becoming the greatest hero."
    },
    {
        id: 7,
        title: "Spirited Away",
        genre: "fantasy",
        rating: 4.9,
        votes: 2300,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        description: "A young girl becomes trapped in a mysterious spirit world and must find a way to free herself and her parents."
    },
    {
        id: 8,
        title: "One Punch Man",
        genre: "action",
        rating: 4.7,
        votes: 1720,
        image: "https://images.unsplash.com/photo-1611250282010-a1973b8c3e29?w=400&h=600&fit=crop",
        description: "A hero who can defeat any opponent with a single punch seeks to find a worthy opponent."
    },
    {
        id: 9,
        title: "Your Name",
        genre: "drama",
        rating: 4.8,
        votes: 1890,
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
        description: "Two teenagers mysteriously swap bodies and must search for each other to unravel the mystery."
    },
    {
        id: 10,
        title: "Sword Art Online",
        genre: "adventure",
        rating: 4.6,
        votes: 1560,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
        description: "Players trapped in a virtual reality MMORPG must clear all levels to escape, with death in game meaning death in real life."
    },
    {
        id: 11,
        title: "Hunter x Hunter",
        genre: "adventure",
        rating: 4.9,
        votes: 1430,
        image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
        description: "A young boy searches for his father who is a legendary Hunter, while making friends and facing powerful enemies."
    },
    {
        id: 12,
        title: "Howl's Moving Castle",
        genre: "fantasy",
        rating: 4.8,
        votes: 1670,
        image: "https://images.unsplash.com/photo-1606603696914-3d31c0cd778d?w=400&h=600&fit=crop",
        description: "A young woman cursed with old age seeks the help of a mysterious wizard living in a magical moving castle."
    }
];

// Store user ratings
let userRatings = {};
let currentAnime = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayAnime(animeDatabase);
    setupEventListeners();
});

// Display anime cards
function displayAnime(animeList) {
    const grid = document.getElementById('animeGrid');
    grid.innerHTML = '';

    animeList.forEach(anime => {
        const card = createAnimeCard(anime);
        grid.appendChild(card);
    });
}

// Create anime card element
function createAnimeCard(anime) {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.setAttribute('data-genre', anime.genre);

    const stars = '★'.repeat(Math.round(anime.rating));
    
    card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}" class="anime-image">
        <div class="anime-info">
            <h3 class="anime-title">${anime.title}</h3>
            <span class="anime-genre">${anime.genre.charAt(0).toUpperCase() + anime.genre.slice(1)}</span>
            <div class="anime-rating">
                <span class="rating-stars">${stars}</span>
                <span class="rating-text">${anime.rating} (${anime.votes} votes)</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openModal(anime));
    return card;
}

// Open rating modal
function openModal(anime) {
    currentAnime = anime;
    const modal = document.getElementById('ratingModal');
    
    document.getElementById('modalTitle').textContent = anime.title;
    document.getElementById('modalImage').src = anime.image;
    document.getElementById('modalDescription').textContent = anime.description;
    document.getElementById('avgRating').textContent = anime.rating.toFixed(1);
    
    // Reset stars
    document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
    });
    
    // Show user's previous rating if exists
    if (userRatings[anime.id]) {
        highlightStars(userRatings[anime.id]);
    }
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('ratingModal').style.display = 'none';
}

// Highlight stars
function highlightStars(rating) {
    document.querySelectorAll('.star').forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Close modal button
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    
    // Click outside modal to close
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('ratingModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Star rating hover and click
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });

        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            userRatings[currentAnime.id] = rating;
        });
    });

    // Reset stars on mouse leave
    document.getElementById('starRating').addEventListener('mouseleave', () => {
        if (currentAnime && userRatings[currentAnime.id]) {
            highlightStars(userRatings[currentAnime.id]);
        } else {
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('active');
            });
        }
    });

    // Submit rating
    document.getElementById('submitRating').addEventListener('click', () => {
        if (currentAnime && userRatings[currentAnime.id]) {
            const userRating = userRatings[currentAnime.id];
            
            // Update anime rating (weighted average)
            const anime = animeDatabase.find(a => a.id === currentAnime.id);
            const totalVotes = anime.votes + 1;
            const newRating = ((anime.rating * anime.votes) + userRating) / totalVotes;
            
            anime.rating = parseFloat(newRating.toFixed(1));
            anime.votes = totalVotes;
            
            // Update display
            document.getElementById('avgRating').textContent = anime.rating.toFixed(1);
            displayAnime(animeDatabase);
            
            // Show success message
            alert(`Thank you for rating ${anime.title}! Your rating: ${userRating} stars`);
            closeModal();
        } else {
            alert('Please select a rating before submitting.');
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter anime
            const filter = this.getAttribute('data-filter');
            if (filter === 'all') {
                displayAnime(animeDatabase);
            } else {
                const filtered = animeDatabase.filter(anime => anime.genre === filter);
                displayAnime(filtered);
            }
        });
    });

    // Search functionality
    document.querySelector('.search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = animeDatabase.filter(anime => 
            anime.title.toLowerCase().includes(searchTerm) ||
            anime.description.toLowerCase().includes(searchTerm)
        );
        displayAnime(filtered);
    });

    document.querySelector('.search-btn').addEventListener('click', () => {
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();
        const filtered = animeDatabase.filter(anime => 
            anime.title.toLowerCase().includes(searchTerm) ||
            anime.description.toLowerCase().includes(searchTerm)
        );
        displayAnime(filtered);
    });
}