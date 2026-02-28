'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  name: string
  status: string
  progress?: number
}

interface Client {
  id: string
  name: string
  email: string
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [email, setEmail] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Check if client is authenticated (placeholder)
    const savedEmail = localStorage.getItem('client_email')
    if (savedEmail) {
      setEmail(savedEmail)
      setAuthenticated(true)
      loadClientData(savedEmail)
    }
    setLoading(false)
  }, [])

  const loadClientData = async (clientEmail: string) => {
    try {
      // TODO: Replace with actual Supabase queries once schema is confirmed
      // For now, this is a placeholder
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientEmail)
        .single()

      if (clientData) {
        setClient(clientData)
        
        // Load projects for this client
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', clientData.id)

        if (projectsData) {
          setProjects(projectsData)
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      localStorage.setItem('client_email', email)
      setAuthenticated(true)
      loadClientData(email)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('client_email')
    setAuthenticated(false)
    setClient(null)
    setProjects([])
    setEmail('')
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Client Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              Access Portal
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {client?.name || 'Client'}</h1>
          <p className="text-gray-600 mt-2">{client?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-2">Active Projects</p>
          <p className="text-3xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 mb-2">Completed</p>
          <p className="text-3xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 mb-2">In Progress</p>
          <p className="text-3xl font-bold">{projects.filter(p => p.status === 'in_progress').length}</p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects yet. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{project.status?.replace('_', ' ')}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {project.progress || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Placeholder for Files Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Brand Files & Guidelines</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
          <p className="text-gray-600">Files will appear here once your project begins</p>
        </div>
      </div>

      {/* Placeholder for Timeline Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
          <p className="text-gray-600">Timeline milestones will appear here</p>
        </div>
      </div>
    </div>
  )
}
