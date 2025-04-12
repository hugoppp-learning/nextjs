"use client"

import Link from "next/link"
import {File, FileArchive, FileCode, FileSpreadsheet, FileText, Folder, ImageIcon} from "lucide-react"

export interface FileItemProps {
    name: string
    type: "folder" | "file"
    size?: string
    modified?: string
    shared?: boolean
    url?: string
    onClick?: () => void
    viewType?: "grid" | "list"
}

export function FileItem({name, type, size, modified, url = "#", onClick, viewType = "grid"}: FileItemProps) {
    const getIcon = () => {

        if (type === "folder")
            return <Folder className="h-5 w-5 text-blue-500"/>

        const extension = name.split('.').pop()?.toLowerCase();
        switch (extension) {
            case "txt":
            case "doc":
            case "docx":
            case "pdf":
                return <FileText className="h-5 w-5 text-blue-600"/>
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
            case "svg":
                return <ImageIcon className="h-5 w-5 text-green-500"/>
            case "js":
            case "jsx":
            case "ts":
            case "tsx":
            case "html":
            case "css":
            case "json":
            case "xml":
                return <FileCode className="h-5 w-5 text-purple-500"/>
            case "xls":
            case "xlsx":
            case "csv":
                return <FileSpreadsheet className="h-5 w-5 text-green-600"/>
            case "zip":
            case "rar":
            case "7z":
            case "tar":
            case "gz":
                return <FileArchive className="h-5 w-5 text-yellow-600"/>
            default:
                return <File className="h-5 w-5 text-gray-500"/>
        }
    };

    if (viewType === "list") {
        return (
            <tr
                className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${
                    type === "folder" ? "cursor-pointer" : ""
                }`}
                onClick={type === "folder" ? onClick : undefined}
            >
                <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                        {getIcon()}
                        {type === "folder" ? (
                            <span>{name}</span>
                        ) : (
                            <Link href={url} className="hover:underline text-primary"
                                  onClick={(e) => e.stopPropagation()}>
                                {name}
                            </Link>
                        )}
                    </div>
                </td>
                <td className="p-4 align-middle text-muted-foreground">{modified ?? "-"}</td>
                <td className="p-4 align-middle text-muted-foreground">{size ?? "-"}</td>
            </tr>
        )
    }

    // Grid view (keeping for reference)
    const content = (
        <div
            className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer flex flex-col items-center text-center"
            onClick={onClick}
        >
            {getIcon()}
            <div className="mt-2 w-full">
                <p className="font-medium truncate" title={name}>
                    {name}
                </p>
                {modified && <p className="text-xs text-muted-foreground mt-1">{modified}</p>}
            </div>
        </div>
    )

    if (type === "folder") {
        return content
    }

    return <Link href={url}>{content}</Link>
}
