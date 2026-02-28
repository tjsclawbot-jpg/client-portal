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

export default function Dashboard() {
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
    } catch (error) {
      console.error('Error loading data:', error)
      setError('Error loading your project data. Please try again.')
    }
  }

  const loadSampleData = () => {
    // Load sample data for demo purposes
    const sampleProjects: Project[] = [
      {
        id: 'sample-1',
        name: 'Brand Identity Design',
        description: 'Complete visual identity system including logo, color palette, typography, and brand guidelines.',
        status: 'in_progress',
        progress: 65,
      },
      {
        id: 'sample-2',
        name: 'Website Redesign',
        description: 'Modern, responsive website redesign with focus on user experience and conversion optimization.',
        status: 'planning',
        progress: 20,
      },
      {
        id: 'sample-3',
        name: 'Marketing Materials',
        description: 'Business cards, letterhead, social media templates, and marketing collateral.',
        status: 'completed',
        progress: 100,
      }
    ]

    setProjects(sampleProjects)
    setSelectedProject(sampleProjects[0])
    
    // Sample timelines
    const sampleTimelines: Timeline[] = [
      { id: 't1', phase_name: 'Discovery & Strategy', due_date: '2025-01-31', completed: true, order: 1 },
      { id: 't2', phase_name: 'Logo Design (3 Concepts)', due_date: '2025-02-14', completed: true, order: 2 },
      { id: 't3', phase_name: 'Revisions & Refinement', due_date: '2025-02-28', completed: false, order: 3 },
      { id: 't4', phase_name: 'Brand Guidelines Document', due_date: '2025-03-15', completed: false, order: 4 },
      { id: 't5', phase_name: 'Final Deliverables', due_date: '2025-03-31', completed: false, order: 5 },
    ]
    
    setTimelines(sampleTimelines)

    // Sample files
    const sampleFiles: File[] = [
      {
        id: 'f1',
        file_name: 'Brand_Guidelines_v2.pdf',
        file_type: 'brand_guide',
        file_url: '#',
        file_size_mb: 2.4,
        description: 'Complete brand guidelines including logo usage, color palette, and typography rules'
      },
      {
        id: 'f2',
        file_name: 'Logo_Primary_Files.zip',
        file_type: 'logo',
        file_url: '#',
        file_size_mb: 5.8,
        description: 'Primary logo in various formats (PNG, SVG, EPS, PDF)'
      },
      {
        id: 'f3',
        file_name: 'Color_Palette_Definition.pdf',
        file_type: 'document',
        file_url: '#',
        file_size_mb: 1.1,
        description: 'Detailed color specifications (RGB, HEX, CMYK, Pantone)'
      },
    ]

    setFiles(sampleFiles)
  }

  const handleProjectSelect = async (project: Project) => {
    setSelectedProject(project)
    
    try {
      // Load timelines for selected project
      const { data: timelinesData } = await supabase
        .from('timelines')
        .select('*')
        .eq('project_id', project.id)
        .order('order', { ascending: true })
      
      if (timelinesData) {
        setTimelines(timelinesData)
      } else {
        setTimelines([])
      }

      // Load files for selected project
      const { data: filesData } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', project.id)
        .order('uploaded_at', { ascending: false })
      
      if (filesData) {
        setFiles(filesData)
      } else {
        setFiles([])
      }
    } catch (error) {
      console.error('Error loading project details:', error)
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
    setSelectedProject(null)
    setTimelines([])
    setFiles([])
    setEmail('')
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planning': return 'bg-yellow-50 border-yellow-200'
      case 'in_progress': return 'bg-blue-50 border-blue-200'
      case 'review': return 'bg-purple-50 border-purple-200'
      case 'completed': return 'bg-green-50 border-green-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch(status) {
      case 'planning': return 'text-yellow-700'
      case 'in_progress': return 'text-blue-700'
      case 'review': return 'text-purple-700'
      case 'completed': return 'text-green-700'
      default: return 'text-gray-700'
    }
  }

  const getFileIcon = (fileType: string) => {
    switch(fileType) {
      case 'brand_guide': return '📖'
      case 'logo': return '🎨'
      case 'design_file': return '✏️'
      case 'mockup': return '📱'
      case 'document': return '📄'
      default: return '📎'
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Client Login</h2>
          <p className="text-sm text-gray-600 mb-6">Try: sarah@techstartup.com (demo)</p>
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {client?.name || 'Client'}</h1>
          <p className="text-gray-600 mt-2">{client?.company || client?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-2">Total Projects</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className={`border-2 rounded-lg p-6 cursor-pointer transition ${
                  selectedProject?.id === project.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className={`text-xs font-medium ${getStatusTextColor(project.status)} capitalize mt-1`}>
                      {project.status?.replace('_', ' ')}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {project.progress}%
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                )}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-900 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Project Details */}
      {selectedProject && (
        <>
          {/* Files Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Brand Files & Guidelines</h2>
            {files.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <p className="text-gray-600">No files available yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file) => (
                  <a
                    key={file.id}
                    href={file.file_url !== '#' ? file.file_url : '#'}
                    className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <span className="text-2xl">{getFileIcon(file.file_type)}</span>
                        <div className="flex-1">
                          <h3 className="font-bold group-hover:text-gray-900">{file.file_name}</h3>
                          {file.description && (
                            <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                          )}
                          <div className="flex gap-3 mt-2 text-xs text-gray-500">
                            <span className="capitalize px-2 py-1 bg-gray-100 rounded">
                              {file.file_type?.replace('_', ' ')}
                            </span>
                            {file.file_size_mb && (
                              <span>{file.file_size_mb} MB</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-600">
                        ↓
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
            {timelines.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <p className="text-gray-600">No timeline phases yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {timelines.map((timeline) => (
                  <div key={timeline.id} className="relative pl-8">
                    {/* Timeline line */}
                    <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-4 border-white ${
                      timeline.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>

                    {/* Content */}
                    <div className={`border rounded-lg p-4 ${
                      timeline.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{timeline.phase_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Due: {new Date(timeline.due_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        {timeline.completed && (
                          <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">
                            COMPLETED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
