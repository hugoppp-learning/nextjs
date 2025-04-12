export type DriveFile = {
    id: number;
    parentId: number;
    name: string;
    size: string;
    url: string;
};

export type DriveFolder = {
    id: number;
    parentId: number | null;
    name: string;
};

export const folders: DriveFolder[] = [
    { id: 1, parentId: null, name: "" },
    { id: 2, parentId: 1, name: "Documents" },
    { id: 3, parentId: 1, name: "Pictures" },
    { id: 4, parentId: 2, name: "Work" },
    { id: 5, parentId: 2, name: "Personal" },
    { id: 6, parentId: 3, name: "Vacations" },
];

export const files: DriveFile[] = [
    {
        id: 1,
        parentId: 2,
        name: "resume.docx",
        size: "20KB",
        url: "/Documents/resume.docx",
    },
    {
        id: 2,
        parentId: 2,
        name: "budget.xlsx",
        size: "15KB",
        url: "/Documents/budget.xlsx",
    },
    {
        id: 3,
        parentId: 4,
        name: "project-plan.pdf",
        size: "50KB",
        url: "/Documents/Work/project-plan.pdf",
    },
    {
        id: 4,
        parentId: 4,
        name: "presentation.pptx",
        size: "30KB",
        url: "/Documents/Work/presentation.pptx",
    },
    {
        id: 5,
        parentId: 5,
        name: "diary.txt",
        size: "5KB",
        url: "/Documents/Personal/diary.txt",
    },
    {
        id: 6,
        parentId: 3,
        name: "family-photo.jpg",
        size: "2MB",
        url: "/Pictures/family-photo.jpg",
    },
    {
        id: 7,
        parentId: 6,
        name: "beach.jpg",
        size: "3MB",
        url: "/Pictures/Vacations/beach.jpg",
    },
    {
        id: 8,
        parentId: 6,
        name: "mountain.jpg",
        size: "2.5MB",
        url: "/Pictures/Vacations/mountain.jpg",
    },
    {
        id: 9,
        parentId: 1,
        name: "instructions.txt",
        size: "10KB",
        url: "/instructions.txt",
    },
    {
        id: 10,
        parentId: 3,
        name: "thumbnail.png",
        size: "1MB",
        url: "/Pictures/thumbnail.png",
    },
];

// Helper function to get items by parent ID
export function getFilesInFolder(folderId: number): DriveFile[] {
    return files.filter((item) => item.parentId === folderId);
}

export function getFoldersInFolder(folderId: number): DriveFolder[] {
    return folders.filter((item) => item.parentId === folderId);
}

export function getFileById(id: number): DriveFile | undefined {
    return files.find((f) => f.id == id);
}

export function getFolderById(id: number): DriveFolder | undefined {
    return folders.find((f) => f.id == id);
}

// Helper function to get path to an item
export function getPathToItem(id: number): DriveFolder[] {
    const path: DriveFolder[] = [];

    const currentFile = getFileById(id);
    if (currentFile == undefined) return [];

    let currentFolder: DriveFolder | undefined = getFolderById(currentFile.id);

    while (currentFolder) {
        path.unshift(currentFolder);
        if (currentFolder.parentId) {
            currentFolder = getFolderById(currentFolder.parentId);
        } else {
            break;
        }
    }

    return path;
}
