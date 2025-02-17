document.addEventListener("DOMContentLoaded", async function() {
    const searchBtn = document.getElementById("search-btn");
    const clearBtn = document.getElementById("clear-btn");
    const searchInput = document.getElementById("search-text");
    const searchResults = document.getElementById("search-results");

    let countries = [];
    await fetch("travel_recommendations_api.json")
        .then(response => response.json())
        .then(data => {
            countries = data.countries;
            console.log("Datos de viajes cargados:", data);
        })
        .catch(error => console.error("Error al cargar los datos de viajes:", error));

    console.log('holaaaaaa', countries);

    function displayResults(results) {
        searchResults.innerHTML = "";
        if (results.length === 0) {
            searchResults.innerHTML = "<p>No results found</p>";
            return;
        }
        console.log('results', results)
        results.forEach(destination => {
            console.log('destination', destination)
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.innerHTML = `
                <img src='${destination.imageUrl}' class='result-img'></h3>
                <h3>${destination.city}, ${destination.country}</h3>
                <p>${destination.description}</p>
            `;
            searchResults.appendChild(resultItem);
        });
    }

    searchBtn.addEventListener("click", function() {
        const query = searchInput.value.toLowerCase();
        let filteredResults = [];
        countries.forEach(country =>{
            console.log('country', country)
            country.cities.filter(city => city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query))
                .forEach(city => {
                    console.log('city', city)
                    filteredResults.push({ city: city.name, country: country.name, imageUrl: city.imageUrl, description: city.description })
                })
            }
        );
        console.log("results", filteredResults);
        displayResults(filteredResults);
    });

    clearBtn.addEventListener("click", function() {
        searchInput.value = "";
    });
});

