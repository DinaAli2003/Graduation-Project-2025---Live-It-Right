document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login");
    const loginBtn = document.getElementById("Login-btn");
    const welcomeMsg = document.getElementById("welcome-msg");
  
    const username = localStorage.getItem("username");
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  
  
    if (isLoggedIn) {
        if (loginLink) loginLink.textContent = "Logout";
        if (loginBtn) loginBtn.textContent = "Logout";
        if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${username}!`;
    }
  
   
    function handleLogout() {
        localStorage.removeItem("loggedIn");
        location.reload(); 
    }
  
    if (loginLink) {
        loginLink.addEventListener("click", function (e) {
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }
  
    if (loginBtn) {
        loginBtn.addEventListener("click", function (e) {
            if (isLoggedIn) {
                e.preventDefault();
                handleLogout();
            }
        });
    }
  
    const categories = document.querySelectorAll(".category");
    const protectedLinks = [
        '../Recipies-page/index.html',
        '../Doctors-page/index.html',
        '../alarm-page/alarm.html'
        
    ];
  
    categories.forEach(category => {
        const targetLink = category.getAttribute('data-link');
  
        if (!isLoggedIn && protectedLinks.includes(targetLink)) {
            category.classList.add('locked');
        } else {
            category.classList.remove('locked');
        }
  
        category.addEventListener("click", () => {
            if (!isLoggedIn && protectedLinks.includes(targetLink)) {
              showAlert("Login is required to access this section!");
                    } else {
                if (targetLink) {
                    window.open(targetLink, '_blank');
                }
            }
        });
    });
  
  });  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotImg = document.getElementById("chatbot-img");
  
  chatbotIcon.addEventListener("click", () => {
    chatbotImg.style.transform = "translateY(-10px)";
    setTimeout(() => {
      chatbotImg.style.transform = "translateY(0)";
    }, 300);
  
  });
  
  function showAlert(message) {
      document.getElementById("alert-message").textContent = message;
      document.getElementById("custom-alert").style.display = "flex";
    }
    
    function closeAlert() {
      document.getElementById("custom-alert").style.display = "none";
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
  
      updateUI();
  
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



const readMoreBtn = document.getElementById("readMoreBtn");
const popupModal = document.getElementById("popupModal");
const closeBtn = document.querySelector(".close-btn");

readMoreBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent link navigation
  popupModal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  popupModal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === popupModal) {
    popupModal.style.display = "none";
  }
});

function openModal(id) {
    document.getElementById(id).style.display = "flex";
  }

  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  window.onclick = function(event) {
    const modals = document.querySelectorAll(".custom-popup");
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  };









