function handleRegistration(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const status = "online";

    const user = {
        username: username,
        password: password,
        email: email,
        status: status
    }
    console.log(user);
    fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(r => {
        if (!r.ok) {
            throw new Error("Net response is not ok");
        }
        return r;
    }).then(() => {
        localStorage.setItem('connectedUser', JSON.stringify(user));
        window.location.href = 'index.html';
    }).catch(err => {
        console.log('POST request Error: ', err);
    })
}

const registrationForm = document.getElementById('registrationForm');
registrationForm.addEventListener('submit', handleRegistration)