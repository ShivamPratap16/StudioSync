import { useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';

const videoTypes = [
  { id: 'vlog', name: 'Vlog' },
  { id: 'tutorial', name: 'Tutorial' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'review', name: 'Review' },
  { id: 'reel', name: 'Reel' },
];

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_VIDEO_TYPES = {
  'video/mp4': ['.mp4'],
  'video/quicktime': ['.mov'],
  'video/x-msvideo': ['.avi']
};

export function UploadDialog() {
  const [files, setFiles] = useState<File[]>([]);
  const [deadline, setDeadline] = useState<Date>();
  const [videoType, setVideoType] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

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
    // TODO: Implement actual upload logic
    console.log('Uploading:', { files, deadline, videoType, notes });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Upload New Project</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div {...getRootProps()} className={`
            border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-secondary/20' : 'border-border'}
          `}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className="space-y-4">
                {files.map(file => (
                  <div key={file.name} className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
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
                    <p className="text-sm text-muted-foreground mt-2">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  Drag & drop video files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: MP4, MOV, AVI (max 500MB)
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Video Type</label>
                <Select value={videoType} onValueChange={setVideoType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes for Editor</label>
                <Textarea
                  placeholder="Add any specific requirements, references, or creative direction..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={7}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setFiles([]);
                setDeadline(undefined);
                setVideoType('');
                setNotes('');
                setUploadProgress(0);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!files.length || !deadline || !videoType}
            >
              Create Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}