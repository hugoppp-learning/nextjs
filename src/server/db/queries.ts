import "server-only";
import { db } from "~/server/db/index";
import { filesTable, foldersTable } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
    getFolders: function (folderId: number) {
        return db
            .select()
            .from(foldersTable)
            .where(eq(foldersTable.parentId, folderId));
    },
    getFiles: function (folderId: number) {
        return db
            .select()
            .from(filesTable)
            .where(eq(filesTable.parentId, folderId));
    },
    getBreadcrumbs: async function (folderId: number) {
        const breadcrumbs: (typeof foldersTable.$inferSelect)[] = [];

        let currentFolderId: number | null = folderId;
        while (currentFolderId) {
            const [folder] = await db
                .select()
                .from(foldersTable)
                .where(eq(foldersTable.id, currentFolderId))
                .limit(1);

            if (!folder) break;

            breadcrumbs.unshift(folder);
            currentFolderId = folder.parentId;
        }

        return breadcrumbs;
    },
};

export const COMMANDS = {
    createFolder: async function (folder: { name: string; parentId: number }) {
        return db.insert(foldersTable).values({
            ...folder,
        });
    },
    createFile: async function (file: {
        name: string;
        parentId: number;
        url: string;
    }) {
        return db.insert(filesTable).values({
            ...file,
        });
    },
};
