const formErrors = [];

function displayError(message) {
  const errorOutput = document.querySelector('.errors');
  errorOutput.textContent = message;
  errorOutput.style.display = 'block';
  setTimeout(() => {
    errorOutput.style.display = 'none';
  }, 5000);
}

function validateInput(input, pattern) {
  if (!pattern.test(input.value)) {
    if (input.name === "first-name" || input.name === "last-name" || input.name === "email" || input.name === "subject" || input.name === "message") {
      input.style.border = '2px solid red';
      input.setCustomValidity(`Invalid character in ${input.name}`);
      formErrors.push({ field: input.name, error: 'Invalid character' });
      input.classList.add('error-flash');
      setTimeout(() => input.classList.remove('error-flash'), 300);
      return false;
    }
  }
  input.style.border = '';
  input.setCustomValidity('');
  return true;
}

function enforceMasking(event, pattern) {
    const input = event.target;
    const regex = new RegExp(pattern);
  
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^a-zA-Z0-9\s+.-]/g, '');
      
      displayError(`Invalid character in ${input.name}`);
  
      input.classList.add('error-flash');
      setTimeout(() => input.classList.remove('error-flash'), 300);
    }
  }

function updateCharCount() {
  const textarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  const remaining = 200 - textarea.value.length;
  charCount.textContent = `${remaining} characters remaining`;
  if (remaining < 10) {
    charCount.style.color = 'red';
  } else {
    charCount.style.color = 'black';
  }
  if (remaining < 0) {
    textarea.value = textarea.value.substring(0, 200);
    displayError('Character limit exceeded!');
  }
}

document.getElementById('first-name').addEventListener('input', (e) => {
  validateInput(e.target, /^[A-Za-z]+$/);
  enforceMasking(e, "^[A-Za-z]+$");
});

document.getElementById('last-name').addEventListener('input', (e) => {
  validateInput(e.target, /^[A-Za-z]+$/);
  enforceMasking(e, "^[A-Za-z]+$");
});

document.getElementById('countryCode').addEventListener('input', (e) => {
  validateInput(e.target, /^\+?[0-9]+$/);
  enforceMasking(e, "^\+?[0-9]+$");
});

document.getElementById('phoneNumber').addEventListener('input', (e) => {
  validateInput(e.target, /^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/);
  enforceMasking(e, "^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$");
});

document.getElementById('message').addEventListener('input', updateCharCount);

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  formErrors.length = 0;

  const isValid = Array.from(document.querySelectorAll('input, textarea')).every(input => {
    if (input.required && !input.value.trim()) {
      formErrors.push({ field: input.name, error: 'Field is required' });
      return false;
    }
    if (input.pattern) {
      const pattern = new RegExp(input.pattern);
      return validateInput(input, pattern);
    }
    return true;
  });

  if (isValid) {
    const formErrorsInput = document.createElement('input');
    formErrorsInput.type = 'hidden';
    formErrorsInput.name = 'form-errors';
    formErrorsInput.value = JSON.stringify(formErrors);
    e.target.appendChild(formErrorsInput);

    e.target.submit();
  }
});