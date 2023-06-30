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
    loginPopup(false);
});
function loginPopup(dropdown) {
    if (dropdown) {
      toggleDropdown();
    }
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
      // bodyElement.style.backgroundImage = "url('morning-background.jpg')";
      bodyElement.classList.toggle("morning", true);
      bodyElement.classList.toggle("afternoon", false);
      bodyElement.classList.toggle("evening", false);
    } else if (currentTime >= 12 && currentTime < 18) {
      // bodyElement.style.backgroundImage = "url('afternoon-background.jpg')";
      bodyElement.classList.toggle("morning", false);
      bodyElement.classList.toggle("afternoon", true);
      bodyElement.classList.toggle("evening", false);
    } else {
      // bodyElement.style.backgroundImage = "url('evening-background.jpg')";
      bodyElement.classList.toggle("morning", false);
      bodyElement.classList.toggle("afternoon", false);
      bodyElement.classList.toggle("evening", true);
    }
  });
  