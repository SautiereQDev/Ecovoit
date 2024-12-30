export class User {
  static userId = 10;

  constructor(username, password, { firstName, lastName, email, bio, rank, verified }) {
    this.id = User.userId++;
    this.username = username;
    this.password = password;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.bio = bio || '';
    this.rank = rank || '';
    this.verified = verified || false;
  }
}
