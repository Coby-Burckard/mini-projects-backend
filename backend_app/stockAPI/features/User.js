class User {
  constructor(id, connection) {
    this.id = id;
    this.connection = connection;
  }

  static fromConnection(id, connection) {
    return new User(id, connection);
  }
}

module.exports = User;
