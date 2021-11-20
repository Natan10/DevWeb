import bcrypt from "bcrypt";

class User {
  private nome?: string;
  private email: string;
  private password: string;
  private isAdmin: boolean;

  constructor(nome = "", email: string, password: string, isAdmin = false) {
    this.nome = nome;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  get IsAdmin() {
    return this.isAdmin;
  }

  get Nome() {
    return this.nome;
  }

  get Email() {
    return this.email;
  }

  get Password() {
    return this.password;
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }
}

export { User };
