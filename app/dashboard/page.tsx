"use client";

import "./dashboard.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Sparkles,
  CheckCircle2,
  X,
  ThumbsUp,
  ThumbsDown,
  SkipForward,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("training");
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [labeledSamples, setLabeledSamples] = useState<Record<number, 'keep' | 'remove' | 'skip'>>({});
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  const handleLabel = (label: 'keep' | 'remove' | 'skip') => {
    setLabeledSamples(prev => ({
      ...prev,
      [currentSampleIndex]: label
    }));
    
    // Move to next sample
    if (currentSampleIndex < 14) {
      setCurrentSampleIndex(prev => prev + 1);
    }
  };

  // Mock sample data
  const totalSamples = 15;
  const samplesLabeled = Object.keys(labeledSamples).length;
  const keepCount = Object.values(labeledSamples).filter(l => l === 'keep').length;
  const removeCount = Object.values(labeledSamples).filter(l => l === 'remove').length;

  if (!hasSearched) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Subtle particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div
          className="relative z-10 w-full max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center mb-3">
              <Image 
                src="/logo.png" 
                alt="Sift Logo" 
                width={100} 
                height={100}
                className="brightness-0 invert -mr-4"
              />
              <h1 className="text-2xl font-medium text-white">sift</h1>
            </div>
            <p className="text-white/50 text-sm">
              AI-powered data cleaning and curation
            </p>
          </motion.div>

          {/* Search form */}
          <motion.form
            onSubmit={handleSearch}
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Describe what data you want to clean and curate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-24 text-base bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-white/20 focus:bg-white/10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-2 h-8 px-4 bg-white text-black hover:bg-white/90 font-medium rounded-md"
              >
                Start
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <motion.header
        className="h-14 border-b border-white/10 flex items-center justify-between px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Sift Logo" 
              width={50} 
              height={50}
              className="brightness-0 invert -mr-1"
            />
            <span className="text-base font-medium">sift</span>
          </div>
          
          {/* Tab switcher */}
          <div className="flex items-center gap-1 ml-8">
            <button
              onClick={() => setActiveTab('training')}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                activeTab === 'training' 
                  ? "bg-white text-black" 
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Training Samples
            </button>
            <button
              onClick={() => setActiveTab('cleaned')}
              className={cn(
                "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                activeTab === 'cleaned' 
                  ? "bg-white text-black" 
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Cleaned Data
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {searchQuery && (
            <span className="text-xs text-white/40">Query: {searchQuery}</span>
          )}
          <Button
            onClick={handleSignOut}
            size="sm"
            variant="ghost"
            className="text-white/50 hover:text-white/70 hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'training' ? (
            <motion.div
              key="training"
              className="h-full flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Progress bar */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-medium">Sample Training</h2>
                  <span className="text-xs text-white/40">
                    {samplesLabeled} / {totalSamples} samples labeled
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${(samplesLabeled / totalSamples) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] text-green-400">Keep: {keepCount}</span>
                  <span className="text-[10px] text-red-400">Remove: {removeCount}</span>
                  <span className="text-[10px] text-white/40">Skip: {samplesLabeled - keepCount - removeCount}</span>
                </div>
              </div>

              {/* Sample display area */}
              <div className="flex-1 flex items-center justify-center p-6">
                {currentSampleIndex < totalSamples ? (
                  <div className="max-w-2xl w-full">
                    <div className="text-center mb-4">
                      <p className="text-xs text-white/40">Sample {currentSampleIndex + 1} of {totalSamples}</p>
                    </div>
                    
                    {/* Sample content placeholder */}
                    <Card className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-white/10 rounded-lg mx-auto mb-3"></div>
                        <p className="text-xs text-white/30">Sample Data Item #{currentSampleIndex + 1}</p>
                        <p className="text-[10px] text-white/20 mt-1">Size: 2.3MB • Type: Image • Score: 0.82</p>
                      </div>
                    </Card>

                    {/* Action buttons */}
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        onClick={() => handleLabel('remove')}
                        className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                        size="lg"
                      >
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      
                      <Button
                        onClick={() => handleLabel('skip')}
                        variant="outline"
                        size="lg"
                      >
                        <SkipForward className="w-4 h-4 mr-2" />
                        Skip
                      </Button>
                      
                      <Button
                        onClick={() => handleLabel('keep')}
                        className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                        size="lg"
                      >
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Keep
                      </Button>
                    </div>

                    <p className="text-xs text-white/30 text-center mt-6">
                      The AI will learn from your choices to automatically clean the rest of your dataset
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Training Complete!</h3>
                    <p className="text-sm text-white/50 mb-6">
                      The AI model has been trained with your samples and is now cleaning your dataset.
                    </p>
                    <Button
                      onClick={() => setActiveTab('cleaned')}
                      className="bg-white text-black hover:bg-white/90"
                    >
                      View Cleaned Data
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cleaned"
              className="h-full p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="bg-black border border-white/10 p-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Total Items</p>
                  <p className="text-2xl font-semibold">45,234</p>
                  <p className="text-[10px] text-white/40">Original dataset</p>
                </Card>
                
                <Card className="bg-black border border-white/10 p-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Items Kept</p>
                  <p className="text-2xl font-semibold text-green-400">38,192</p>
                  <p className="text-[10px] text-white/40">84.4% retained</p>
                </Card>
                
                <Card className="bg-black border border-white/10 p-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Items Removed</p>
                  <p className="text-2xl font-semibold text-red-400">7,042</p>
                  <p className="text-[10px] text-white/40">15.6% filtered</p>
                </Card>
                
                <Card className="bg-black border border-white/10 p-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Confidence</p>
                  <p className="text-2xl font-semibold">94.3%</p>
                  <p className="text-[10px] text-white/40">Model accuracy</p>
                </Card>
              </div>

              {/* Cleaned data grid */}
              <Card className="bg-black border border-white/10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Cleaned Dataset</h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      Export
                    </Button>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      Download All
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[10px] text-white/20">Item {i + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center mt-4">
                  <p className="text-xs text-white/40">Showing 24 of 38,192 cleaned items</p>
                </div>
              </Card>

              {/* Rules learned */}
              <Card className="bg-black border border-white/10 p-4 mt-4">
                <h3 className="text-sm font-medium mb-3">AI-Learned Rules</h3>
                <div className="space-y-2">
                  {[
                    'Quality score > 0.85',
                    'No duplicate content detected',
                    'File size between 500KB - 5MB',
                    'Aspect ratio matches requirements',
                    'Content relevance > 90%'
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      {rule}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom search bar */}
      <motion.div
        className="border-t border-white/10 p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Refine your data cleaning query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-24 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/30" />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-2 h-6 px-3 bg-white text-black hover:bg-white/90 text-xs"
            >
              Update
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}