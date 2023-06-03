const User = require("../models/User");
const generateUser = require("../factories/userFactory");

const seedUsers = async (count) => {
  try {
    const users = [];

    for (let i = 0; i < count; i++) {
      const user = generateUser();
      users.push(user);
    }

    if (users.length > 0) {
      await User.insertMany(users, { ordered: false });
      console.log(`${count} users seeded successfully.`);
    } else {
      console.log("No users to seed.");
    }
  } catch (error) {
    /* if (error.writeErrors) {
      console.error("User seeding error:", error.writeErrors);
    } else {
      console.error("User seeding error:", error);
    } */
    if (error.writeErrors && error.writeErrors.length > 0) {
      // Handle write errors if any
      console.error("User seeding write errors:", error.writeErrors);
    } else {
      // Handle other errors
      console.error("User seeding error:", error);
    }
  } finally {
    process.exit(0); // Exit the process once seeding is complete or encounters an error
  }
};

module.exports = seedUsers;
