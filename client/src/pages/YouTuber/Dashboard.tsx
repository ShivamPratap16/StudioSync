import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs";
import { Card, CardContent } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Video, MessageCircle, Clock, User, Upload } from "lucide-react";
import DashboardLayout from "../../Components/Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Badge } from "../../Components/ui/badge";
import { Progress } from "../../Components/ui/progress";

interface Project {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  deadline: string;
  thumbnail?: string;
  editor?: {
    name: string;
    avatar?: string;
  };
  progress: number;
  lastUpdated: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Summer Vlog Edit',
    status: 'in_progress',
    deadline: '2024-08-15',
    editor: {
      name: 'John Editor',
      avatar: 'https://github.com/shadcn.png'
    },
    progress: 65,
    lastUpdated: '2024-08-01T10:00:00'
  },
  // Add more mock projects...
];

export default function YouTuberDashboard() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  const getStatusColor = (status: Project['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/youtuber/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="ongoing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4">
            <div className={view === 'grid' ? 
              "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : 
              "space-y-4"
            }>
              {mockProjects.map(project => (
                <Card key={project.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative">
                      {project.thumbnail ? (
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Video className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{project.title}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due {formatDate(project.deadline)}</span>
                        </div>
                        {project.editor && (
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span>{project.editor.name}</span>
                          </div>
                        )}
                        <Progress value={project.progress} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            {/* Similar structure for completed projects */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}