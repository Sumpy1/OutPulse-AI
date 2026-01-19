"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mock Data State
  const [gaps, setGaps] = useState<any[]>([]);
  const [icp, setIcp] = useState<any>(null);

  const handleUrlSubmit = async () => {
    if (!url) return;
    setLoading(true);
    // Simulate AI Scraping
    setTimeout(() => {
      setLoading(false);
      setGaps([
        { id: 1, question: "Who usually buys from you?", answer: "" },
        { id: 2, question: "What is your target deal size?", answer: "" },
      ]);
      setStep(3); // Skip to Gaps (Step 2 is loading)
    }, 2000);
    setStep(2); // Loading State
  };

  const handleGapAnswer = (id: number, answer: string) => {
    setGaps(gaps.map(g => g.id === id ? { ...g, answer } : g));
  };

  const handleGapsSubmit = async () => {
    setLoading(true);
    // Simulate ICP Generation
    setTimeout(() => {
      setLoading(false);
      setIcp({
        industry: "B2B SaaS",
        size: "50-200 Employees",
        titles: ["CTO", "VP Engineering"],
        region: "North America"
      });
      setStep(4);
    }, 1500);
  };

  const handleFinalApprove = () => {
      // Save to DB
      router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>
            {step === 1 && "Welcome to OutPulse"}
            {step === 2 && "Analyzing Your Business"}
            {step === 3 && "We need a few details"}
            {step === 4 && "Review Your ICP"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter your company website to let our AI learn about your business."}
            {step === 2 && "Our AI is scraping your website and analyzing your value proposition..."}
            {step === 3 && "Our AI found a few gaps in its understanding. Help us fill them in."}
            {step === 4 && "Based on your website and answers, here is your Ideal Customer Profile."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Company Website URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Reading {url}...</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {gaps.map((gap) => (
                <div key={gap.id} className="grid gap-2">
                  <Label>{gap.question}</Label>
                  <Input
                    value={gap.answer}
                    onChange={(e) => handleGapAnswer(gap.id, e.target.value)}
                    placeholder="Type your answer..."
                  />
                </div>
              ))}
            </div>
          )}

          {step === 4 && icp && (
            <div className="grid gap-4 border rounded-lg p-4 bg-muted/20">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Target Industry</Label>
                  <p className="font-medium">{icp.industry}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Company Size</Label>
                  <p className="font-medium">{icp.size}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Decision Makers</Label>
                  <p className="font-medium">{icp.titles.join(", ")}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Region</Label>
                  <p className="font-medium">{icp.region}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {step === 1 && (
            <Button onClick={handleUrlSubmit} disabled={!url || loading}>
              Start Analysis
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleGapsSubmit} disabled={loading}>
              Generate ICP
            </Button>
          )}
          {step === 4 && (
             <Button onClick={handleFinalApprove} className="bg-green-600 hover:bg-green-700">
               <CheckCircle2 className="mr-2 h-4 w-4" /> Approve & Start Outreach
             </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
