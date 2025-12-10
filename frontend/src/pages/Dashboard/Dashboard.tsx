import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Project } from '../types';
import { api } from '../services/api';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getProjects();
      setProjects(data || []);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const mockProjects: Project[] = [
    {
      id: '1',
      userId: 'user1',
      title: 'Humanoid Robot OS',
      description: 'Advanced operating system for humanoid robots',
      icon: '🦾',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      userId: 'user1',
      title: 'Drone Flight Controller',
      description: 'Real-time flight control system',
      icon: '🚁',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      userId: 'user1',
      title: 'AI Vision System',
      description: 'Machine learning for object detection',
      icon: '👁️',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      userId: 'user1',
      title: 'Robotic Arm Controller',
      description: 'Precision control for industrial arms',
      icon: '🦾',
      status: 'archived',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      userId: 'user1',
      title: 'Blockchain Integration',
      description: 'Token system for robot coordination',
      icon: '⛓️',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      userId: 'user1',
      title: 'Edge Computing Node',
      description: 'Distributed computing platform',
      icon: '🖥️',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', marginTop: '60px' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem', marginLeft: '250px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1>Projects</h1>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Manage your robotics projects
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid var(--color-error)',
                borderRadius: '8px',
                color: 'var(--color-error)',
                marginBottom: '1.5rem',
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} style={{ animation: 'pulse 2s infinite' }}>
                  <Card style={{ height: '300px' }} />
                </div>
              ))
            ) : mockProjects.length > 0 ? (
              mockProjects.map(project => (
                <Card key={project.id} hoverable>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {project.icon}
                  </div>
                  <h3>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>
                    {project.description}
                  </p>
                  <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="primary" size="sm" fullWidth>
                      View
                    </Button>
                    <Button variant="outline" size="sm" fullWidth>
                      Edit
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                  No projects yet
                </p>
                <Button variant="primary">Create Project</Button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;