console.log("JavaScript file loaded.");

function redirectToRegisterPage() {
    // Redirect to the register.html page
    window.location.href = "Register.html";
}

function redirectToLoginPage() {
    // Redirect to RedirectToLogin.html
    window.location.href = "Login.html";
}

function redirectToGuestHomePage() {
    // Redirect to the register.html page
    window.location.href = "GuestLabSelection.html";
}

function redirectToHomePage() {
    // Redirect to the register.html page
    window.location.href = "Home.html";
}

function LoginToHomePage(){
    window.location.href = "Home.html";
}

function redirectToReservationsPage() {
    // Redirect to the register.html page
    window.location.href = "YourReservations.html";
}

function redirectToSelectionPage() {
    // Redirect to the register.html page
    window.location.href = "LabSelection.html";
    
}

function viewProfile() {
    window.location.href = "UserProfile.html";
}

function logout() {
    window.location.href = "index.html";
}

function studentView() {
    window.location.href = "Redirection/SwitchStudent.html";
}

function techView() {
    window.location.href = "Redirection/SwitchTech.html";
}

function studentView(){
    window.location.href = "Laboratory-Student.html";
}

function techView() {
    window.location.href = "Laboratory-LabTech.html";
}

function openUserProfile(email) {
    localStorage.setItem('otherUserEmail', email);
    window.location.href = "Redirection/RedirectToOthers.html";
}

function updateCurrentEmail(email) {
    currentEmail = email;
    displayUserReservations(); // Call the function to display reservations
}

async function loadCurrentAccount(email) {
    try {
        const response = await fetch(`https://ccapdevmco3.adaptable.app/accounts/${email}`);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to load user. Server response: ${errorMessage}`);
        }

        const currentUser = await response.json();

        if (currentUser) {
            document.querySelector('.header-profile-image').src = currentUser.image;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error loading user:', error.message);
    }
}

async function loadUser() {
    try {
        const response = await fetch(`https://ccapdevmco3.adaptable.app/accounts/${localStorage.getItem('currentEmail')}`);
        console.log(response);  // Log the entire response object

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to load user. Server response: ${errorMessage}`);
        }

        const currentUser = await response.json();

        if (currentUser) {
            document.querySelector('.profile-image').src = currentUser.image;
            document.querySelector('.user-name').textContent = currentUser.name;
            document.querySelectorAll('.user-details p')[0].textContent += ` ${currentUser.email}`;
            document.querySelectorAll('.user-details p')[1].textContent += ` ${currentUser.bio}`;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error loading user:', error.message);
    }
}

async function loadOtherUser() {
    try {
        const response = await fetch(`https://ccapdevmco3.adaptable.app/accounts/${localStorage.getItem('otherUserEmail')}`);
        console.log(response);  // Log the entire response object

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to load user. Server response: ${errorMessage}`);
        }

        const currentUser = await response.json();

        if (currentUser) {
            document.querySelector('.profile-image').src = currentUser.image;
            document.querySelector('.user-name').textContent = currentUser.name;
            document.querySelectorAll('.user-details p')[0].textContent += ` ${currentUser.email}`;
            document.querySelectorAll('.user-details p')[1].textContent += ` ${currentUser.bio}`;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error loading user:', error.message);
    }
}

function convertTimeToDate(timeString) {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === 'PM' && hours < 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0); // Set hours and minutes

    return date;
}



// Function to validate the registration form
function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const errorMessage = document.getElementById("error-message");

    // Clear previous error messages
    errorMessage.textContent = "";

    // Add your validation logic here
    const emailPattern = /^[a-zA-Z0-9._-]+@dlsu.edu.ph$/;

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Invalid Email Address";
        errorMessage.style.color = "red";
        errorMessage.style.fontStyle = "italic";
        return false;
    }

    if (password === "") {
        errorMessage.textContent = "Password is required";
        errorMessage.style.color = "red";
        errorMessage.style.fontStyle = "italic";
        return false;
    }

    if (password !== repassword) {
        errorMessage.textContent = "Passwords do not match";
        errorMessage.style.color = "red";
        errorMessage.style.fontStyle = "italic";
        return false;
    }

    // Additional validation checks can be added

    return true;
}


// Your login function
async function submitLoginForm() {
    var emailInput = document.getElementById('email').value;
    var passwordInput = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('https://ccapdevmco3.adaptable.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const userData = await response.json();

        // Update the global variable with user data
        localStorage.setItem('currentEmail', userData.email);
        localStorage.setItem('currentLogIn', userData.email);
        localStorage.setItem('currentType', userData.type);

        LoginToHomePage();
    } catch (error) {
        errorMessage.textContent = "Log-in failed. Your credentials did not match any of our records.";
    }
}

function submitRegisterForm() {
    var emailInput = document.getElementById('email').value;
    var passwordInput = document.getElementById('password').value;
    var repasswordInput = document.getElementById('repassword').value;
    var accountTypeInput = document.getElementById('accountType').value;
    var errorMessage = document.getElementById('error-message');

    // Validate email format
    var emailRegex = /^[a-zA-Z0-9._-]+@dlsu\.edu\.ph$/;
    if (!emailRegex.test(emailInput)) {
        errorMessage.textContent = "Invalid DLSU Email. It should end in '@dlsu.edu.ph'.";
        return; // Stop further execution if email is invalid
    }

    // Make a POST request to the server to register the new account
    fetch('https://ccapdevmco3.adaptable.app/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            repassword: repasswordInput,
            type: accountTypeInput,
            // Include other registration details as needed
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error during account registration:', data.error);
            errorMessage.textContent = data.message;
        } else {
            // Handle successful registration
            console.log(data.message);
            errorMessage.textContent = data.message;
            // Perform any further actions, such as redirecting to the login page
            window.location.href = 'Login.html';
        }
    })
    .catch(error => {
        console.error('Error during account registration:', error.message);
        errorMessage.textContent = "Error registering account. Please try again.";
    });
}
