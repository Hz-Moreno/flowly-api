import { createHmac } from "node:crypto";
import { UserRepository } from "../../repository/UserRepository.js";
import { hashPassword } from "../../utils/UtilHashPassword.js";

export default {
  async register(req, res) {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
    };
    console.log(`USER SENDED: ${user}`);
    const saveUser = await UserRepository.save(user);

    if (!saveUser) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("Fail");
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end("Ok");
  },
};
