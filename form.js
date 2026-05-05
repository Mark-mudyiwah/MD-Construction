//console.log('linked')

const form = document.getElementById('js-quoteForm');
const errorElem = document.querySelector('.formError');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('.name-input').value.trim();
    const email = document.querySelector('.email-input').value.trim();
    const cellNumber = document.querySelector('.cell-input').value.trim();
    const projectDetails = document.querySelector('.project-details-input').value.trim()

    let errors = [];

    // Name validation
    if (name.length < 4) {
        errors.push('Name must be at least 3 characters long');
    }

    // Email validation (basic regex)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
        errors.push('Enter a valid email address');
    }

    // Cell number validation
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(cellNumber)) {
        errors.push('Enter a valid 10-digit phone number');
    }

    // project Details Validation
    if (projectDetails.length < 20) {
        errors.push('Please provide at least 20 characters describing your project');
    }

    if (projectDetails.length > 500) {
        errors.push('Project details must not exceed 500 characters');
    }

    // Show errors or submit
    if (errors.length > 0) {
        errorElem.innerHTML = errors.join('<br>');
        errorElem.style.display = 'block';
    } else {

        // form.submit();

        errorElem.innerHTML = '✅ Your request has been sent successfully!';
        errorElem.classList.add('success');
        errorElem.style.display = 'block';

        form.reset();
    }
});