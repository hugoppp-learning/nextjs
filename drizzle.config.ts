import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
    out: "./drizzle",
    schema: "./src/server/db/schema.ts",
    dialect: "singlestore",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    tablesFilter: ["nextjs_drive_*"],
} satisfies Config;
