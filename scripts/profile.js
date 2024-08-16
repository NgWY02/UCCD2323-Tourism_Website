document.addEventListener("DOMContentLoaded", function() {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");
    const usernameDisplayHeader = document.getElementById("usernameDisplayHeader");

    // Retrieve user data from session storage
    const currentUser = sessionStorage.getItem("currentUser");

    if (currentUser) {
        // Parse the stored JSON string into a JavaScript object
        const user = JSON.parse(currentUser);

        // Display the user data on the profile page
        usernameDisplay.textContent = user.username;
        usernameDisplayHeader.textContent = user.username;
        emailDisplay.textContent = user.email;
    } else {
        // Show the modal if the user is not logged in
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }
});


function logout() {
    // Clear session storage
    sessionStorage.removeItem("currentUser");

    // Clear cookies if necessary
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    // Redirect to login page
    window.location.href = "login.html";
}
