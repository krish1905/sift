"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Globe, Database, Upload, Settings, Trash2, RefreshCw } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: "api" | "upload" | "database" | "scraping";
  status: "active" | "inactive" | "error";
  itemCount: number;
  lastSync: string;
  config: any;
}

export function DataSourcesTab() {
  const [sources] = useState<DataSource[]>([
    {
      id: "1",
      name: "Bing Image Search API",
      type: "api",
      status: "active",
      itemCount: 15420,
      lastSync: "2 hours ago",
      config: { endpoint: "api.bing.com", queries: ["nature", "architecture"] }
    },
    {
      id: "2", 
      name: "User Uploads",
      type: "upload",
      status: "active",
      itemCount: 3240,
      lastSync: "30 minutes ago",
      config: { allowedTypes: ["jpg", "png", "gif"] }
    },
    {
      id: "3",
      name: "Google Custom Search",
      type: "api", 
      status: "inactive",
      itemCount: 8900,
      lastSync: "1 day ago",
      config: { searchEngineId: "cx_123456", queries: ["technology"] }
    },
    {
      id: "4",
      name: "Web Scraping Bot",
      type: "scraping",
      status: "error",
      itemCount: 0,
      lastSync: "Failed",
      config: { targets: ["example.com", "sample.org"] }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400 bg-green-400/20";
      case "inactive": return "text-yellow-400 bg-yellow-400/20";
      case "error": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api": return Globe;
      case "upload": return Upload;
      case "database": return Database;
      case "scraping": return RefreshCw;
      default: return Database;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">Data Sources</h1>
            <p className="text-white/60">
              Manage your data collection sources and APIs
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Source
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {sources.map((source) => {
          const Icon = getTypeIcon(source.type);
          return (
            <Card key={source.id} className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    {source.name}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Type</span>
                    <span className="text-white capitalize">{source.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Items Collected</span>
                    <span className="text-white">{source.itemCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Last Sync</span>
                    <span className="text-white">{source.lastSync}</span>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white/60 hover:bg-white/5">
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white/60 hover:bg-white/5">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Sync
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-400/20 text-red-400 hover:bg-red-400/10">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Add New API Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Source Name</label>
              <Input
                placeholder="e.g., Unsplash API"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">API Endpoint</label>
              <Input
                placeholder="https://api.example.com/v1/"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">API Key</label>
              <Input
                type="password"
                placeholder="Enter your API key"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add API Source
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Source Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/60">Total Sources</span>
              <span className="text-white font-medium">{sources.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Active Sources</span>
              <span className="text-green-400 font-medium">
                {sources.filter(s => s.status === "active").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Total Items</span>
              <span className="text-white font-medium">
                {sources.reduce((sum, s) => sum + s.itemCount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Failed Sources</span>
              <span className="text-red-400 font-medium">
                {sources.filter(s => s.status === "error").length}
              </span>
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <Button variant="outline" className="w-full border-white/20 text-white/60 hover:bg-white/5">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All Sources
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
