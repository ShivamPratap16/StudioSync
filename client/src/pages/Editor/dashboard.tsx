import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs";
import { Card, CardContent } from "../../Components/ui/card";
import { Button } from "../../Components/ui/button";
import { Clock, Video } from "lucide-react";
import DashboardLayout from "../../Components/Layout/DashboardLayout";

export default function EditorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Editor Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Available for work</span>
            <Button variant="outline" size="sm">Update Status</Button>
          </div>
        </div>

        <Tabs defaultValue="assigned" className="space-y-4">
          <TabsList>
            <TabsTrigger value="assigned">Assigned Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="h-10 w-10 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Gaming Montage</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Due in 5 days</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Ready to Edit
                    </span>
                    <Button variant="outline" size="sm">Start Editing</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            {/* Completed projects */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}