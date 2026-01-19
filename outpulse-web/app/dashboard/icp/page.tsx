"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ICPPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-pink-600">Ideal Customer Profile</h2>
          <p className="text-muted-foreground">Define who you want to reach with your outreach.</p>
        </div>
        <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
          <Plus className="mr-2 h-4 w-4" /> Add Segment
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="border-pink-100 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-pink-600" />
                <CardTitle>Main Targeting Rule</CardTitle>
            </div>
            <CardDescription>The primary demographic for your current lead search.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Target Industry</Label>
                <div className="flex flex-wrap gap-2">
                  {["SaaS", "Fintech", "Agency", "E-commerce"].map((item) => (
                    <Badge key={item} variant="secondary" className="bg-pink-50 text-pink-700 hover:bg-pink-100">
                      {item} <X className="ml-1 h-3 w-3 cursor-pointer" />
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-7 text-xs">+ Add</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Company Size</Label>
                  <Input defaultValue="50 - 200 Employees" />
                </div>
                <div className="grid gap-2">
                  <Label>Job Titles</Label>
                  <Input defaultValue="CTO, VP Engineering, Product Manager" />
                </div>
              </div>

               <div className="grid gap-2">
                  <Label>Target Regions</Label>
                  <Input defaultValue="North America, Europe" />
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
