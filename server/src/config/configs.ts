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

export const ADMIN_USERNAME = process.env.SITE_ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.SITE_ADMIN_PASSWORD;
export const MONGODB_URI = process.env.DB_URL;
export const JWT_KEY = process.env.JWT_SECRET;
