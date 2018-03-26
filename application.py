import os
import requests

from datetime import datetime
from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

rooms = []

@app.route("/")
def index():
    return render_template('index.html', rooms=rooms)

# Creates a room and appends it to rooms global variable
@socketio.on('create room')
def handle_room(room):
    room_messages = []
    chatroom = {'room': room, 'room_messages': room_messages}
    rooms.append(chatroom)
    print(chatroom)
    emit("created room", room, broadcast=True)

# Sends the client the room name and messages stored
# @socketio.on('join_room')
@app.route('/<room>')
def join_room(room):
    joined_room = next((x for x in rooms if x['room'] == room), None)
    print (joined_room)
    return render_template('chatroom.html', joined_room=joined_room, rooms=rooms)

@socketio.on('message_sent')
def handle_message(message_sent):
    message = message_sent['message']
    room = message_sent['room']
    user_id = message_sent['user_id']
    time_stamp = message_sent['time_stamp']
    accepted_message = user_id + ': ' + message + ' @' + time_stamp
    room_messages = next((x for x in rooms if x['room'] == room))['room_messages']

    if len(room_messages) > 100:
        room_messages.pop(0)
        
    room_messages.append(accepted_message)
    print(room_messages)
    emit('accepted_message', (accepted_message, room), broadcast=True)






if __name__ == '__main__':
    socketio.run(app)
