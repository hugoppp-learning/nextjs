import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar"
import {Button} from "~/components/ui/button"
import {Input} from "~/components/ui/input"
import {ChevronRight, Grid, List, Moon, Search, Settings, Sun} from "lucide-react"
import {UploadButton} from "~/components/upload-button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {useTheme} from "next-themes"
import type {DriveItem} from "~/lib/mock-data"

interface HeaderProps {
    breadcrumbItems: DriveItem[]
    navigateUp: () => void
    navigateTo: (id: string | null) => void
}

export function Header({breadcrumbItems, navigateUp, navigateTo}: HeaderProps) {
    return (
        <header className="border-b p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                        <Button variant="ghost" size="sm" onClick={navigateUp} className="mr-1">
                            <ChevronRight className="h-4 w-4 rotate-180"/>
                        </Button>
                        <nav className="flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigateTo(null)}
                                className="font-medium hover:bg-accent hover:text-accent-foreground"
                            >
                                My Drive
                            </Button>
                            {breadcrumbItems.map((item, index) => (
                                <div key={item.id} className="flex items-center">
                                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground"/>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigateTo(item.id)}
                                        className={`font-medium hover:bg-accent hover:text-accent-foreground ${
                                            index === breadcrumbItems.length - 1 ? "text-primary" : ""
                                        }`}
                                    >
                                        {item.name}
                                    </Button>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="flex-1 mx-10 max-w-xl">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search in Drive"
                            className="pl-8"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <UploadButton/>
                    <Button variant="ghost" size="icon">
                        <List className="h-4 w-4"/>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Grid className="h-4 w-4"/>
                    </Button>
                    <SettingsDropdown/>
                    <Avatar>
                        <AvatarImage src="/placeholder-user.jpg"/>
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

function SettingsDropdown() {
    const {theme, setTheme} = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4"/>
                    <span className="sr-only">Settings</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                        <Sun className="mr-2 h-4 w-4"/>
                        <span>Light Mode</span>
                    </div>
                    {theme === "light" && <span>✓</span>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                        <Moon className="mr-2 h-4 w-4"/>
                        <span>Dark Mode</span>
                    </div>
                    {theme === "dark" && <span>✓</span>}
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuItem className="py-2">
                    <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2">
                    <span>Keyboard Shortcuts</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
