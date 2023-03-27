require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

const configs = {PORT, MONGO_URI, SECRET};
module.exports = configs;
