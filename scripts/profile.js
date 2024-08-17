document.addEventListener("DOMContentLoaded", function() {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");
    const usernameDisplayHeader = document.getElementById("usernameDisplayHeader");

    // Function to get the value of a specific cookie by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Retrieve user data from cookies
    const username = getCookie("username");
    const email = getCookie("email");

    console.log('Username Cookie:', username);
    console.log('Email Cookie:', email);

    if (username && email) {
        // Display the user data on the profile page
        usernameDisplay.textContent = decodeURIComponent(username);
        usernameDisplayHeader.textContent = decodeURIComponent(username);
        emailDisplay.textContent = decodeURIComponent(email);
    } else {
        // Show the modal if the user is not logged in
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }
});

function logout() {
    // Clear cookies
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    // Clear session storage (optional)
    sessionStorage.removeItem("currentUser");

    // Redirect to login page
    window.location.href = "login.html";
}

