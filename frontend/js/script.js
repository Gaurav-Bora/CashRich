document.addEventListener("DOMContentLoaded", function () {
  function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{4,15}$/;
    return usernameRegex.test(username);
  }

  function isValidPassword(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    return passwordRegex.test(password);
  }

  function displayMessage(elementId, message, isSuccess) {
    const messageElement = document.getElementById(elementId);
    messageElement.style.color = isSuccess ? "green" : "red";
    messageElement.textContent = message;
  }

  function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!isValidUsername(username)) {
      displayMessage(
        "message",
        "Invalid username. Must be 4-15 characters and alphanumeric.",
        false
      );
      return;
    }

    if (!isValidPassword(password)) {
      displayMessage(
        "message",
        "Invalid password. Must be 8-15 characters with at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        false
      );
      return;
    }

    const data = {
      username: username,
      email: email,
      password: password,
    };

    fetch("http://localhost/cashRich/server/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          displayMessage("message", data.message, true);
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        } else {
          displayMessage("message", data.message, false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayMessage(elementId, message, isSuccess) {
    const messageElement = document.getElementById(elementId);
    messageElement.style.color = isSuccess ? "green" : "red";
    messageElement.textContent = message;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!isValidEmail(email)) {
      displayMessage("loginMessage", "Invalid email format.", false);
      return;
    }

    if (password.length < 8 || password.length > 15) {
      displayMessage(
        "loginMessage",
        "Password must be between 8 and 15 characters.",
        false
      );
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost/cashRich/server/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          // Save the user's name in session storage
          sessionStorage.setItem("userName", data.name);
          // Redirect to another page, e.g., dashboard.html
          window.location.href = "search.html";
        } else {
          displayMessage("loginMessage", data.message, false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  window.signup = signup;
  window.login = login;
});
