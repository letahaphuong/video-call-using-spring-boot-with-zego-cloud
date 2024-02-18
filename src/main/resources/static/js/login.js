function handleLogin(event) {
    event.preventDefault();
    // get user input

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        email: email,
        password: password
    }

    fetch('http://localhost:8080/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(r => {

        if (!r.ok) {
            alert("Login and / or password is in correct");
        }

        return r.json();
    }).then((r) => {
        localStorage.setItem("ConnectedUser", JSON.stringify(r));
        window.location.href = 'index.html';
    }).catch(err => {
        console.error("POST request Error:", err)
    });
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", handleLogin);