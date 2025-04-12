import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
    connection: mysql.Connection;
};

export const connection =
    globalForDb.connection ?? (await mysql.createConnection(env.DATABASE_URL));
if (env.NODE_ENV !== "production") globalForDb.connection = connection;

export const db = drizzle(connection, { schema });
