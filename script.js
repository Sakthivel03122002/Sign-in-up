let isLogin = true;

// Strong password rule
const passwordRegex =
/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// Clear inputs
function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("message").innerText = "";
}

// Toggle Login / Signup
function toggleForm() {
    isLogin = !isLogin;
    clearFields();

    document.getElementById("formTitle").innerText = isLogin ? "Login" : "Sign Up";
    document.getElementById("toggleText").innerText = isLogin
        ? "Don’t have an account?"
        : "Already have an account?";

    document.getElementById("nameField").style.display = isLogin ? "none" : "block";
    document.getElementById("confirmPasswordField").style.display = isLogin ? "none" : "block";
    document.getElementById("forgotPasswordLink").style.display = isLogin ? "block" : "none";
}

// Submit Handler
function handleSubmit() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("message");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return showError("Enter a valid email.");

    if (!passwordRegex.test(password))
        return showError("Password must contain 1 uppercase, 1 number, 1 special character & min 6 chars.");

    // SIGNUP
    if (!isLogin) {
        if (name === "") return showError("Full name is required.");

        if (password !== confirmPassword)
            return showError("Passwords do not match.");

        localStorage.setItem("user", JSON.stringify({ name, email, password }));

        message.className = "text-success";
        message.innerText = "Signup successful! Please login.";
        setTimeout(toggleForm, 1500);
        return;
    }

    // LOGIN
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return showError("No account found. Please sign up.");

    if (email !== storedUser.email || password !== storedUser.password)
        return showError("Invalid email or password.");

    message.className = "text-success";
    message.innerText = `Welcome back, ${storedUser.name}!`;
}

// Forgot Password
function showForgotPassword() {
    const email = prompt("Enter your registered email:");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || email !== user.email) {
        alert("Email not found.");
        return;
    }

    const newPassword = prompt("Enter new password:");
    if (!passwordRegex.test(newPassword)) {
        alert("Password must meet security rules.");
        return;
    }

    user.password = newPassword;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Password reset successful. Please login.");
}

// Error helper
function showError(text) {
    const message = document.getElementById("message");
    message.className = "text-danger";
    message.innerText = text;
}
