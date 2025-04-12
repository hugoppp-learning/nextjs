import {ScrollArea} from "~/components/ui/scroll-area"
import {FileItem} from "~/components/file-item"
import type {DriveItem} from "~/lib/mock-data"

interface FileExplorerProps {
    items: DriveItem[]
    navigateToFolder: (folderId: string) => void
}

export function FileExplorer({items, navigateToFolder}: FileExplorerProps) {
    // Group items by type (folders first)
    const folders = items.filter((item) => item.type === "folder")
    const files = items.filter((item) => item.type !== "folder")
    const sortedItems = [...folders, ...files]

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
                            {sortedItems.map((item) => (
                                <FileItem
                                    key={item.id}
                                    {...item}
                                    onClick={() => {
                                        if (item.type === "folder") {
                                            navigateToFolder(item.id)
                                        }
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
