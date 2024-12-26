document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    function fetchRestaurants() {
        fetch('http://localhost:3000/restaurants')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                const restaurants = Array.isArray(data) ? data : [];
                restaurantList.innerHTML = '';
                if (restaurants.length === 0) {
                    restaurantList.innerHTML = '<p>No restaurants found.</p>';
                } else {
                    restaurants.forEach(restaurant => {
                        const card = document.createElement('div');
                        card.classList.add('restaurant-card');
                        card.innerHTML = `
                            <img src="${restaurant.image}" alt="${restaurant.nom}">
                            <h3>${restaurant.nom}</h3>
                            <p>${restaurant.specialite}</p>
                            <p>note: ${restaurant.note}⭐</p>
                            <a href="Detail.html?id=${restaurant.id}">Details</a>
                        `;
                        restaurantList.appendChild(card);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                restaurantList.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
            });
    }
    window.viewDetails = function (id) {
        window.location.href = `Detail.html?id=${id}`;
    };
    fetchRestaurants();
});



document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les éléments HTML
    const restaurantList = document.getElementById('restaurant-list');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Fonction pour charger les restaurants depuis l'API
    function fetchRestaurants() {
        fetch('http://localhost:3000/restaurants')
            .then(function(response) {
                // Vérifier si la réponse est correcte
                if (!response.ok) {
                    throw new Error('Problème de connexion avec l\'API');
                }
                return response.json(); // Convertir la réponse en JSON
            })
            .then(function(data) {
                displayRestaurants(data); // Afficher les restaurants
            })
            .catch(function(error) {
                console.log('Erreur :', error);
                restaurantList.innerHTML = '<p>Impossible de charger les restaurants.</p>';
            });
    }

    // Fonction pour afficher les restaurants
    function displayRestaurants(restaurants) {
        restaurantList.innerHTML = ''; // Vider la liste actuelle

        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p>Aucun restaurant trouvé.</p>';
        } else {
            // Ajouter chaque restaurant dans la liste
            restaurants.forEach(function(restaurant) {
                const card = document.createElement('div');
                card.classList.add('restaurant-card');
                card.innerHTML = `
                    <img src="${restaurant.image}" alt="${restaurant.nom}">
                    <h3>${restaurant.nom}</h3>
                    <p>${restaurant.specialite}</p>
                    <p>Note: ${restaurant.note}⭐</p>
                    <a href="Detail.html?id=${restaurant.id}">Détails</a>
                `;
                restaurantList.appendChild(card); // Ajouter la carte du restaurant
            });
        }
    }

    // Fonction de recherche
    function searchRestaurants() {
        const searchTerm = searchInput.value.toLowerCase(); // Récupérer ce que l'utilisateur a écrit

        fetch('http://localhost:3000/restaurants')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                const filteredRestaurants = data.filter(function(restaurant) {
                    // Chercher dans le nom ou la spécialité
                    return restaurant.nom.toLowerCase().includes(searchTerm) ||
                        restaurant.specialite.toLowerCase().includes(searchTerm);
                });
                displayRestaurants(filteredRestaurants); // Afficher les résultats filtrés
            })
            .catch(function(error) {
                console.log('Erreur de recherche :', error);
                restaurantList.innerHTML = '<p>Erreur pendant la recherche.</p>';
            });
    }

    // Ajouter un événement quand on clique sur le bouton de recherche
    searchButton.addEventListener('click', searchRestaurants);

    // Ajouter un événement quand on appuie sur "Entrée" dans le champ de recherche
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRestaurants();
        }
    });

    // Charger les restaurants au début
    fetchRestaurants();
});

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');

    // Ajouter un événement pour le bouton "Retour"
    backButton.addEventListener('click', function() {
        // Rediriger vers la page principale des restaurants
        window.location.href = 'index.html';  // Remplace "index.html" par le nom de ta page principale si nécessaire
    });
});

// Récupérer les éléments HTML
const restaurantList = document.getElementById('restaurant-list');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const backButton = document.getElementById('backButton');

// Fonction pour charger les restaurants depuis l'API
function fetchRestaurants() {
    fetch('http://localhost:3000/restaurants')
        .then(response => {
            if (!response.ok) {
                throw new Error('Problème de connexion avec l\'API');
            }
            return response.json();
        })
        .then(data => {
            displayRestaurants(data);
        })
        .catch(error => {
            console.log('Erreur :', error);
            restaurantList.innerHTML = '<p>Impossible de charger les restaurants.</p>';
        });
}

// Fonction pour afficher les restaurants
function displayRestaurants(restaurants) {
    restaurantList.innerHTML = '';

    if (restaurants.length === 0) {
        restaurantList.innerHTML = '<p>Aucun restaurant trouvé.</p>';
    } else {
        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.classList.add('restaurant-card');
            card.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.nom}">
                <h3>${restaurant.nom}</h3>
                <p>${restaurant.specialite}</p>
                <p>Note: ${restaurant.note}⭐</p>
                <a href="Detail.html?id=${restaurant.id}">Détails</a>
            `;
            restaurantList.appendChild(card);
        });
    }
}
document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "restaurants.html";
});
