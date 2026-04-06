const navButton = document.querySelector('#hambtn');
const menu = document.querySelector('#menu');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    menu.classList.toggle('show');
});
