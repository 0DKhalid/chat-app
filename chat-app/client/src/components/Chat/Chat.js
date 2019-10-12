import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://react-realtime-chat-app.herokuapp.com';

  useEffect(() => {
    const name = location.search.split('&')[0].split('=')[1];
    const room = location.search.split('&')[1].split('=')[1];
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on('message', message => setMessages([...messages, message]));
  }, [messages]);

  useEffect(() => {
    socket.on('roomData', ({ users }) => setUsers(users));
  }, [users]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
