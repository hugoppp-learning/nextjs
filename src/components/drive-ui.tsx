"use client"

import {useState} from "react"
import {Header} from "~/components/header"
import {FileExplorer} from "~/components/file-explorer"
import {getFilesInFolder, getFolderById, getFoldersInFolder, getPathToItem} from "~/lib/mock-data"

export function DriveUI() {
    const [currentFolderId, setCurrentFolderId] = useState<number>(1)

    const currentFiles = getFilesInFolder(currentFolderId)
    const currentFolders = getFoldersInFolder(currentFolderId)

  // Get path to current folder
  const breadcrumbItems = currentFolderId ? getPathToItem(currentFolderId) : []

  const navigateUp = () => {
    if (currentFolderId) {
        const currentFolder = getFolderById(currentFolderId)
        if (!currentFolder?.parentId) return
        setCurrentFolderId(currentFolder.parentId)
    }
  }

  // Navigate to a specific point in the breadcrumb
    const navigateTo = (id: number) => {
    setCurrentFolderId(id)
  }

  return (
      <div className="flex flex-col h-screen bg-background">
        <Header
            breadcrumbItems={breadcrumbItems}
            navigateUp={navigateUp}
            navigateTo={navigateTo}
        />
          <FileExplorer files={currentFiles} folders={currentFolders} navigateToFolder={setCurrentFolderId}/>
      </div>
  )
}
