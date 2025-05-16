document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const messageBox = document.getElementById('form-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending (you can replace this with actual API call)
    showMessage('Message sent successfully!', 'success');
    form.reset();
  });

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = type; // CSS should define .success and .error
  }

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
});
