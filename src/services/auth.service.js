import { v4 as uuidv4 } from "uuid";

const users = new Map();

const authService = {
  RegisterUser: (call, callback) => {
    const { full_name, username, dob, account_type, password } = call.request;

    if (users.has(username)) {
      return callback(null, {
        status: {
          success: false,
          message: "Username already taken.",
        },
      });
    }

    const id = uuidv4();
    users.set(username, {
      id,
      full_name,
      username,
      dob,
      account_type,
      password,
    });

    callback(null, {
      status: {
        success: true,
        message: "Login successful.",
      },
      user: {
        id: users.get(username).id,
        username,
        avatar: "",
      },
    });
  },

  LoginUser: (call, callback) => {
    const { username, password } = call.request;

    if (!users.has(username)) {
      return callback(null, { success: false, message: "User not found." });
    }

    if (users.get(username).password !== password) {
      return callback(null, { success: false, message: "Incorrect password." });
    }

    callback(null, {
      status: {
        success: true,
        message: "Login successful.",
      },
      user: {
        id: users.get(username).id,
        username,
        avatar: "",
      },
    });
  },
};

export { users };

export default authService;
