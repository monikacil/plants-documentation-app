import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;
const AUTH_SECRET = process.env.AUTH_SECRET;

export { MONGODB_URI, AUTH_SECRET };