document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');
    const registerUsername = document.getElementById('register-username');
    const registerPassword = document.getElementById('register-password');
    const registerEmail = document.getElementById('register-email');
    const registerAddress = document.getElementById('register-address');

    const baseUrl = 'http://localhost:8080/api/v1/users/register';

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Client-side validation to check if password field is empty
        if (!registerPassword.value.trim()) {
            alert('Please enter a password.'); // Display validation message
            return; // Prevent form submission if validation fails
        }

        const bodyObj = {
            username: registerUsername.value,
            password: registerPassword.value,
            email: registerEmail.value,
            address: registerAddress.value
        };

        try {
            console.log('Request Payload:', bodyObj);
            const response = await fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(responseData[0]); // Display success message
                registerForm.reset(); // Clear the form fields
            } else {
                alert('User registration failed'); // Display error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.'); // Display error message
        }
    });
});