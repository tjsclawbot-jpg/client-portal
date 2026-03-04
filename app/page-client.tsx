'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  name: string
  description?: string
  status: string
  progress: number
  start_date?: string
  end_date?: string
}

interface Client {
  id: string
  name: string
  email: string
  company?: string
}

interface Timeline {
  id: string
  phase_name: string
  due_date: string
  completed: boolean
  order: number
}

interface File {
  id: string
  file_name: string
  file_type: string
  file_url: string
  file_size_mb?: number
  description?: string
}

export function DashboardClient() {
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [email, setEmail] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
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
      setError('')
      
      // Load client data
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', clientEmail)
        .single()

      if (clientError) {
        console.log('Client not found, showing sample data')
        // Show sample data for demo
        setClient({
          id: 'demo-1',
          name: 'Demo Client',
          email: clientEmail,
          company: 'Sample Company'
        })
        loadSampleData()
        return
      }

      if (clientData) {
        setClient(clientData)
        
        // Load projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('client_id', clientData.id)
          .order('created_at', { ascending: false })

        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData)
          setSelectedProject(projectsData[0])
          
          // Load timelines for first project
          const { data: timelinesData } = await supabase
            .from('timelines')
            .select('*')
            .eq('project_id', projectsData[0].id)
            .order('order', { ascending: true })
          
          if (timelinesData) {
            setTimelines(timelinesData)
          }

          // Load files for first project
          const { data: filesData } = await supabase
            .from('files')
            .select('*')
            .eq('project_id', projectsData[0].id)
            .order('uploaded_at', { ascending: false })
          
          if (filesData) {
            setFiles(filesData)
          }
        }
      }
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load client data')
    }
  }

  const loadSampleData = () => {
    setProjects([
      {
        id: '1',
        name: 'Brand & Web Project',
        description: 'Complete branding and website redesign',
        status: 'in_progress',
        progress: 72,
        start_date: '2025-02-01',
        end_date: '2025-05-15'
      }
    ])
    setSelectedProject({
      id: '1',
      name: 'Brand & Web Project',
      description: 'Complete branding and website redesign',
      status: 'in_progress',
      progress: 72,
      start_date: '2025-02-01',
      end_date: '2025-05-15'
    })
    setTimelines([
      { id: '1', phase_name: 'Discovery & Strategy', due_date: '2025-02-15', completed: true, order: 1 },
      { id: '2', phase_name: 'Visual Identity', due_date: '2025-03-31', completed: true, order: 2 },
      { id: '3', phase_name: 'Web Design', due_date: '2025-04-15', completed: true, order: 3 },
      { id: '4', phase_name: 'Development', due_date: '2025-05-10', completed: false, order: 4 }
    ])
    setFiles([
      {
        id: '1',
        file_name: 'Brand Guidelines.pdf',
        file_type: 'brand_guide',
        file_url: 'https://example.com/brand-guidelines.pdf',
        description: 'Complete brand guidelines'
      }
    ])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      localStorage.setItem('client_email', email)
      setAuthenticated(true)
      setError('')
      await loadClientData(email)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('client_email')
    setAuthenticated(false)
    setClient(null)
    setProjects([])
    setSelectedProject(null)
    setTimelines([])
    setFiles([])
    setEmail('')
    setError('')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto py-16">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Client Portal Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              View My Projects
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">Demo: Try any email address</p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{client?.name || 'Welcome'}</h2>
          <p className="text-gray-600">{client?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800">No projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Your Projects</h3>
            <div className="space-y-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProject(p)
                    // Load timelines and files for this project
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border ${
                    selectedProject?.id === p.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.progress}% complete</p>
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2">
            {selectedProject && (
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.name}</h3>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">Progress</p>
                    <p className="text-gray-600">{selectedProject.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Timelines */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3">Timeline Phases</h4>
                  <div className="space-y-2">
                    {timelines.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <input
                          type="checkbox"
                          checked={t.completed}
                          readOnly
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <p className={t.completed ? 'line-through text-gray-500' : ''}>
                            {t.phase_name}
                          </p>
                          <p className="text-sm text-gray-600">{t.due_date}</p>
                        </div>
                        {t.completed && <span className="text-green-600 font-medium">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Files */}
                <div>
                  <h4 className="font-bold mb-3">Project Files</h4>
                  <div className="space-y-2">
                    {files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{f.file_name}</p>
                          <p className="text-sm text-gray-600">
                            {f.file_type} {f.file_size_mb && `• ${f.file_size_mb} MB`}
                          </p>
                        </div>
                        {f.file_url && (
                          <a
                            href={f.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
