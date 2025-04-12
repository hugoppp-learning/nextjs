import type {FileItemProps} from "~/components/file-item"

export interface DriveItem extends FileItemProps {
  id: string
  parentId: string | null
}

// Flat data structure with parent references
export const mockData: DriveItem[] = [
  // Root items (parentId = null)
  {
    id: "work-documents",
    name: "Work Documents",
    type: "folder",
    modified: "Modified Apr 10, 2023",
    parentId: null,
  },
  {
    id: "personal",
    name: "Personal",
    type: "folder",
    modified: "Modified Apr 2, 2023",
    parentId: null,
  },
  {
    id: "project-presentation",
    name: "Project Presentation.pptx",
    type: "document",
    size: "5.7 MB",
    modified: "Modified Apr 9, 2023",
    url: "#",
    parentId: null,
  },
  {
    id: "financial-report",
    name: "Financial Report.xlsx",
    type: "spreadsheet",
    size: "2.1 MB",
    modified: "Modified Apr 7, 2023",
    url: "#",
    parentId: null,
  },
  {
    id: "website-mockup",
    name: "Website Mockup.png",
    type: "image",
    size: "4.3 MB",
    modified: "Modified Apr 6, 2023",
    url: "#",
    parentId: null,
  },
  {
    id: "source-code",
    name: "Source Code.zip",
    type: "archive",
    size: "12.8 MB",
    modified: "Modified Apr 3, 2023",
    url: "#",
    parentId: null,
  },
  {
    id: "app-js",
    name: "App.js",
    type: "code",
    size: "15 KB",
    modified: "Modified Apr 2, 2023",
    url: "#",
    parentId: null,
  },

  // Work Documents children
  {
    id: "project-proposal",
    name: "Project Proposal.docx",
    type: "document",
    size: "2.3 MB",
    modified: "Modified Apr 8, 2023",
    url: "#",
    parentId: "work-documents",
  },
  {
    id: "budget-2023",
    name: "Budget 2023.xlsx",
    type: "spreadsheet",
    size: "1.8 MB",
    modified: "Modified Apr 5, 2023",
    url: "#",
    parentId: "work-documents",
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    type: "folder",
    modified: "Modified Mar 28, 2023",
    parentId: "work-documents",
  },

  // Meeting Notes children
  {
    id: "q1-review",
    name: "Q1 Review.docx",
    type: "document",
    size: "1.2 MB",
    modified: "Modified Mar 28, 2023",
    url: "#",
    parentId: "meeting-notes",
  },
  {
    id: "team-sync",
    name: "Team Sync.docx",
    type: "document",
    size: "0.9 MB",
    modified: "Modified Mar 25, 2023",
    url: "#",
    parentId: "meeting-notes",
  },

  // Personal children
  {
    id: "vacation-photos",
    name: "Vacation Photos",
    type: "folder",
    modified: "Modified Apr 1, 2023",
    parentId: "personal",
  },
  {
    id: "resume",
    name: "Resume.pdf",
    type: "document",
    size: "1.5 MB",
    modified: "Modified Mar 15, 2023",
    url: "#",
    parentId: "personal",
  },

  // Vacation Photos children
  {
    id: "beach-sunset",
    name: "Beach Sunset.jpg",
    type: "image",
    size: "3.2 MB",
    modified: "Modified Apr 1, 2023",
    url: "#",
    parentId: "vacation-photos",
  },
  {
    id: "mountain-view",
    name: "Mountain View.jpg",
    type: "image",
    size: "2.8 MB",
    modified: "Modified Mar 31, 2023",
    url: "#",
    parentId: "vacation-photos",
  },
]

// Helper function to get items by parent ID
export function getItemsByParentId(parentId: string | null): DriveItem[] {
  return mockData.filter((item) => item.parentId === parentId)
}

// Helper function to get item by ID
export function getItemById(id: string): DriveItem | undefined {
  return mockData.find((item) => item.id === id)
}

// Helper function to get path to an item
export function getPathToItem(id: string): DriveItem[] {
  const path: DriveItem[] = []
  let currentItem = getItemById(id)

  while (currentItem) {
    path.unshift(currentItem)
    if (currentItem.parentId) {
      currentItem = getItemById(currentItem.parentId)
    } else {
      break
    }
  }

  return path
}
