const User = require("../models/User");
const generateUser = require("../factories/userFactory");

const seedUsers = async (count) => {
  try {
    const users = [];
    for (let i = 0; i < count; i++) {
      const user = generateUser();
      users.push(user);
    }
    await User.insertMany(users);
    console.log(`${count} users seeded successfully.`);
  } catch (error) {
    console.error("User seeding error:", error);
  } finally {
    process.exit(0); // Exit the process once seeding is complete or encounters an error
  }
};

module.exports = seedUsers;
