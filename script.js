const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('register');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('register');
});

btnPopup.addEventListener('click', ()=> {
    loginPopup();
});
function loginPopup() {
    wrapper.classList.add('active-popup');
}

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    var dropdownBtn = document.querySelector(".dropdown-btn");

    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    dropdownBtn.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    var currentTime = new Date().getHours();
    var bodyElement = document.querySelector("body");
  
    if (currentTime >= 6 && currentTime < 12) {
      // Morning
      bodyElement.style.backgroundImage = "url('morning-background.jpg')";
    } else if (currentTime >= 12 && currentTime < 18) {
      // Afternoon
      bodyElement.style.backgroundImage = "url('afternoon-background.jpg')";
    } else {
      // Evening/Night
      bodyElement.style.backgroundImage = "url('evening-background.jpg')";
    }
  });
  