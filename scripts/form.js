//console.log('linked')

const form = document.getElementById('js-quoteForm');
const errorElem = document.querySelector('.formError');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('.name-input').value.trim();
    const email = document.querySelector('.email-input').value.trim();
    const cellNumber = document
        .querySelector('.cell-input')
        .value.replace(/\s+/g, '')
        .trim();
    const projectDetails = document.querySelector('.project-details-input').value.trim()

    let errors = [];

    errorElem.classList.remove('success');
    errorElem.innerHTML = '';
    errorElem.style.display = 'none';
    // Name validation
    if (name.length < 4) {
        errors.push('Name must be at least 4 characters long');
    }

    // Email validation (basic regex)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
        errors.push('Enter a valid email address');
    }

    // Cell number validation
    const phonePattern = /^(\+27|0)[0-9]{9}$/;
    if (!phonePattern.test(cellNumber)) {
        errors.push('Enter a valid phone number (e.g. 0712345678 or +26378345678)');
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

        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Request';

                if (response.ok) {
                    errorElem.innerHTML = '✅ Your request has been sent successfully!';
                    errorElem.classList.add('success');
                    errorElem.style.display = 'block';
                    form.reset();
                } else {
                    errorElem.innerHTML = '❌ Something went wrong. Please try again.';
                    errorElem.style.display = 'block';
                }

                errorElem.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(() => {

                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Request';
                errorElem.innerHTML = '❌ Network error. Please try again.';
                errorElem.style.display = 'block';

                errorElem.scrollIntoView({ behavior: 'smooth' });

            });


    }
});