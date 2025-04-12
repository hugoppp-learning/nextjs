import {ScrollArea} from "~/components/ui/scroll-area"
import {FileItem} from "~/components/file-item"
import type {DriveFile, DriveFolder} from "~/lib/mock-data"

interface FileExplorerProps {
    files: DriveFile[],
    folders: DriveFolder[]
    navigateToFolder: (folderId: number) => void,
}

export function FileExplorer({files, folders, navigateToFolder,}: FileExplorerProps) {
    // Group items by type (folders first)
    return (
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-4">
                    <div className="rounded-md border">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Modified</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Size</th>
                            </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                            {folders.map((item) => (
                                <FileItem
                                    type="folder"
                                    key={item.id}
                                    {...item}
                                    onClick={() => {
                                        navigateToFolder(item.id)
                                    }}
                                    viewType="list"
                                />
                            ))}
                            {files.map((item) => (
                                <FileItem
                                    type="file"
                                    key={item.id}
                                    {...item}
                                    onClick={() => {
                                        navigateToFolder(item.id)
                                    }}
                                    viewType="list"
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
