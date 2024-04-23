document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await loginUser(username, password);
            handleLoginResponse(response);
        } catch (error) {
            console.error('Error during login:', error);
        }
    })
});

async function loginUser(username, password) {
    const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: [
            'Content-Type', 'application/json'
        ],
        body: JSON.stringify({
            userName: username,
            userPassword: password
        })
    });

    if(!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
}

function handleLoginResponse(response) {
    if (response.includes('Successfull')) {
        const userId = response[1];
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userId', userId);

        window.location.href = './shop.html';
    } else {
        console.error('Login failed:', response);
    }
}