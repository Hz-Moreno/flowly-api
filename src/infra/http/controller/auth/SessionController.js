import { SessionRepository } from "../../repository/SessionRepository.js";
import { createJWT } from "../../utils/UtilJWT.js";

export const SessionController = {
  create(user, role) {
    if (!role) role = "user";

    const payload = {
      user: user,
      role: role,
      exp: null,
      created_at: Date.now(),
    };

    const jwt = createJWT(payload);
    SessionRepository.save(jwt, payload);

    return jwt;
  },
};
