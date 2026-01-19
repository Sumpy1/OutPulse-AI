"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
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
          <Button className="bg-gray-900 hover:bg-black px-10 py-6 text-lg rounded-xl shadow-xl">
            <Save className="mr-2 h-5 w-5" /> Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
