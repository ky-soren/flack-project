const emoticon = ["(✿◠‿◠)","(ಠ_ಠ)","^(;,;)^","(ㆆ _ ㆆ)","( ͡° ͜ʖ ͡°)","¯\\_(ツ)_/¯","💩","🦊","🐶"]
const currentRoom = localStorage.getItem("currentRoom");
if (currentRoom) {
    const domain = window.location.origin;
    const url = domain + '/' + encodeURIComponent(currentRoom);
    if (url !== document.URL) {
      window.location.replace(url);
    }
  }

function  setCurrentRoom(room)  {
    localStorage.setItem("currentRoom", room);
  }

document.addEventListener('DOMContentLoaded', () => {

    // Stores a username in local storage
    if (localStorage.getItem("userID") === null)  {
        localStorage.setItem("userID", prompt("Enter a chat ID"));
    };


    // Sets the username if it exists in local storage
    const userID = document.querySelector('#userID')
    userID.innerHTML = localStorage.userID;

    // Creates a new room
    document.querySelector('#new_room').onsubmit = (e) => {
        e.preventDefault();
        const room = document.querySelector('#room_name').value;
        const room_id = document.getElementById(room);
        if (room_id) {
            alert('That room already exists!');
            document.querySelector('#room_name').value = '';
          }
        else {
            socket.emit('create room', room);
            document.querySelector('#room_name').value = '';
        }

    };

    // Appends a new room to the list of rooms
    socket.on('created room', room => {
        const roomList = document.getElementById('room_list')
        const li = document.createElement('li');
        li.innerHTML = `<a href="${room}" id="${room}" data-page="${room}">${room}</a>`;
        document.querySelector('#room_list').append(li);
        li.onclick = () => {
          localStorage.setItem("currentRoom", room);
        }
        roomList.scrollTop = roomList.scrollHeight;
    });



    // Sends a message
    document.querySelector('#new_message').onsubmit = (e) =>  {
        e.preventDefault();
        const message = document.querySelector('#message').value;
        const room = document.querySelector('#room_title').innerHTML;
        const user_id = localStorage.getItem("userID");
        const time_stamp = new Date(Date.now()).toLocaleString();
        const message_sent = {message: message, room: room, user_id: user_id, time_stamp: time_stamp};
        socket.emit('message_sent', message_sent);
        document.querySelector('#message').value = '';
    };

    // Shows the message
    socket.on('accepted_message', (accepted_message, room) =>  {
        if (room === document.querySelector('#room_title').innerHTML) {
            const messageLog = document.getElementById('message_log');
            const li = document.createElement('li');

            //My personal touch
            const randomEmoticon = emoticon[Math.floor(Math.random() * emoticon.length)];
            li.setAttribute("class","messages");
            li.innerHTML = accepted_message + ' ' + randomEmoticon;
            messageLog.append(li);
            messageLog.scrollTop = messageLog.scrollHeight;

            if (messageLog && messageLog.getElementsByTagName('li').length > 100) {
                messageLog.removeChild(messageLog.children[0]);
            }
        } else {
            return null;
        }

    });

});
