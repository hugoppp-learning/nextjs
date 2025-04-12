import {
    bigint,
    index,
    int,
    singlestoreTableCreator,
    varchar,
} from "drizzle-orm/singlestore-core";

const createTable = singlestoreTableCreator((name) => `nextjs_drive_${name}`);

export const foldersTable = createTable(
    "folders_table",
    {
        id: int().primaryKey().autoincrement(),
        parentId: bigint({ mode: "number", unsigned: true }),
        name: varchar({ length: 255 }).notNull(),
    },
    (t) => [index("parent_index").on(t.parentId)],
);

export const filesTable = createTable(
    "files_table",
    {
        id: int().primaryKey().autoincrement(),
        parentId: bigint({ mode: "number", unsigned: true }).notNull(),
        name: varchar({ length: 255 }).notNull(),
        url: varchar({ length: 255 }).notNull(),
    },
    (t) => [index("parent_index").on(t.parentId)],
);
