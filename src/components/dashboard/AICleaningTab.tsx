"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Check, 
  X, 
  SkipForward, 
  RefreshCw, 
  TrendingUp, 
  Database,
  Filter,
  Zap
} from "lucide-react";

interface DataSample {
  id: string;
  type: "image" | "document" | "video" | "audio" | "text";
  preview: string;
  metadata: {
    name: string;
    size?: string;
    format?: string;
    quality?: string;
    source?: string;
  };
  aiPrediction?: "keep" | "remove";
  confidence?: number;
  userLabel?: "keep" | "remove" | "skip";
}

interface AICleaningTabProps {
  searchQuery: string;
}

export function AICleaningTab({ searchQuery }: AICleaningTabProps) {
  const [currentPhase, setCurrentPhase] = useState<"setup" | "sampling" | "training" | "processing">("setup");
  const [samples, setSamples] = useState<DataSample[]>([]);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [labeledCount, setLabeledCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    totalItems: 12450,
    processed: 0,
    kept: 0,
    removed: 0,
    accuracy: 0
  });

  // Generate mock samples based on search query
  useEffect(() => {
    if (searchQuery) {
      const mockSamples: DataSample[] = Array.from({ length: 15 }, (_, i) => ({
        id: `sample-${i}`,
        type: searchQuery.toLowerCase().includes("image") ? "image" : 
              searchQuery.toLowerCase().includes("document") ? "document" : 
              searchQuery.toLowerCase().includes("video") ? "video" : "image",
        preview: `https://picsum.photos/300/200?random=${i}`,
        metadata: {
          name: `sample_${i + 1}.jpg`,
          size: `${Math.floor(Math.random() * 500 + 100)}KB`,
          format: "JPEG",
          quality: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
          source: ["Web Scraping", "User Upload", "API"][Math.floor(Math.random() * 3)]
        },
        aiPrediction: Math.random() > 0.3 ? "keep" : "remove",
        confidence: Math.random() * 0.4 + 0.6
      }));
      setSamples(mockSamples);
      setCurrentPhase("sampling");
    }
  }, [searchQuery]);

  const handleLabel = (label: "keep" | "remove" | "skip") => {
    const updatedSamples = [...samples];
    updatedSamples[currentSampleIndex].userLabel = label;
    setSamples(updatedSamples);
    
    if (label !== "skip") {
      setLabeledCount(prev => prev + 1);
    }

    if (currentSampleIndex < samples.length - 1) {
      setCurrentSampleIndex(prev => prev + 1);
    } else {
      // Move to training phase
      setCurrentPhase("training");
      setTimeout(() => {
        setCurrentPhase("processing");
        startProcessing();
      }, 3000);
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    const interval = setInterval(() => {
      setStats(prev => {
        const newProcessed = Math.min(prev.processed + Math.floor(Math.random() * 50 + 20), prev.totalItems);
        const newKept = Math.floor(newProcessed * 0.7);
        const newRemoved = newProcessed - newKept;
        const newAccuracy = Math.min(85 + (newProcessed / prev.totalItems) * 10, 95);
        
        if (newProcessed >= prev.totalItems) {
          clearInterval(interval);
          setIsProcessing(false);
        }
        
        return {
          ...prev,
          processed: newProcessed,
          kept: newKept,
          removed: newRemoved,
          accuracy: newAccuracy
        };
      });
    }, 200);
  };

  if (currentPhase === "setup") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">AI Data Cleaning</h1>
          <p className="text-white/60 text-lg">
            Let AI learn from your preferences to clean thousands of data items automatically
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Database className="w-5 h-5" />
                Sample & Learn
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Review 10-15 samples to teach the AI your preferences
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5" />
                AI Training
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              AI creates rules based on your labeled examples
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="w-5 h-5" />
                Auto Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/70">
              Apply learned rules to thousands of items instantly
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setCurrentPhase("sampling")}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start AI Learning
          </Button>
        </div>
      </div>
    );
  }

  if (currentPhase === "sampling") {
    const currentSample = samples[currentSampleIndex];
    const progress = ((currentSampleIndex + 1) / samples.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Sample Training</h1>
            <div className="text-white/60">
              {currentSampleIndex + 1} of {samples.length} samples
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-white/60 text-sm">
            Labeled: {labeledCount} • Remaining: {samples.length - currentSampleIndex - 1}
          </p>
        </div>

        {currentSample && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-white/10 rounded-lg mb-4 overflow-hidden">
                    {currentSample.type === "image" ? (
                      <img 
                        src={currentSample.preview} 
                        alt={currentSample.metadata.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/40">
                        <Database className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-white font-medium mb-2">{currentSample.metadata.name}</h3>
                  
                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{currentSample.metadata.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span>{currentSample.metadata.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span>{currentSample.metadata.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Source:</span>
                      <span>{currentSample.metadata.source}</span>
                    </div>
                  </div>

                  {currentSample.aiPrediction && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">AI Prediction:</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${
                            currentSample.aiPrediction === "keep" ? "text-green-400" : "text-red-400"
                          }`}>
                            {currentSample.aiPrediction === "keep" ? "Keep" : "Remove"}
                          </span>
                          <span className="text-white/40 text-xs">
                            ({Math.round((currentSample.confidence || 0) * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Your Decision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 mb-6">
                    Should this item be kept in your cleaned dataset?
                  </p>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleLabel("keep")}
                      className="w-full bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 text-green-400"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Keep this item
                    </Button>
                    
                    <Button
                      onClick={() => handleLabel("remove")}
                      className="w-full bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Remove this item
                    </Button>
                    
                    <Button
                      onClick={() => handleLabel("skip")}
                      variant="outline"
                      className="w-full border-white/20 text-white/60 hover:bg-white/5"
                    >
                      <SkipForward className="w-5 h-5 mr-2" />
                      Skip for now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentPhase === "training") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <RefreshCw className="w-16 h-16 text-blue-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Training AI Model</h2>
        <p className="text-white/60 text-lg mb-8">
          Analyzing your preferences and creating intelligent rules...
        </p>
        
        <div className="space-y-2 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 text-white/60">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Processing labeled samples
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            Extracting feature patterns
          </div>
          <div className="flex items-center gap-3 text-white/60">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            Building decision rules
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Processing Dataset</h1>
        <p className="text-white/60">
          AI is applying learned rules to your entire dataset
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-white">{stats.totalItems.toLocaleString()}</p>
              </div>
              <Database className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Processed</p>
                <p className="text-2xl font-bold text-white">{stats.processed.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Kept</p>
                <p className="text-2xl font-bold text-green-400">{stats.kept.toLocaleString()}</p>
              </div>
              <Check className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Removed</p>
                <p className="text-2xl font-bold text-red-400">{stats.removed.toLocaleString()}</p>
              </div>
              <X className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/5 border-white/10 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Processing Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Overall Progress</span>
              <span className="text-white font-medium">
                {Math.round((stats.processed / stats.totalItems) * 100)}%
              </span>
            </div>
            
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(stats.processed / stats.totalItems) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">AI Accuracy: {stats.accuracy.toFixed(1)}%</span>
              <span className="text-white/60">
                {isProcessing ? "Processing..." : "Complete"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isProcessing && (
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3"
          >
            <Check className="w-5 h-5 mr-2" />
            Download Cleaned Dataset
          </Button>
        </div>
      )}
    </div>
  );
}
