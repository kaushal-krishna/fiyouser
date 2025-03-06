import { users } from "./auth.service.js";

const userService = {
  GetAllUsers: (call, callback) => {
    const allUsers = Array.from(users.values());
    callback(null, {
      status: { success: true, message: "Users found" },
      users: allUsers,
    });
  },

  GetUser: (call, callback) => {
    const { user_id } = call.request;
    const user = Array.from(users.values()).find((u) => u.user_id === user_id);

    if (!user) {
      return callback(null, {
        status: { success: false, message: "User not found" },
      });
    }

    callback(null, { status: { success: true, message: "User found" }, user });
  },

  UpdateUser: (call, callback) => {
    const { user_id, updated_fields } = call.request;

    let user = Array.from(users.values()).find((u) => u.user_id === user_id);
    if (!user) {
      return callback(null, {
        status: { success: false, message: "User not found" },
      });
    }

    user = { ...user, ...updated_fields };
    users.set(user.username, user);

    callback(null, { status: { success: true, message: "User updated" } });
  },

  DeleteUser: (call, callback) => {
    const { user_id } = call.request;
    for (const [key, user] of users.entries()) {
      if (user.user_id === user_id) {
        users.delete(key);
        return callback(null, {
          status: { success: true, message: "User deleted" },
        });
      }
    }
    callback(null, { status: { success: false, message: "User not found" } });
  },
};

export default userService;
