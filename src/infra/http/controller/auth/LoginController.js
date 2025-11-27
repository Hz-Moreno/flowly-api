import { UserRepository } from "../../repository/UserRepository.js";
import { SessionController } from "./SessionController.js";
import { hashPassword } from "../../utils/UtilHashPassword.js";

export function logout(req, res) {}

export default {
  async login(req, res) {
    const user = await UserRepository.getByEmail(req.body.email);

    if (!user) {
      res.writeHead(404);
      res.end("User not found!");
      return;
    }

    if (user.password !== hashPassword(req.body.password)) {
      res.writeHead(403);
      res.end("Email or password not found");
      return;
    }

    const session = SessionController.create(user);

    res.writeHead(201);
    res.end(`Auth token: ${session}`);
  },
};
