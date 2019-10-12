const users = [];

const addUser = ({ room, name, id }) => {
  //clean up room name
  const roomName = room.trim().toLowerCase();
  const userName = name.trim().toLowerCase();
  const exisitingUser = users.find(
    user => user.room === roomName && user.name === userName
  );

  if (exisitingUser) {
    return { error: 'Username is taken' };
  }

  const user = { id, name: userName, room: roomName };

  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => users.find(user => user.id === id);

const getUserInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, getUser, removeUser, getUserInRoom };
