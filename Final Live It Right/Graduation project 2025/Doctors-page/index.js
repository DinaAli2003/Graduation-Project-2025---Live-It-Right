const bookNowBtns = document.querySelectorAll(".book-now-btn");
const confirmationModal = document.getElementById("confirmationModal");
const doctorNameSpan = document.getElementById("doctor-name");
const confirmBookingBtn = document.getElementById("confirm-booking-btn");
const cancelBookingBtn = document.getElementById("cancel-booking-btn");
const bookingModal = document.getElementById("bookingModal");
const closeConfirmationBtn = document.querySelector("#confirmationModal .close"); 
const closeBookingBtn = document.querySelector("#bookingModal .close"); 

bookNowBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const doctorName = this.closest('.doctor--ox').querySelector('.doctor-details p strong').nextSibling.textContent.trim();
    doctorNameSpan.textContent = doctorName; 
    confirmationModal.style.display = "block"; 
  });
});

cancelBookingBtn.addEventListener("click", function() {
  confirmationModal.style.display = "none"; 
});

confirmBookingBtn.addEventListener("click", function() {
  confirmationModal.style.display = "none"; 
  bookingModal.style.display = "block"; 
});

closeConfirmationBtn.addEventListener("click", function() {
  confirmationModal.style.display = "none"; 
});

closeBookingBtn.addEventListener("click", function() {
  bookingModal.style.display = "none"; 
});

window.onclick = function(event) {
  if (event.target == confirmationModal) {
    confirmationModal.style.display = "none";
  }
  if (event.target == bookingModal) {
    bookingModal.style.display = "none";
  }
}

const form = document.getElementById("bookingForm");
form.onsubmit = function(e) {
  e.preventDefault();
  alert("The appointment has been successfully booked!");
  bookingModal.style.display = "none";
  form.reset();
}


function changeLanguage(language) {
  const title = document.getElementById("title-logo");
  const bookNowButtons = document.querySelectorAll(".book-now-btn");
  if (language === "en") {
    title.textContent = "Live It Right";
    bookNowButtons.forEach(button => button.textContent = "Book Now");
  } else {
    title.textContent = "عيشها صح";
    bookNowButtons.forEach(button => button.textContent = "احجز الآن");
  }
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
window.addEventListener('scroll', () => {
    if (navbar.classList.contains('visible')) {
        navbar.classList.remove('visible');
    }
    
});




