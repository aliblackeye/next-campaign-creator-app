// Fonts
import { alata } from "@fonts/fonts";

// Styles
import "./globals.css";

// Layouts
import AppLayout from "@layouts/AppLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${alata.className}`}>
                <AppLayout>
                    {children}
                </AppLayout>
            </body>
        </html>
    )
}
