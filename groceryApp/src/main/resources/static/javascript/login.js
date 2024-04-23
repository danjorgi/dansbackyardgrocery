document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await loginUser(username, password);
            handleLoginResponse(response, username);
        } catch (error) {
            console.error('Error during login:', error);
        }
    })
});

async function loginUser(username, password) {
    const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: username,
            userPassword: password
        })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
}

function handleLoginResponse(response, username) {
    if (response.length > 0 && response[0].includes('Login Successful')) {
        const userId = response.length > 1 ? response[1] : null;
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);

        console.log('Login successful');
        updateNavbar();
        const messageContainer = document.getElementById('login-message');
        messageContainer.textContent = 'Login successful';
    } else {
        console.error('Login failed:', response);
        const messageContainer = document.getElementById('login-message');
        messageContainer.textContent = 'Login failed. Please check your username and password.'
    }
}