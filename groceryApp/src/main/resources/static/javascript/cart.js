document.addEventListener("DOMContentLoaded", () => {
    // Declare variables for DOM elements
    const userInfo = document.getElementById('user-info');
    const orderButton = document.querySelector('.order-btn');

    // Function to update navbar
    function updateNavbar() {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            userInfo.innerHTML = `
                <span class="nav-link text-white">Welcome, ${username}</span>
                <button class="btn btn-link nav-link" onclick="logout()">Logout</button>
            `;
        } else {
            userInfo.innerHTML = `
                <a class="nav-link text-white" href="./login.html">Sign in</a>
            `;
        }
    }

    function logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        window.location.href = './login.html';
    }

    updateNavbar();

    orderButton.addEventListener('click', () => {
        
    });
});