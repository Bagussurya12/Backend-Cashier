import user from "../models/User.js";

const isEmailExist = async (email) => {
  const User = await user.findOne({ email: email });
  if (!User) {
    return false;
  }
  return true;
};
const isEmailExistWithUserId = async (id, email) => {
  const User = await user.findOne({ email: email, _id: { $ne: id } });
  if (!User) {
    return false;
  }
  return true;
};

export { isEmailExist, isEmailExistWithUserId };
