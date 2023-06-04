// seeder.js
require("./config/dotenvConfig");
const database = require("./config/database");
const seedUsers = require("./seeders/userSeeder");

// Specify the number of users to be generated
const userCount = 10;

(async function main() {
  await seedUsers(userCount);
})();
