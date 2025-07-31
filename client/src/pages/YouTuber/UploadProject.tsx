import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Textarea } from "../../Components/ui/textarea";
import { Progress } from "../../Components/ui/progress";
import { Button } from "../../Components/ui/button";
import { Upload, X, ArrowLeft } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import DashboardLayout from "../../Components/Layout/DashboardLayout";
import { Combobox } from "../../Components/ui/combobox";
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_VIDEO_TYPES = {
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi']
};
const mockEditors = [
  { 
    value: "1", 
    label: "John Editor",
    avatar: "https://github.com/shadcn.png",
    role: "Senior Video Editor",
    rating: "4.9/5"
  },
  { 
    value: "2", 
    label: "Sarah Smith",
    avatar: "https://github.com/sarah.png",
    role: "Motion Graphics Expert",
    rating: "4.8/5"
  },
  { 
    value: "3", 
    label: "Mike Johnson",
    avatar: "https://github.com/mike.png",
    role: "Video Editor & Colorist",
    rating: "4.7/5"
  },
  { 
    value: "4", 
    label: "Emma Davis",
    avatar: "https://github.com/emma.png",
    role: "Professional Editor",
    rating: "4.9/5"
  },
  { 
    value: "5", 
    label: "Alex Thompson",
    avatar: "https://github.com/alex.png",
    role: "VFX Specialist",
    rating: "4.8/5"
  },
];
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UploadProject() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [deadline, setDeadline] = useState<Value>(new Date());
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedEditor, setSelectedEditor] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_VIDEO_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false
  });

  const handleSubmit = async () => {
    console.log('Uploading:', { 
      files, 
      deadline, 
      notes,
      editor: mockEditors.find(e => e.value === selectedEditor)
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-card border shadow-sm rounded-lg p-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Upload New Project</h1>
              <p className="text-muted-foreground mt-1">Add your video for editing</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Progress Steps */}
          <div className="bg-card border shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  files.length 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent text-accent-foreground'
                }`}>
                  1
                </div>
                <div>
                  <p className="font-medium">Upload Video</p>
                  <p className="text-sm text-muted-foreground">Select your footage</p>
                </div>
              </div>
              <div className="hidden md:block w-32 h-1 bg-border">
                <div className="h-full bg-primary transition-all duration-500" 
                     style={{ width: `${uploadProgress}%` }} />
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  files.length 
                    ? 'bg-accent text-accent-foreground' 
                    : 'border border-border text-muted-foreground'
                }`}>
                  2
                </div>
                <div>
                  <p className={files.length ? 'font-medium' : 'text-muted-foreground'}>
                    Project Details
                  </p>
                  <p className="text-sm text-muted-foreground">Set requirements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div {...getRootProps()} className={`
            bg-card border-2 border-dashed rounded-lg p-12 cursor-pointer
            transition-all duration-200 hover:border-primary
            ${isDragActive ? 'border-primary bg-accent' : 'border-border'}
          `}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className="space-y-4">
                {files.map(file => (
                  <div key={file.name} className="bg-secondary rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFiles([]);
                          setUploadProgress(0);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-4">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium">
                  Drag & drop your video here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supported formats: MP4, MOV, AVI (max 500MB)
                </p>
              </div>
            )}
          </div>

          {/* Project Details */}
          {files.length > 0 && (
  <div className="bg-card border shadow-sm rounded-lg p-6">
    <h3 className="text-2xl font-semibold mb-6">Project Details</h3>
    
    {/* Editor Selection - Redesigned */}
    <div className="mb-8 border-b pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-semibold text-foreground">Editor Assignment</h4>
          <p className="text-sm text-muted-foreground">Choose an editor for your project</p>
        </div>
        <div className="w-full sm:w-[280px]">
          <Combobox
            options={mockEditors}
            value={selectedEditor}
            onValueChange={setSelectedEditor}
            placeholder="Search editors..."
          />
        </div>
      </div>

      {selectedEditor ? (
        <div className="bg-accent/50 rounded-lg p-4 border">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
              <AvatarImage src={mockEditors.find(e => e.value === selectedEditor)?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {mockEditors.find(e => e.value === selectedEditor)?.label
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold truncate text-foreground">
                  {mockEditors.find(e => e.value === selectedEditor)?.label}
                </p>
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{mockEditors.find(e => e.value === selectedEditor)?.role}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{mockEditors.find(e => e.value === selectedEditor)?.rating}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedEditor("")}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex gap-2 text-sm text-muted-foreground">
            <div className="flex-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Fast turnaround time
            </div>
            <div className="flex-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
              Experienced in vlogs
            </div>
            <div className="flex-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
              HD video specialist
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            No editor selected. Choose an editor to assign this project.
          </p>
        </div>
      )}
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Deadline Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Deadline</label>
        <div className="border rounded-lg bg-card p-4">
          <Calendar
            onChange={setDeadline}
            value={deadline}
            minDate={new Date()}
            className="w-full"
          />
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Notes for Editor</label>
        <div className="relative h-[400px]">
          <Textarea
            placeholder="Add your requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="absolute inset-0 resize-none bg-card border"
          />
        </div>
      </div>
    </div>
  </div>
)}

          {/* Actions */}
          <div className="flex justify-end gap-4 sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!files.length || !deadline}
              className="min-w-[100px] bg-primary hover:bg-primary/90"
            >
              {files.length ? 'Create Project' : 'Upload File'}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
