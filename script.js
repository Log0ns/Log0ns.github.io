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

/* SERVER */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    //const deleteForm = document.getElementById('deleteForm');

    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = registerForm.querySelector('#username').value;
        const password = registerForm.querySelector('#password').value;

        registerUser(username, password);
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = loginForm.querySelector('#username').value;
        const password = loginForm.querySelector('#password').value;

        loginUser(username, password);
    });

    /*deleteForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = deleteForm.querySelector('#username').value;

        deleteUser(username);
    });*/

    function registerUser(username, password) {
        const userData = {
            username,
            password
        };

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.text())
            .then(message => {
                console.log(message);
                registerForm.reset();
            })
            .catch(error => console.error(error));
    }

    function loginUser(username, password) {
        const userData = {
            username,
            password
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.text())
            .then(message => {
                console.log(message);
                loginForm.reset();
            })
            .catch(error => console.error(error));
    }

    /*function deleteUser(username) {
        const userData = {
            username
        };

        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.text())
            .then(message => {
                console.log(message);
                deleteForm.reset();
            })
            .catch(error => console.error(error));
    }*/
});