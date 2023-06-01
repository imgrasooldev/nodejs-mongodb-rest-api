// helpers/response.js
const success = (res, message, data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const error = (res, message, data = null) => {
  return res.status(400).json({
    success: false,
    message,
    data,
  });
};

module.exports = { success, error };
