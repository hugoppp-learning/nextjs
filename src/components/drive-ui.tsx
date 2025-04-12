"use client"

import {useState} from "react"
import {Header} from "~/components/header"
import {FileExplorer} from "~/components/file-explorer"
import {getItemById, getItemsByParentId, getPathToItem} from "~/lib/mock-data"

export function DriveUI() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  const currentItems = getItemsByParentId(currentFolderId)

  // Get path to current folder
  const breadcrumbItems = currentFolderId ? getPathToItem(currentFolderId) : []

  const navigateToFolder = (folderId: string) => {
    setCurrentFolderId(folderId)
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentFolderId) {
      const currentFolder = getItemById(currentFolderId)
      setCurrentFolderId(currentFolder?.parentId ?? null)
    }
  }

  // Navigate to a specific point in the breadcrumb
  const navigateTo = (id: string | null) => {
    setCurrentFolderId(id)
  }

  return (
      <div className="flex flex-col h-screen bg-background">
        <Header
            breadcrumbItems={breadcrumbItems}
            navigateUp={navigateUp}
            navigateTo={navigateTo}
        />
        <FileExplorer items={currentItems} navigateToFolder={navigateToFolder}/>
      </div>
  )
}
