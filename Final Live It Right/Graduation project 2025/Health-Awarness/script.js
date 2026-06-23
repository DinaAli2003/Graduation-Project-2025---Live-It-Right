
function showInfo(type) {
    const infoBox = document.getElementById('infoBox');
    const firstAidSection = document.getElementById('firstAidSection');
    
    // Hide both sections initially
    infoBox.classList.remove('show');
    firstAidSection.classList.add('hidden');
    
    if (type === 'firstaid') {
        firstAidSection.classList.remove('hidden');
        return;
    }
    
    let content = "";
    
    switch(type) {
        case 'gluten':
        content = "<h2>Gluten Sensitivity</h2><p>It can cause bloating, fatigue, and digestive issues. Avoid wheat, barley, and rye.</p>";
        break;
        case 'diabetes':
        content = "<h2>Diabetes</h2><p>Manage your blood sugar with proper diet and medication. Monitor regularly.</p>";
        break;
        case 'lactose':
        content = "<h2>Lactose Intolerance</h2><p>Avoid dairy or use lactose-free alternatives to reduce discomfort.</p>";
        break;
        default:
        content = "<h2>Click any section to learn more</h2>";
    }
    
    infoBox.innerHTML = content;
    infoBox.classList.add('show');
    }


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


