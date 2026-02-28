import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Niche Design Studio — Client Portal',
  description: 'View your project status, progress, and brand files',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <nav className="border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Niche Design Studio</h1>
            <p className="text-sm text-gray-600">Client Portal</p>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
