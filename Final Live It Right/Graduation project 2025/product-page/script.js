

// // Simulate a login check (replace this with actual login logic if available)
// let isLoggedIn = false; // Change to true if the user is logged in

// // Add event listeners to all "Order Now" buttons
// document.querySelectorAll('.login-required').forEach(button => {
//     button.addEventListener('click', function(event) {
//         event.preventDefault(); // Prevent the default link behavior
//         if (!isLoggedIn) {
//             showModal();
//         } else {
//             // Redirect to the actual payment link
//             window.location.href = this.getAttribute('href');
//         }
//     });
// });

// // Modal functionality
// const modal = document.getElementById('loginModal');
// const closeBtn = document.querySelector('.close-btn');

// function showModal() {
//     modal.style.display = 'block';
// }

// function closeModal() {
//     modal.style.display = 'none';
// }

// closeBtn.addEventListener('click', closeModal);

// // Close modal when clicking outside of it
// window.addEventListener('click', function(event) {
//     if (event.target === modal) {
//         closeModal();
//     }
// });

// // Redirect to login page (replace with your actual login page URL)
// function redirectToLogin() {
//     window.location.href = '/signup&login-page/login.html'; // Replace with your login page URL
// }




// Simulate a login check (replace this with actual login logic if available)
let isLoggedIn = localStorage.getItem('loggedIn') === 'true'; // Check login status from localStorage

// Add event listeners to all "Order Now" buttons
document.querySelectorAll('.login-required').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        if (!isLoggedIn) {
            showModal(); // Show login modal if not logged in
        } else {
            // Redirect to the actual payment link
            window.location.href = this.getAttribute('href');
        }
    });
});

// Modal functionality
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close-btn');

function showModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Redirect to login page (replace with your actual login page URL)
function redirectToLogin() {
    window.location.href = '../signup&login-page/login.html'; // Replace with your login page URL
}

// Simulate login action (this should be replaced with actual login logic)
function loginUser() {
    localStorage.setItem('loggedIn', 'true'); // Set login status in localStorage
    closeModal(); // Close the modal after login
    alert('You are now logged in! You can proceed to purchase.');
    isLoggedIn = true; // Update the login status
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

// Open the modal

// function openLoginModal() {
//     const modal = document.getElementById('loginModal');
//     modal.style.display = 'block';
// }

// Close the modal

// function closeLoginModal() {
//     const modal = document.getElementById('loginModal');
// //     modal.style.display = 'none';
// // }

// Close the modal when clicking outside of it
// window.onclick = function (event) {
//     const modal = document.getElementById('loginModal');
//     if (event.target === modal) {
//         modal.style.display = 'none';
//     }
// };