const bcrypt = require("bcryptjs");

class User {
  constructor(fullName, email, username, password) {
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.password = password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

module.exports = User;
