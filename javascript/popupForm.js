// popupForm.js
document.addEventListener('DOMContentLoaded', function() {
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const body = document.body;
const reviewForm = document.getElementById('reviewForm');
const formMessage = document.getElementById('formMessage');
const anonymousCheckbox = document.getElementById('anonymous');
const emailField = document.getElementById('emailField');

// Show popup after 5 seconds
setTimeout(function() {
popupOverlay.classList.add('active');
body.classList.add('popup-active');
}, 5000);

// Close popup when X button is clicked
closePopup.addEventListener('click', function() {
closePopupForm();
});

// Close popup when clicking outside the form
popupOverlay.addEventListener('click', function(e) {
if (e.target === popupOverlay) {
closePopupForm();
}
});

// Toggle email field based on anonymous checkbox
anonymousCheckbox.addEventListener('change', function() {
if (this.checked) {
emailField.style.display = 'none';
document.getElementById('student_email').required = false;
} else {
emailField.style.display = 'flex';
document.getElementById('student_email').required = true;
}
});

// Handle form submission
reviewForm.addEventListener('submit', function(e) {
e.preventDefault();

// Show loading state
const submitBtn = reviewForm.querySelector('.submit-btn');
const originalText = submitBtn.textContent;
submitBtn.textContent = 'Submitting...';
submitBtn.disabled = true;

// Hide previous messages
formMessage.style.display = 'none';

// Get form data
const formData = new FormData(reviewForm);

// Submit via AJAX
fetch('connect.php', {
method: 'POST',
body: formData
})
.then(response => {
const contentType = response.headers.get("content-type");
if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
} else {
    // If server sends text/html instead of JSON, it's a PHP error
    throw new Error('Server returned an invalid format.');
}
})
.then(data => {
if (data.success) {
showMessage(data.message, 'success');
// Reset form
reviewForm.reset();
emailField.style.display = 'flex';
document.getElementById('student_email').required = true;

// Close popup after 3 seconds
setTimeout(() => {
closePopupForm();
}, 3000);
} else {
showMessage(data.message, 'error');
}
})
.catch(error => {
console.error('Error:', error);
showMessage('System busy. We could not process your review at this moment.', 'error');
})
.finally(() => {
// Reset button state
submitBtn.textContent = originalText;
submitBtn.disabled = false;
});
});

function showMessage(message, type) {
formMessage.textContent = message;
formMessage.style.display = 'block';
formMessage.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
formMessage.style.color = type === 'success' ? '#155724' : '#721c24';
formMessage.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
}

function closePopupForm() {
popupOverlay.classList.remove('active');
body.classList.remove('popup-active');
// Reset form when closing
reviewForm.reset();
formMessage.style.display = 'none';
emailField.style.display = 'flex';
document.getElementById('student_email').required = true;
}
});