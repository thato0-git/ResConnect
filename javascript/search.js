// search.mjs
import { accommodations } from "../mjs/accommodations.mjs";
import { displayAccommodationCards } from "../javascript/accommodationCard.js";

const searchForm = document.querySelector(".search-bar");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetSearch");
const resultsContainer = document.getElementById("results");

function renderList(list) {
  resultsContainer.innerHTML = "";

  if (!list || list.length === 0) {
    resultsContainer.innerHTML = "<p>No accommodations match your search.</p>";
    return;
  }

  list.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("accommodation-card");
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Funding:</strong> ${item.funding}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

function searchAccommodations(query) {
  const lower = query.toLowerCase();

  return accommodations.filter(acc =>
    acc.name.toLowerCase().includes(lower) ||
    acc.location.toLowerCase().includes(lower)
  );
}

// Load all initially
displayAccommodationCards(accommodations);

// Handle search
searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query === "") {
    displayAccommodationCards(accommodations); 
    return;
  }

  const results = searchAccommodations(query);
  displayAccommodationCards(results);
});

// Handle reset
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  displayAccommodationCards(accommodations);;
});
