"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Folder, Plus, Upload } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface UploadDialogProps {
    open: boolean;
    onClose: () => void;
    uploadType: "file" | "folder";
    onCreateFolder?: (folderName: string) => void; // Callback for creating folder
}

function UploadDialog({
    open,
    onClose,
    uploadType,
    onCreateFolder,
}: UploadDialogProps) {
    const [folderName, setFolderName] = useState("");

    const handleCreateFolder = () => {
        if (onCreateFolder && folderName.trim()) {
            onCreateFolder(folderName.trim());
            setFolderName("");
            onClose();
        }
    };

    const renderFileUploadContent = () => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" />
        </div>
    );

    const renderFolderCreationContent = () => (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
                id="folder-name"
                type="text"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {uploadType === "file"
                            ? "Upload File"
                            : "Create Folder"}
                    </DialogTitle>
                    <DialogDescription>
                        {uploadType === "file"
                            ? "Choose a file from your device to upload to Drive."
                            : "Enter a name for the new folder."}
                    </DialogDescription>
                </DialogHeader>

                {/* Render the appropriate dialog content */}
                {uploadType === "file"
                    ? renderFileUploadContent()
                    : renderFolderCreationContent()}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    {uploadType === "file" ? (
                        <Button onClick={onClose}>Upload</Button>
                    ) : (
                        <Button
                            onClick={handleCreateFolder}
                            disabled={!folderName.trim()}
                        >
                            Create
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function UploadButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [uploadType, setUploadType] = useState<"file" | "folder" | null>(
        null,
    );

    const openDialog = (type: "file" | "folder") => {
        setUploadType(type);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setUploadType(null);
    };

    const handleCreateFolder = (folderName: string) => {
        console.log(`Creating folder: ${folderName}`);
        // Handle folder creation logic here (e.g., make an API call)
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2">
                        <Plus className="mr-1 h-4 w-4" />
                        New
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openDialog("file")}>
                        <Upload className="mr-2 h-4 w-4" />
                        File
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openDialog("folder")}>
                        <Folder className="mr-2 h-4 w-4" />
                        Folder
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UploadDialog
                open={isDialogOpen}
                onClose={closeDialog}
                uploadType={uploadType!}
                onCreateFolder={handleCreateFolder} // Pass callback
            />
        </>
    );
}
