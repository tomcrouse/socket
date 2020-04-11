const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room)

socket.emit('join-room', {
    username,
    room
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

socket.on('message', msg => {
    console.log(msg)
    outputMessage(msg)
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
          ${message.text}
        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}


// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    console.log(users)
    userList.innerHTML = `
      ${users.map(user => `<li>${user.name}</li>`).join('')}
    `;
}