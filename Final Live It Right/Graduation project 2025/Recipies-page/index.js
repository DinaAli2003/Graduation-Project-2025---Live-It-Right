document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login");
    const loginBtn = document.getElementById("Login-btn");
    const welcomeMsg = document.getElementById("welcome-msg");

    function updateUI() {
        const username = localStorage.getItem("username");
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";

        if (isLoggedIn) {
            if (loginLink) loginLink.textContent = "Logout";
            if (loginBtn) loginBtn.textContent = "Logout";
            if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${username}!`;
        } else {
            if (loginLink) loginLink.textContent = "Login";
            if (loginBtn) loginBtn.textContent = "Login";
            if (welcomeMsg) welcomeMsg.textContent = "";
        }
    }

    function handleLogout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        updateUI();
    }

    if (loginLink) {
        loginLink.addEventListener("click", function (e) {
            const isLoggedIn = localStorage.getItem("loggedIn") === "true";
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            const isLoggedIn = localStorage.getItem("loggedIn") === "true";
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }

    // أول ما تفتح الصفحة تحدث شكل الزر
    updateUI();

    // لو في صفحة تانية غيرت حالة الدخول/الخروج
    window.addEventListener("storage", function (event) {
        if (event.key === "loggedIn" || event.key === "username") {
            updateUI();
        }
    });
});


const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('visible'); 
});
window.addEventListener('scroll', () => {
    if (navbar.classList.contains('visible')) {
        navbar.classList.remove('visible');
    }
});
