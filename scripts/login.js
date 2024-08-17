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
            document.cookie = `username=${encodeURIComponent(username)}; path=/`;
            document.cookie = `email=${encodeURIComponent(parsedUser.email)}; path=/`;
            document.cookie = `isLoggedIn=true; path=/`;

            // Debugging: Check if cookies are set
            console.log('Cookies after login:', document.cookie);

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
    const togglePasswordIcon = document.getElementById("togglePassword").querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePasswordIcon.classList.remove("fa-eye");
        togglePasswordIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        togglePasswordIcon.classList.remove("fa-eye-slash");
        togglePasswordIcon.classList.add("fa-eye");
    }
}
