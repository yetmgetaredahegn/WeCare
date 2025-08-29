// helper: get CSRF token from cookie
function getCSRFToken() {
    let cookieValue = null;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('csrftoken=')) {
            cookieValue = cookie.substring('csrftoken='.length);
            break;
        }
    }
    return cookieValue;
}

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        first_name: formData.get("firstname"),
        last_name: formData.get("lastname"),
        email: formData.get("email"),
        password: formData.get("password"),
        re_password: formData.get("confirm_password"),
        is_doctor: formData.get("role") === "Doctor",
        is_patient: formData.get("role") === "Patient",
    };

    try {
        const response = await fetch("/auth/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken(),  // ✅ include CSRF
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert("✅ Registration successful! You can now login.");
            window.location.href = "/login/";
        } else {
            const error = await response.json();
            alert("❌ Registration failed: " + JSON.stringify(error));
        }
    } catch (err) {
        console.error("Error:", err);
        alert("❌ Something went wrong, try again.");
    }
});
