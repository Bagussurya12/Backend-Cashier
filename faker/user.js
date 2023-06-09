import user from "../models/User.js";
import { faker } from "@faker-js/faker";

const run = async () => {
  try {
    var data = [];
    for (var i = 0; i < 30; i++) {
      data.push({
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    }
    const fakeData = await user.insertMany(data);

    if (fakeData) {
      console.log(fakeData);
    }
  } catch (err) {
    console.log(err);
  }
};
export { run };
