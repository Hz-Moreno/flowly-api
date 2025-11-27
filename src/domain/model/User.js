export class User {
  #name;
  #email;
  #id;
  #password;

  constructor(id, name, email) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  getEmail(email) {
    return this.email;
  }

  getName(name) {
    return this.name;
  }

  getId(id) {
    return this.id;
  }

  setEmail(email) {
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }

  setId(id) {
    this.id = id;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      created_at: this.created_at,
    };
  }
}
