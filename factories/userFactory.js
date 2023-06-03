// userFactory.js
const faker = require("faker");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const generateUser = () => {
  const password = "password123"; //faker.internet.password();
  const uuid = uuidv4();

  return {
    uuid: uuid,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(password, 10),
  };
};

module.exports = generateUser;
