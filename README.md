# Project 2 - Flack

A simple chatroom app utilizing FlaskSocket and SocketIO.

Users can:
* Create uniquely named chatrooms
* Message each other within the chatrooms
* Read up to 100 of the messages sent in each room

Upon exiting the web app, revisiting the web app will load the last page the user was on.

### Personal Touch
> Einstein once said, emojis are the truth to the universe.

Therefore, my personal touch on the app consists of an array of ASCII emoticons and emojis in unicode. Each message sent is randomly assigned an art icon from the array as determined by the function:
``` 
Math.floor(Math.random() * emoticon.length);
```
  
# Files

There are two html files, an index and a chatroom file. The index file lists the current rooms while the chatroom file mimics the index file but adds messaging functionality.

This was my first real learning experience with JavaScript and the project as a whole was built with love and frustration.
Enjoy!
