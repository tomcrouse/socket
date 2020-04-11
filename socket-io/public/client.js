const socket = io();
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const form = document.querySelector('.form')
const msgList = document.querySelector('.msg')

const addMessage = ({ name, message }) => {
    const item = document.createElement('li');
    item.innerText = `${name}: ${message}`;
    msgList.appendChild(item)
}

const enterMessage = (name) => {
    const item = document.createElement('li');
    item.innerText = `${name} Enter the chat`;
    msgList.appendChild(item)
}

const greetMessage = msg => {
    const item = document.createElement('li');
    item.style.cssText = `
    color: white;`
    item.innerText = `${msg} Welcome to the chat`;
    msgList.appendChild(item)
}

const name = prompt('Your name', 'write your name...')
greetMessage(name)
socket.emit('new-user', name)

socket.on('connection', greeting => {
    console.log(greeting)
})
    .on('greeting', enterMessage)
    .on('message', addMessage)

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
        name: name,
        message: input.value
    };
    socket.emit('message', data);
    input.value = ''
})