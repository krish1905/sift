"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, Database, Filter, Clock } from "lucide-react";

export function AnalyticsTab() {
  const stats = {
    totalProcessed: 45230,
    cleaningAccuracy: 94.2,
    timesSaved: 127,
    duplicatesRemoved: 8940,
    qualityImproved: 23.5,
    storageReduced: 2.1
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h1>
        <p className="text-white/60">
          Track your data cleaning performance and insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Processed</p>
                <p className="text-3xl font-bold text-white">{stats.totalProcessed.toLocaleString()}</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% this month
                </p>
              </div>
              <Database className="w-10 h-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Cleaning Accuracy</p>
                <p className="text-3xl font-bold text-white">{stats.cleaningAccuracy}%</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +2.1% improvement
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Time Saved (hours)</p>
                <p className="text-3xl font-bold text-white">{stats.timesSaved}</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  vs manual cleaning
                </p>
              </div>
              <Clock className="w-10 h-10 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Duplicates Removed</p>
                <p className="text-3xl font-bold text-white">{stats.duplicatesRemoved.toLocaleString()}</p>
                <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  19.8% of dataset
                </p>
              </div>
              <Filter className="w-10 h-10 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Quality Improved</p>
                <p className="text-3xl font-bold text-white">{stats.qualityImproved}%</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  avg quality score
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Storage Reduced</p>
                <p className="text-3xl font-bold text-white">{stats.storageReduced}GB</p>
                <p className="text-green-400 text-sm flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  32% reduction
                </p>
              </div>
              <Database className="w-10 h-10 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Processing Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-white/40">
              <BarChart3 className="w-16 h-16 mb-4" />
            </div>
            <p className="text-center text-white/60">
              Chart visualization would go here
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Data Quality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">High Quality</span>
                  <span className="text-white">67%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "67%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Medium Quality</span>
                  <span className="text-white">24%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "24%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/60">Low Quality</span>
                  <span className="text-white">9%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "9%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
