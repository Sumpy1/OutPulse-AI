"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, AlertTriangle, Loader2, CheckCircle } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SettingsPage() {
  const user = useQuery(api.users.currentUser);
  const updateKey = useMutation(api.users.updateOpenAIKey);
  
  const [openaiKey, setOpenaiKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.openaiKey) {
      setOpenaiKey(user.openaiKey);
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateKey({ openaiKey });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">Settings</h2>
        <p className="text-muted-foreground">Global configuration for your OutPulse Ai instance.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Outreach Limits</CardTitle>
            <CardDescription>Control your volume to stay within safety limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="daily">Daily Send Limit</Label>
                    <Input id="daily" type="number" defaultValue="50" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="followups">Max Follow-ups</Label>
                    <Input id="followups" type="number" defaultValue="3" />
                </div>
             </div>
             <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100 text-amber-800 text-sm">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Recommended limit is 50/day to avoid spam filters.</span>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configurations</CardTitle>
            <CardDescription>Enter your API keys to enable AI features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid gap-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex gap-2">
                    <Input 
                        id="openai-key" 
                        type="password" 
                        placeholder="sk-..." 
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                    />
                    <Button variant="outline">Verify</Button>
                </div>
                <p className="text-xs text-muted-foreground italic">Your key is stored in your user profile.</p>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation Behavior</CardTitle>
            <CardDescription>Customization of the AI's autonomous actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Find Leads</Label>
                <p className="text-xs text-muted-foreground italic">AI will automatically find new leads weekly.</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Advanced Personalization</Label>
                <p className="text-xs text-muted-foreground italic">Uses deeper research for first touch (higher cost).</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-gray-900 hover:bg-black px-10 py-6 text-lg rounded-xl shadow-xl flex items-center gap-2"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : saved ? <CheckCircle className="h-5 w-5 text-green-400" /> : <Save className="h-5 w-5" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save All Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}

