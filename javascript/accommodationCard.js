import { accommodations } from "../mjs/accommodations.mjs";
const cardsContainer = document.querySelector('#cards');
const maxStars = 5;

let currentRating = 0;

// Function to create and display accommodation cards
export function displayAccommodationCards(accommodations) { 
    cardsContainer.innerHTML = "";
    accommodations.forEach(accommodation => {
        const thecard = document.createElement('div')
        thecard.classList.add('card');
        const accomImage = document.createElement('img')
        accomImage.src = `${accommodation.imageUrl}`
        accomImage.setAttribute("loading", "lazy");
        accomImage.setAttribute("alt", accommodation.name);
        accomImage.setAttribute("width", "380");
        accomImage.setAttribute("height", "340");
        thecard.appendChild(accomImage);

        const accomName = document.createElement('h2')
        accomName.innerText = accommodation.name
        thecard.appendChild(accomName);

        const accomLocation = document.createElement('p')
        accomLocation.innerText =`Address: ${accommodation.location }`
        accomLocation.classList.add("address");
        thecard.appendChild(accomLocation)

        const accomFunding = document.createElement('p')
        accomFunding.innerText = `Funding Type: ${accommodation.funding}` 
        accomFunding.classList.add("funding");
        thecard.appendChild(accomFunding)

        const accomDesc = document.createElement('p')
        accomDesc.innerText = `Description: ${accommodation.description}`
        accomDesc.classList.add("description");
        thecard.appendChild(accomDesc)

        const accomUni = document.createElement('p')
        accomUni.innerText = `University: ${accommodation.university}`
        accomUni.classList.add("university");
        thecard.appendChild(accomUni)


        const starRatingContainer = document.createElement('div')
        starRatingContainer.classList.add('star-rating-container');
        let currentRating = 0;

        
function updateStars() {
    const stars = starRatingContainer.querySelectorAll('.star');
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value);
        if (starValue <= currentRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

        function highlightStars(rating) {
            const stars = starRatingContainer.querySelectorAll('.star');
            stars.forEach(star => {
                const starValue = parseInt(star.dataset.value);
                if (starValue <= rating) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });

        }

        for (let i = 1; i <= maxStars; i++){
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '&#9733;'; 
            star.dataset.value = i;
            starRatingContainer.appendChild(star);

            star.addEventListener('click', function () {
                currentRating = i;
                updateStars();
            });
            star.addEventListener('mouseover', function () {
                highlightStars(i);
            });
            star.addEventListener('mouseout', function () {
                highlightStars(currentRating);
            });
        }
        highlightStars(currentRating);
        thecard.appendChild(starRatingContainer);
        cardsContainer.appendChild(thecard)

    })

}
//displayAccommodationCards(accommodations);

