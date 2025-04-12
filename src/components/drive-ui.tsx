import { Header } from "~/components/header";
import { FileExplorer } from "~/components/file-explorer";
import { QUERIES } from "~/server/db/queries";

export async function DriveUI() {
    const rootId = 2251799813685249;
    const currentFolderId = rootId;

    const currentFiles = await QUERIES.getFiles(currentFolderId);
    const currentFolders = await QUERIES.getFolders(currentFolderId);

    // Get path to current folder
    const breadcrumbItems = await QUERIES.getBreadcrumbs(currentFolderId);

    return (
        <div className="bg-background flex h-screen flex-col">
            <Header breadcrumbItems={breadcrumbItems} />
            <FileExplorer files={currentFiles} folders={currentFolders} />
        </div>
    );
}
