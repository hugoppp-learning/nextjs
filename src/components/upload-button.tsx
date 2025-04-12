"use client"

import {useState} from "react"
import {Button} from "~/components/ui/button"
import {FileCode, FileText, Plus, Upload} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "~/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import {Input} from "~/components/ui/input"
import {Label} from "~/components/ui/label"

export function UploadButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadType, setUploadType] = useState<string | null>(null)

  const handleUploadClick = (type: string) => {
    setUploadType(type)
    setIsDialogOpen(true)
  }

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              <Plus className="mr-1 h-4 w-4"/>
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleUploadClick("file")}>
              <Upload className="mr-2 h-4 w-4"/>
              File upload
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUploadClick("folder")}>
              <Upload className="mr-2 h-4 w-4"/>
              Folder upload
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUploadClick("document")}>
              <FileText className="mr-2 h-4 w-4"/>
              Google Docs
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUploadClick("spreadsheet")}>
              <FileCode className="mr-2 h-4 w-4"/>
              Google Sheets
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {uploadType === "file"
                    ? "Upload file"
                    : uploadType === "folder"
                        ? "Upload folder"
                        : uploadType === "document"
                            ? "Create document"
                            : uploadType === "spreadsheet"
                                ? "Create spreadsheet"
                                : "Upload"}
              </DialogTitle>
              <DialogDescription>
                {uploadType === "file" || uploadType === "folder"
                    ? "Choose a file from your device to upload to Drive."
                    : "Create a new file in your Drive."}
              </DialogDescription>
            </DialogHeader>

            {(uploadType === "file" || uploadType === "folder") && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="file">File</Label>
                  <Input
                      id="file"
                      type="file"
                      {...(uploadType === "folder" ? {webkitdirectory: "", directory: ""} : {})}
                  />
                </div>
            )}

            {(uploadType === "document" || uploadType === "spreadsheet") && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Untitled"/>
                </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                {uploadType === "file" || uploadType === "folder" ? "Upload" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
  )
}
