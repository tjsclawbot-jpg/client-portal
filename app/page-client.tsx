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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">→</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Access your project dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                View My Projects
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <span className="font-medium">Demo Mode:</span> Try any email address
              </p>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          <div className="text-center mt-6 text-gray-600 text-sm">
            <p>Questions? <span className="text-blue-600 font-medium">Contact support</span></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header with User Info */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{client?.name || 'Welcome'}</h2>
            <p className="text-gray-600 mt-1">{client?.email}</p>
            {client?.company && <p className="text-sm text-gray-500 mt-1">{client.company}</p>}
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-blue-900 font-semibold">No projects yet</p>
          <p className="text-blue-700 text-sm mt-1">Your projects will appear here once they're created</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Projects List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Projects</h3>
              <div className="space-y-3">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProject(p)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                      selectedProject?.id === p.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="font-semibold text-sm">{p.name}</p>
                    <div className={`mt-2 w-full rounded-full h-2 ${selectedProject?.id === p.id ? 'bg-white/30' : 'bg-gray-300'}`}>
                      <div
                        className={`h-2 rounded-full transition-all ${selectedProject?.id === p.id ? 'bg-white' : 'bg-blue-600'}`}
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                    <p className={`text-xs mt-2 ${selectedProject?.id === p.id ? 'text-blue-100' : 'text-gray-600'}`}>
                      {p.progress}% complete
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Project Details */}
          <div className="lg:col-span-3">
            {selectedProject && (
              <div className="space-y-6">
                {/* Project Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{selectedProject.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedProject.description}</p>
                  
                  {/* Progress Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{selectedProject.progress}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Timeline</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {selectedProject.start_date && `${selectedProject.start_date} - ${selectedProject.end_date}`}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Timeline Phases */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📅</span> Timeline & Phases
                  </h4>
                  <div className="space-y-3">
                    {timelines.map((t, idx) => (
                      <div
                        key={t.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                          t.completed
                            ? 'bg-green-50 border-green-200'
                            : idx === 0 ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {t.completed ? (
                            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white">✓</div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold ${t.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                            {t.phase_name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">Due: {t.due_date}</p>
                        </div>
                        {t.completed && (
                          <span className="text-green-600 text-sm font-medium bg-green-100 px-3 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Files Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📦</span> Project Files ({files.length})
                  </h4>
                  {files.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <p className="text-gray-600">No files uploaded yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {files.map((f) => (
                        <div
                          key={f.id}
                          className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{f.file_name}</p>
                              <p className="text-xs text-gray-600 mt-1">
                                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                  {f.file_type}
                                </span>
                                {f.file_size_mb && <span className="ml-2">• {f.file_size_mb} MB</span>}
                              </p>
                            </div>
                          </div>
                          {f.description && (
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{f.description}</p>
                          )}
                          {f.file_url && (
                            <a
                              href={f.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors text-center"
                            >
                              ⬇️ Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
