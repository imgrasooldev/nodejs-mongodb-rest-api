// userFactory.js
const faker = require("faker");

const generateUser = () => {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
};

module.exports = generateUser;
