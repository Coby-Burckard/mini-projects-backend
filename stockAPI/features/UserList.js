class UserList {
  constructor() {
    this.userList = new Map();
    this.needConnection = false;
  }

  updateNeedFinnConnection() {
    if (this.userList.size > 0) {
      this.needFinnConnection = true;
    } else {
      this.needFinnConnection = false;
    }
    console.log('setting need finn connection to ', this.needFinnConnection);
  }

  deleteUser(user) {
    this.userList.delete(user.id);
    this.updateNeedFinnConnection();
  }

  addUser(user) {
    this.userList.set(user.id, user);
    this.updateNeedFinnConnection();
  }
}

module.exports = UserList;
