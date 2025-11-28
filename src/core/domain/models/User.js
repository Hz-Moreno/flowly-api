export class User {
  #id;
  #name;
  #email;
  #password;
  #is_active;
  #created_at;
  #updated_at;

  constructor(email, id, name) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#created_at = Date.now();
    this.#updated_at = Date.now();
    this.#is_active = 1;
  }

  getId(id) {
    this.#id = id;
  }

  getName(name) {
    this.#name = name;
  }

  getEmail(email) {
    this.#email = email;
  }

  setId(id) {
    this.#id = id;
  }

  setName(name) {
    this.#name = name;
  }

  setEmail(email) {
    this.#email = email;
  }

  touch() {
    this.#updated_at = Date.now();
  }

  toJson() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      created_at: this.#created_at,
      updated_at: this.#updated_at,
      is_active: this.#is_active,
    };
  }
}
