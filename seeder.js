// seeder.js
const seedUsers = require("./seeders/userSeeder");

// Specify the number of users to be generated
const userCount = 10;

seedUsers(userCount);
