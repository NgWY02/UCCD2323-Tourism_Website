function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorMessages = document.getElementById("errorMessages");

    // Clear previous error messages
    errorMessages.classList.add("d-none");
    errorMessages.textContent = "";

    // Validate input fields
    if (!username || !password) {
        errorMessages.classList.remove("d-none");
        errorMessages.textContent = "Please enter both username and password.";
        return;
    }

    // Validate reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (recaptchaResponse.length === 0) {
        errorMessages.classList.remove("d-none");
        errorMessages.textContent = "Please complete the reCAPTCHA.";
        return;
    }

    // Retrieve user data from Local Storage
    const user = localStorage.getItem(username);

    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.password === password) {
            // Set cookies
            document.cookie = `username=${encodeURIComponent(username)}; path=/; secure; SameSite=Strict`;
            document.cookie = `email=${encodeURIComponent(parsedUser.email)}; path=/; secure; SameSite=Strict`;
            document.cookie = `isLoggedIn=true; path=/; secure; SameSite=Strict`;

            // Optionally set session storage
            sessionStorage.setItem("currentUser", JSON.stringify(parsedUser));

            // Redirect to profile page
            window.location.href = "profile.html";
        } else {
            errorMessages.classList.remove("d-none");
            errorMessages.textContent = "Incorrect username or password.";
        }
    } else {
        errorMessages.classList.remove("d-none");
        errorMessages.textContent = "Incorrect username or password.";
    }
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword").querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}
