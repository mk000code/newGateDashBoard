
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env")
});

const {
  MONGODB_URI,
  JWT_SECRET,
  PORT: rawPort = "3000",
  SMTP_HOST,
  SMTP_PORT: rawSmtpPort = "587",
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM
} = process.env;

const PORT = Number(rawPort);
const SMTP_PORT = Number(rawSmtpPort);
const renderExternalUrl = process.env.RENDER_EXTERNAL_URL?.trim();
const configuredAppUrl = process.env.APP_URL?.trim();
const isLocalUrl = value => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(value || "");
const APP_URL = process.env.RENDER === "true" && renderExternalUrl && isLocalUrl(configuredAppUrl)
  ? renderExternalUrl
  : configuredAppUrl || renderExternalUrl || `http://localhost:${PORT}`;

if (!MONGODB_URI || !JWT_SECRET) {
  console.error("Set MONGODB_URI and JWT_SECRET");
  process.exit(1);
}

if (!/^mongodb(\+srv)?:\/\//i.test(MONGODB_URI)) {
  console.error("Invalid MongoDB connection string");
  process.exit(1);
}

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error("PORT must be a valid TCP port number");
  process.exit(1);
}

try {
  const appUrl = new URL(APP_URL);
  if (!["http:", "https:"].includes(appUrl.protocol)) throw new Error("invalid protocol");
} catch {
  console.error("APP_URL must be a valid HTTP or HTTPS URL");
  process.exit(1);
}

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  PORT: Number(PORT),
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  APP_URL: APP_URL.replace(/\/+$/, "")
};
