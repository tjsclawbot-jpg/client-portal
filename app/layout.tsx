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
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 min-h-screen">
        <nav className="bg-white border-b border-gray-200/50 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Niche Design Studio</h1>
                <p className="text-xs text-gray-500">Client Portal</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">Portfolio & Project Management</div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  )
}
