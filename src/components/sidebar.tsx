import {Clock, HardDrive, Share2, Star, Trash2, Users} from "lucide-react"
import {Button} from "~/components/ui/button"
import {ScrollArea} from "~/components/ui/scroll-area"
import {UploadButton} from "~/components/upload-button"

interface SidebarProps {
    currentPath: string[]
}

export function Sidebar({currentPath}: SidebarProps) {
    return (
        <div className="w-64 border-r bg-background h-full flex flex-col">
            <div className="p-4">
                <UploadButton/>
            </div>
            <ScrollArea className="flex-1">
                <div className="px-3 py-2">
                    <nav className="grid gap-1">
                        <Button variant={currentPath.length === 0 ? "secondary" : "ghost"} className="justify-start">
                            <HardDrive className="mr-2 h-4 w-4"/>
                            My Drive
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Share2 className="mr-2 h-4 w-4"/>
                            Shared with me
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Clock className="mr-2 h-4 w-4"/>
                            Recent
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Star className="mr-2 h-4 w-4"/>
                            Starred
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Trash
                        </Button>
                    </nav>
                </div>
                <div className="px-3 py-2">
                    <h3 className="mb-2 px-4 text-sm font-semibold">Shared drives</h3>
                    <nav className="grid gap-1">
                        <Button variant="ghost" className="justify-start">
                            <Users className="mr-2 h-4 w-4"/>
                            Team Drive
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Users className="mr-2 h-4 w-4"/>
                            Project Resources
                        </Button>
                    </nav>
                </div>
                <div className="p-4">
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-1/3"/>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">3.5 GB of 15 GB used</p>
                </div>
            </ScrollArea>
        </div>
    )
}
