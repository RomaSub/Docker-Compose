const trimStr = (str) => str.trim().toLowerCase();
let users = [];

const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find(
    (u) => trimStr(u.name) === userName && trimStr(u.room) === userRoom,
  );
};

const addUser = (user) => {
  const isExist = findUser(user);

  if (!isExist) {
    users.push(user);
    return { user, isExist: false };
  }

  return { user: isExist, isExist: true };
};

const getRoomUsers = (room) => users.filter((u) => trimStr(u.room) === trimStr(room));

const removeUser = (user) => {
  const found = findUser(user);

  if (found) {
    users = users.filter(
      ({ room, name }) => !(
        trimStr(room) === trimStr(found.room)
          && trimStr(name) === trimStr(found.name)
      ),
    );
  }

  return found;
};

export {
  addUser, findUser, getRoomUsers, removeUser,
};
