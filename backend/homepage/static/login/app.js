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

const loginForm =document.getElementById("loginForm")

document.addEventListener("DOMContentLoaded", () => {
    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }})

loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    try{
        const response = await fetch("/auth/jwt/create/", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "X-CSRFTOKEN": getCSRFToken(),
            },
            "body": JSON.stringify(data)
        });

        const responseData = await response.json();

        if(response.ok){
            console.log("Successful Login", responseData);
            alert("✅ Successful Login", responseData);
            localStorage.setItem("access_Token", responseData.access);
            localStorage.setItem("refresh_Token", responseData.refresh);
            window.location.href = "/home/";
        }
        else{
            alert("Login Failed Try Again")
        }
    }
    catch(error){
        console.log("Error: ", error)
    }


})