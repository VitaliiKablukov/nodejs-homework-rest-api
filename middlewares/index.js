const validateBody = require("./validateBody");
const validateRegisterBody = require("./validateegisterBody");
const auth = require("./auth");
const upload = require("./multer");

module.exports = {
  validateBody,
  validateRegisterBody,
  auth,
  upload,
};
