document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const eyeIcons = document.querySelectorAll(".eye-icon");
    const notificationModal = document.getElementById("notification-modal");
    const notificationMessage = document.getElementById("notification-message");
    const closeNotification = document.getElementById("close-notification");

    eyeIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            let passwordField = this.previousElementSibling;
            passwordField.type = passwordField.type === "password" ? "text" : "password";
        });
    });

//     if (signupForm) {
//         signupForm.addEventListener("submit", function (event) {
//             event.preventDefault();

//             const username = document.getElementById("username").value;
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;

//             localStorage.setItem("username", username);
//             localStorage.setItem("email", email);
//             localStorage.setItem("password", password);

//             alert("Sign-up successful!");
//             window.location.href = "login.html";
//         });
//     }

//     if (loginForm) {
//         loginForm.addEventListener("submit", function (event) {
//             event.preventDefault();

//             const loginEmail = document.getElementById("loginEmail").value;
//             const loginPassword = document.getElementById("loginPassword").value;

//             const storedEmail = localStorage.getItem("email");
//             const storedPassword = localStorage.getItem("password");

//             if (loginEmail === storedEmail && loginPassword === storedPassword) {
//                 localStorage.setItem("loggedIn", "true"); // ← ده أهم سطر هنا
//                 alert("Login successful!");
//                 window.location.href = "../Home-page/index.html"; // ← ده كمان لازم يكون صح
//             }
//             else {
//                 alert("Invalid email or password. Please try again.");
//             }
            
//         });
//     }
// });

    // Handle sign-up form submission
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (username && email && password) {
                localStorage.setItem("username", username);
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);

                showNotification("Sign-up successful! You can now log in.");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                showNotification("Please fill out all fields.");
            }
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const loginEmail = document.getElementById("loginEmail").value;
            const loginPassword = document.getElementById("loginPassword").value;

            const storedEmail = localStorage.getItem("email");
            const storedPassword = localStorage.getItem("password");

            if (loginEmail === storedEmail && loginPassword === storedPassword) {
                localStorage.setItem("loggedIn", "true");
                showNotification("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "../Home-page/index.html";
                }, 2000);
            } else {
                showNotification("Invalid email or password. Please try again.");
            }
        });
    }

    // Function to show the notification modal
    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationModal.classList.remove("hidden");
    }

    // Close the notification modal
    closeNotification.addEventListener("click", function () {
        notificationModal.classList.add("hidden");
    });
});


const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('visible'); 
});

