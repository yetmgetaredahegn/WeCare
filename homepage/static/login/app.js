// function getCSRFToken() {
//     let cookieValue = null;
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//         cookie = cookie.trim();
//         if (cookie.startsWith('csrftoken=')) {
//             cookieValue = cookie.substring('csrftoken='.length);
//             break;
//         }
//     }
//     return cookieValue;
// }

// const login =document.getElementById("loginForm")

// login.addEventListener("submit", async(e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = {
//         email: formData.get("email"),
//         password: formData.get("password")
//     }


// })