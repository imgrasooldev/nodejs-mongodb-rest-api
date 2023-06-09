// resources/users/userResource.js
const userResource = (user) => {
  return {
    id: user._id,
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    // Add other desired user properties
  };
};

module.exports = userResource;
