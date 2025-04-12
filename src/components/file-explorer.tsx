"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { FileItem } from "~/components/file-item";
import { type filesTable, type foldersTable } from "~/server/db/schema";

interface FileExplorerProps {
    files: (typeof filesTable.$inferSelect)[];
    folders: (typeof foldersTable.$inferSelect)[];
}

export function FileExplorer({ files, folders }: FileExplorerProps) {
    // Group items by type (folders first)
    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-4">
                    <div className="rounded-md border">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                                        Name
                                    </th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                                        Modified
                                    </th>
                                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                                        Size
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {folders.map((folder) => (
                                    <FileItem
                                        driveItem={{
                                            type: "folder",
                                            ...folder,
                                        }}
                                        key={folder.id}
                                        //todo onclick
                                    />
                                ))}
                                {files.map((file) => (
                                    <FileItem
                                        driveItem={{ type: "file", ...file }}
                                        key={file.id}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
