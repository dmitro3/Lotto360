if (!process.env.DB_URL) {
    throw new Error("database url not set");
}
if (!process.env.SITE_ADMIN_USERNAME) {
    throw new Error("site admin username not set");
}
if (!process.env.SITE_ADMIN_PASSWORD) {
    throw new Error("site admin password not set");
}
if (!process.env.JWT_SECRET) {
    throw new Error("site admin password not set");
}
if (!process.env.BOT_TOKEN) {
    throw new Error("telegram bot token not set");
}
if (!process.env.CHAT_ID) {
    throw new Error("admin telegram chat id not set");
}

export const ADMIN_USERNAME = process.env.SITE_ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.SITE_ADMIN_PASSWORD;
export const MONGODB_URI = process.env.DB_URL;
export const JWT_KEY = process.env.JWT_SECRET;
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const CHAT_ID = process.env.CHAT_ID;
