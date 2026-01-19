"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Plus, X, Search, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ICPPage() {
  const user = useQuery(api.users.currentUser);
  const [domain, setDomain] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [icp, setIcp] = useState<any>(null);

  const generateICP = useAction(api.icp.generateICP);

  useEffect(() => {
    if (user?.openaiKey) {
      setOpenaiKey(user.openaiKey);
    }
  }, [user]);

  const handleGenerate = async () => {
    if (!domain || !openaiKey) {
      alert("Please enter both domain and OpenAI API key");
      return;
    }
    setLoading(true);
    try {
      const result = await generateICP({ domain, openaiKey });
      setIcp(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate ICP. Check your API key and domain.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-pink-600">Ideal Customer Profile</h2>
          <p className="text-muted-foreground">Define who you want to reach with your outreach.</p>
        </div>
      </div>

      <Card className="mb-8 border-pink-100 shadow-sm">
        <CardHeader>
          <CardTitle>Generate ICP from Domain</CardTitle>
          <CardDescription>Enter a domain and your OpenAI API key to automatically find the ICP.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="domain">Target Domain</Label>
              <Input 
                id="domain" 
                placeholder="example.com" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key">OpenAI API Key</Label>
              <Input 
                id="key" 
                type="password" 
                placeholder="sk-..." 
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
              />
            </div>
          </div>
          <Button 
            className="w-full bg-pink-600 hover:bg-pink-700" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
            Generate ICP
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-pink-100 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-pink-600" />
                <CardTitle>{icp ? `Generated ICP for ${domain}` : "Main Targeting Rule"}</CardTitle>
            </div>
            <CardDescription>The primary demographic for your current lead search.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!icp ? (
              <p className="text-sm text-muted-foreground italic text-center py-4">Generate an ICP above or use the default values below.</p>
            ) : null}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Target Industry</Label>
                <div className="flex flex-wrap gap-2">
                  {(icp?.targetIndustry || ["SaaS", "Fintech", "Agency", "E-commerce"]).map((item: string) => (
                    <Badge key={item} variant="secondary" className="bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-100">
                      {item} <X className="ml-1 h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" />
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-7 text-xs border border-dashed">+ Add</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Company Size</Label>
                  <Input key={icp?.companySizeRange} defaultValue={icp?.companySizeRange || "50 - 200 Employees"} />
                </div>
                <div className="grid gap-2">
                  <Label>Key Job Titles</Label>
                  <div className="flex flex-wrap gap-2">
                    {(icp?.jobTitles || ["CTO", "VP Engineering", "Product Manager"]).map((item: string) => (
                      <Badge key={item} variant="outline" className="text-gray-600 border-gray-200">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

               <div className="grid gap-2">
                  <Label>Target Regions</Label>
                  <div className="flex flex-wrap gap-2">
                    {(icp?.region || ["North America", "Europe"]).map((item: string) => (
                      <Badge key={item} variant="outline" className="bg-white">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center bg-gray-50/50">
            <p className="text-muted-foreground mb-4 italic">OutPulse will use these rules to find and score leads.</p>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-100">
                Update Search Parameters
            </Button>
        </div>
      </div>
    </div>
  );
}

