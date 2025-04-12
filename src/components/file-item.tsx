"use client";

import {
    File,
    FileArchive,
    FileCode,
    FileSpreadsheet,
    FileText,
    Folder,
    ImageIcon,
} from "lucide-react";

export type DriveItem = {
    id: number;
    name: string;
    size?: string;
    url?: string;
    type: "folder" | "file";
};

export interface FileItemProps {
    driveItem: DriveItem;
    onFolderClick?: () => void;
}

export function FileItem({ driveItem, onFolderClick }: FileItemProps) {
    const getIcon = () => {
        console.log(driveItem);
        if (driveItem.name === "folder")
            return <Folder className="h-5 w-5 text-blue-500" />;

        const extension = driveItem.name.split(".").pop()?.toLowerCase();
        switch (extension) {
            case "txt":
            case "doc":
            case "docx":
            case "pdf":
                return <FileText className="h-5 w-5 text-blue-600" />;
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "svg":
                return <ImageIcon className="h-5 w-5 text-green-500" />;
            case "js":
            case "jsx":
            case "ts":
            case "tsx":
            case "html":
            case "css":
            case "json":
            case "xml":
                return <FileCode className="h-5 w-5 text-purple-500" />;
            case "xls":
            case "xlsx":
            case "csv":
                return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
                return <FileArchive className="h-5 w-5 text-yellow-600" />;
            default:
                return <File className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <tr
            className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${
                driveItem.type === "folder" ? "cursor-pointer" : ""
            }`}
            onClick={driveItem.type === "folder" ? onFolderClick : undefined}
        >
            <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                    {getIcon()}
                    {driveItem.type === "folder" ? (
                        <span>{driveItem.name}</span>
                    ) : (
                        <a
                            href={driveItem.url}
                            target="_blank"
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {driveItem.name}
                        </a>
                    )}
                </div>
            </td>
            <td className="text-muted-foreground p-4 align-middle">{"-"}</td>
            <td className="text-muted-foreground p-4 align-middle">
                {driveItem.size ?? "-"}
            </td>
        </tr>
    );
}
