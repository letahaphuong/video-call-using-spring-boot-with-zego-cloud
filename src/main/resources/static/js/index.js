function loadAndDisplayUsers() {

    // check if the user is connected
    const connectedUser = localStorage.getItem("connectedUser");
    if (!connectedUser) {
        window.location = 'login.html';
        return;
    }


    const userListElement = document.getElementById("userList");
    // Clear any existing content in the userList.
    userListElement.innerHTML = "Loading...";

    // Retrieve the userList from LocalStorage
    fetch('http://localhost:8080/api/v1/users')
        .then(res => {
            return res.json();
        }).then(data => {
        console.log(data);
        displayUser(data, userListElement);
    })

}

function displayUser(userList, userListElement) {
    userListElement.innerHTML = "";
    userList.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML =
            `
            <div>
                <i class="fa fa-user-circle"></i>
                ${item.username} <i class="user-email">(${item.email})</i>
            </div>
            <i class="fa fa-lightbulb-o ${item.status === "online" ? "online" : "offline"} "></i>
            `;
        userListElement.appendChild(listItem);
    })
}

window.addEventListener("load", loadAndDisplayUsers);

function handleLogout() {
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('ConnectedUser')
    }).then(r => {
        return r;
    }).then(data => {
        localStorage.removeItem('ConnectedUser');
        window.location.href = 'login.html';
    })
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener('click', handleLogout);

function handleNewMeeting(e) {
    const user = JSON.parse(localStorage.getItem('connectedUser'));
    window.open(`videocall.html?username=${user.username}`);
}

const newMeetingBtn = document.getElementById('newMeetingBtn');
newMeetingBtn.addEventListener('click', handleNewMeeting);

function handleJoinMeeting(event) {
    const roomID = document.getElementById('meetingName').value;
    const user = JSON.parse(localStorage.getItem('connectedUser'));

    const url = `http://localhost:8080/videocall.html?roomID=${roomID}&username=${user.username}`;
    window.open(url, '_blank')
}

const joinMeetingBtn = document.getElementById('joinMeetingBtn');
joinMeetingBtn.addEventListener('click', handleJoinMeeting)