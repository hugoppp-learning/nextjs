import type React from "react"
import "~/styles/globals.css"
import {ThemeProvider} from "~/components/theme-provider"

export const metadata = {
  title: "Google Drive Clone",
  description: "A Google Drive clone UI",
}

export default function RootLayout({
  children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning className="dark">
      <body>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        {children}
      </ThemeProvider>
      </body>
    </html>
  )
}
